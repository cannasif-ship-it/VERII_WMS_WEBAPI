using System;
using System.Collections.Generic;

namespace WMS_WEBAPI.DTOs
{
    // Satırlar için istemci korelasyon anahtarı
    public class CreateGrLineWithKeyDto
    {
        public string ClientKey { get; set; } = null!;
        // Alternatif GUID tabanlı gruplama anahtarı (istemci tarafında üretilecek)
        public Guid? ClientGuid { get; set; }

        public string StockCode { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public string? Unit { get; set; }
        public string? ErpOrderNo { get; set; }
        public string? ErpOrderLineNo { get; set; }
        public string? Description { get; set; }
    }

    // İthalat satırları için line korelasyon anahtarı
    public class CreateGrImportLWithLineKeyDto
    {
        public string LineClientKey { get; set; } = null!; // Hangi Line'a bağlanacağını belirtir
        // Alternatif: aynı Line'a bağlanacak import satırları için GUID gruplama
        public Guid? LineGroupGuid { get; set; }
        public string? ClientKey { get; set; } // SerialLines ile korelasyon için opsiyonel

        public string StockCode { get; set; } = null!;
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
    }

    // Seri satırları için import line korelasyon anahtarı
    public class CreateGrImportSerialLineWithImportLineKeyDto
    {
        public string ImportLineClientKey { get; set; } = null!; // Hangi ImportLine'a bağlanacağını belirtir
        // Alternatif: aynı ImportLine'a bağlanacak seri satırları için GUID gruplama
        public Guid? ImportLineGroupGuid { get; set; }
        public string SerialNo { get; set; } = null!;
        public decimal Quantity { get; set; }
        public string? SourceCellCode { get; set; }
        public string? TargetCellCode { get; set; }
        public string? SerialNo2 { get; set; }
        public string? SerialNo3 { get; set; }
        public string? SerialNo4 { get; set; }
    }

    // Import dokümanı
    public class CreateGrImportDocumentSimpleDto
    {
        public byte[] Base64 { get; set; } = null!;
    }

    // Toplu oluşturma isteği
    public class BulkCreateGrRequestDto
    {
        public CreateGrHeaderDto Header { get; set; } = null!;

        public List<CreateGrImportDocumentSimpleDto>? Documents { get; set; }
        public List<CreateGrLineWithKeyDto>? Lines { get; set; }
        public List<CreateGrImportLWithLineKeyDto>? ImportLines { get; set; }
        public List<CreateGrImportSerialLineWithImportLineKeyDto>? SerialLines { get; set; }
    }
}