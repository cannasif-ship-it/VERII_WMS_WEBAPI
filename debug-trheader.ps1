param(
    [string]$BaseUrl = 'http://localhost:5000',
    [string]$Token = ''
)

$ErrorActionPreference = 'Stop'

Write-Host "=== TR Bulk Create Demo ===" -ForegroundColor Cyan

# Build a unique document number
$stamp = Get-Date -Format 'yyMMddHHmmss'
$docNo = "TR$stamp"
Write-Host "DocumentNo: $docNo"

# Construct request body
$requestBody = @{
    Header = @{
        BranchCode = 'TR'
        ProjectCode = 'PRJ001'
        DocumentNo = $docNo
        DocumentDate = (Get-Date).ToString('o')
        DocumentType = 'TR'
        CustomerCode = 'CUST01'
        CustomerName = 'Temp Customer'
        SourceWarehouse = 'DEP1'
        TargetWarehouse = 'DEP2'
        Priority = 'N'
        YearCode = (Get-Date).ToString('yyyy')
        Description1 = 'Bulk TR test'
        Description2 = 'Temp data'
        PriorityLevel = 1
        Type = 1
    }
    # Line korelasyon anahtarlarıyla örnek kayıtlar
    Lines = @(
        @{ ClientKey = 'L1'; ClientGuid = [guid]::NewGuid().ToString(); StockCode = 'STOK001'; OrderId = 1001; Quantity = 5; Unit = 'ADET'; Description = 'Line 1 desc' },
        @{ ClientKey = 'L2'; ClientGuid = [guid]::NewGuid().ToString(); StockCode = 'STOK002'; OrderId = 1002; Quantity = 3; Unit = 'ADET'; Description = 'Line 2 desc' }
    )
    # Route: LineClientKey ile line eşleme ve kendi client key
    Routes = @(
        @{ LineClientKey = 'L1'; ClientKey = 'R1'; StockCode = 'STOK001'; Quantity = 5; Priority = 1; Description = 'Route for L1' }
    )
    # ImportLines: LineClientKey ile line eşleme; RouteClientKey opsiyonel
    ImportLines = @(
        @{ LineClientKey = 'L1'; RouteClientKey = 'R1'; StockCode = 'STOK001'; Quantity = 2; Unit = 'ADET'; SerialNo = 'SN-0001'; ErpOrderNumber = 'ERP-TR-001'; ErpOrderNo = 'ERP-TR-001'; ErpOrderLineNumber = '10' },
        @{ LineClientKey = 'L2'; StockCode = 'STOK002'; Quantity = 1; Unit = 'ADET'; SerialNo = 'SN-0002'; ErpOrderNumber = 'ERP-TR-002'; ErpOrderNo = 'ERP-TR-002'; ErpOrderLineNumber = '20' }
    )
} | ConvertTo-Json -Depth 6

$headers = @{ 'Accept' = 'application/json' }

