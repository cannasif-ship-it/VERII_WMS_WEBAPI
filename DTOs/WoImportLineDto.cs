using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class WoImportLineDto
    {
        public long Id { get; set; }
        public long HeaderId { get; set; }
        public long LineId { get; set; }
        public long? RouteId { get; set; }
        public string StockCode { get; set; } = string.Empty;
        public string? SerialNo { get; set; }
        public string? SerialNo2 { get; set; }
        public string? SerialNo3 { get; set; }
        public string? SerialNo4 { get; set; }
        public decimal Quantity { get; set; }
        public string? ScannedBarkod { get; set; }
        public string? ErpOrderNumber { get; set; }
        public string? ErpOrderNo { get; set; }
        public string? ErpOrderLineNumber { get; set; }
        public string? ErpOrderSequence { get; set; }
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
        public string? Description { get; set; }
        public long? CreatedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public long? DeletedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? DeletedDate { get; set; }
        public bool IsDeleted { get; set; }
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }
    }

    public class CreateWoImportLineDto
    {
        [Required]
        public long HeaderId { get; set; }

        [Required]
        public long LineId { get; set; }

        public long? RouteId { get; set; }

        [Required, StringLength(35)]
        public string StockCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? SerialNo { get; set; }

        [StringLength(50)]
        public string? SerialNo2 { get; set; }

        [StringLength(50)]
        public string? SerialNo3 { get; set; }

        [StringLength(50)]
        public string? SerialNo4 { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [StringLength(100)]
        public string? ScannedBarkod { get; set; }

        [StringLength(50)]
        public string? ErpOrderNumber { get; set; }

        [StringLength(50)]
        public string? ErpOrderNo { get; set; }

        [StringLength(10)]
        public string? ErpOrderLineNumber { get; set; }

        [StringLength(10)]
        public string? ErpOrderSequence { get; set; }

        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

        [StringLength(255)]
        public string? Description { get; set; }
    }

    public class UpdateWoImportLineDto
    {
        public long? HeaderId { get; set; }
        public long? LineId { get; set; }
        public long? RouteId { get; set; }

        [StringLength(35)]
        public string? StockCode { get; set; }

        [StringLength(50)]
        public string? SerialNo { get; set; }

        [StringLength(50)]
        public string? SerialNo2 { get; set; }

        [StringLength(50)]
        public string? SerialNo3 { get; set; }

        [StringLength(50)]
        public string? SerialNo4 { get; set; }

        public decimal? Quantity { get; set; }

        [StringLength(100)]
        public string? ScannedBarkod { get; set; }

        [StringLength(50)]
        public string? ErpOrderNumber { get; set; }

        [StringLength(50)]
        public string? ErpOrderNo { get; set; }

        [StringLength(10)]
        public string? ErpOrderLineNumber { get; set; }

        [StringLength(10)]
        public string? ErpOrderSequence { get; set; }

        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

        [StringLength(255)]
        public string? Description { get; set; }
    }
}