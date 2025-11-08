using System;
using System.Collections.Generic;

namespace WMS_WEBAPI.DTOs
{
    // TR Line için istemci korelasyon anahtarı
    public class CreateTrLineWithKeyDto
    {
        public string? ClientKey { get; set; }
        public Guid? ClientGuid { get; set; }

        public string StockCode { get; set; } = string.Empty;
        public int? OrderId { get; set; }
        public decimal Quantity { get; set; }
        public string? Unit { get; set; }
        public string? ErpOrderNo { get; set; }
        public string? ErpOrderLineNo { get; set; }
        public string? ErpLineReference { get; set; }
        public string? Description { get; set; }
    }

    // TR Route için line korelasyon anahtarı ve kendi korelasyon anahtarı
    public class CreateTrRouteWithLineKeyDto
    {
        public string? LineClientKey { get; set; }
        public Guid? LineGroupGuid { get; set; }
        public string? ClientKey { get; set; }
        public Guid? ClientGroupGuid { get; set; }

        public string StockCode { get; set; } = string.Empty;
        public string? RouteCode { get; set; }
        public decimal Quantity { get; set; }
        public string? SerialNo { get; set; }
        public string? SerialNo2 { get; set; }
        public short? SourceWarehouse { get; set; }
        public short? TargetWarehouse { get; set; }
        public string? SourceCellCode { get; set; }
        public string? TargetCellCode { get; set; }
        public int Priority { get; set; }
        public string? Description { get; set; }
    }

    // TR ImportLine için line ve route korelasyon anahtarları
    public class CreateTrImportLineWithKeysDto
    {
        // Line ile korelasyon
        public string? LineClientKey { get; set; }
        public Guid? LineGroupGuid { get; set; }

        // Route ile korelasyon (opsiyonel)
        public string? RouteClientKey { get; set; }
        public Guid? RouteGroupGuid { get; set; }

        // Model alanları
        public string StockCode { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public string? Unit { get; set; }
        public string? SerialNo { get; set; }
        public string? SerialNo2 { get; set; }
        public string? SerialNo3 { get; set; }
        public string? SerialNo4 { get; set; }
        public string? ScannedBarkod { get; set; }
        public string? ErpOrderNumber { get; set; }
        public string? ErpOrderNo { get; set; }
        public string? ErpOrderLineNumber { get; set; }
    }

    // Toplu TR oluşturma isteği
    public class BulkCreateTrRequestDto
    {
        public CreateTrHeaderDto Header { get; set; } = null!;

        public List<CreateTrLineWithKeyDto>? Lines { get; set; }
        public List<CreateTrRouteWithLineKeyDto>? Routes { get; set; }
        public List<CreateTrImportLineWithKeysDto>? ImportLines { get; set; }
    }
}