# If no token provided, try to login via AuthController using login.json; fallback to admin-login
if (-not $Token -or $Token.Trim().Length -eq 0) {
    $loginPath = Join-Path $PSScriptRoot 'login.json'
    if (Test-Path $loginPath) {
        try {
            $loginCfg = Get-Content $loginPath | ConvertFrom-Json
            $loginBody = @{ Username = $loginCfg.Username; Password = $loginCfg.Password } | ConvertTo-Json
            $loginUrl = "$BaseUrl/api/auth/login"
            Write-Host "Authenticating at $loginUrl" -ForegroundColor Yellow
            $loginResp = Invoke-RestMethod -Method POST -Uri $loginUrl -ContentType 'application/json' -Body $loginBody -ErrorAction Stop
            if ($loginResp -and $loginResp.success -eq $true -and $loginResp.data) {
                $Token = $loginResp.data
                $headers['Authorization'] = "Bearer $Token"
                Write-Host "Authenticated; token acquired." -ForegroundColor Green
            } else {
                Write-Warning "Login response did not contain a token. Proceeding without Authorization header."
            }
        } catch {
            Write-Warning "Login failed: $($_.Exception.Message). Proceeding without Authorization header."
        }
    } else {
        Write-Host "login.json not found. Attempting admin-login..." -ForegroundColor DarkYellow
    }

    # If still no token, attempt admin-login
    if (-not $headers.ContainsKey('Authorization')) {
        try {
            $adminUrl = "$BaseUrl/api/auth/admin-login"
            Write-Host "Authenticating at $adminUrl" -ForegroundColor Yellow
            $adminResp = Invoke-RestMethod -Method POST -Uri $adminUrl -ErrorAction Stop
            if ($adminResp -and $adminResp.success -eq $true -and $adminResp.data -and $adminResp.data.token) {
                $Token = $adminResp.data.token
                $headers['Authorization'] = "Bearer $Token"
                Write-Host "Admin authenticated; token acquired." -ForegroundColor Green
            } else {
                Write-Warning "Admin-login response did not contain a token. Proceeding without Authorization header."
            }
        } catch {
            Write-Warning "Admin-login failed: $($_.Exception.Message). Proceeding without Authorization header."
        }
    }
} else {
    $headers['Authorization'] = "Bearer $Token"
}

# POST bulk create
$postUrl = "$BaseUrl/api/trheader/inter-warehouse/bulk-create"
Write-Host "POST $postUrl" -ForegroundColor Yellow
try {
    $postResult = Invoke-RestMethod -Method POST -Uri $postUrl -Headers $headers -ContentType 'application/json' -Body $requestBody
    $postResult | ConvertTo-Json -Depth 6
} catch {
    Write-Warning "POST failed. Fetching raw response..."
    try {
        $resp = Invoke-WebRequest -Method POST -Uri $postUrl -Headers $headers -ContentType 'application/json' -Body $requestBody -ErrorAction Stop
        if ($resp -and $resp.Content) { Write-Host $resp.Content }
    } catch {
        $ex = $_.Exception
        if ($ex -and $ex.Response) {
            try {
                $reader = New-Object System.IO.StreamReader($ex.Response.GetResponseStream())
                $raw = $reader.ReadToEnd()
                Write-Host $raw
            } catch {
                Write-Warning "Failed to read error response stream: $($_.Exception.Message)"
            }
        } else {
            Write-Warning "No response body available."
        }
    }
}

# GET by document number
$getUrl = "$BaseUrl/api/trheader/by-document/$docNo"
Write-Host "GET $getUrl" -ForegroundColor Yellow
$getResult = Invoke-RestMethod -Method GET -Uri $getUrl -Headers $headers
$getResult | ConvertTo-Json -Depth 6

# HeaderId al ve Lines/ImportLines doğrula
if ($getResult.data -and $getResult.data.Count -gt 0) {
    $headerId = $getResult.data[0].id
    Write-Host "HeaderId: $headerId" -ForegroundColor Cyan
    $linesUrl = "$BaseUrl/api/trline/header/$headerId"
    Write-Host "GET $linesUrl" -ForegroundColor Yellow
    try {
        $linesResult = Invoke-RestMethod -Method GET -Uri $linesUrl -Headers $headers
        $linesResult | ConvertTo-Json -Depth 6

        # İlk line’ın id’siyle import line sorgusu
        if ($linesResult.data -and $linesResult.data.Count -gt 0) {
            $firstLineId = $linesResult.data[0].id
            $impUrl = "$BaseUrl/api/trimportline/line/$firstLineId"
            Write-Host "GET $impUrl" -ForegroundColor Yellow
            $impResult = Invoke-RestMethod -Method GET -Uri $impUrl -Headers $headers
            $impResult | ConvertTo-Json -Depth 6
        }
    } catch {
        Write-Warning "Line/ImportLine sorgusunda hata: $($_.Exception.Message)"
    }
}

Write-Host "=== Done ===" -ForegroundColor Green