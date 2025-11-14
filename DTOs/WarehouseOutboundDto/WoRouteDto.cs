using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class WoRouteDto
    {
        public long Id { get; set; }
        public long LineId { get; set; }
        public string StockCode { get; set; } = string.Empty;
        public string RouteCode { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public string? SerialNo { get; set; }
        public string? SerialNo2 { get; set; }
        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }
        public string? SourceCellCode { get; set; }
        public string? TargetCellCode { get; set; }
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

    public class CreateWoRouteDto
    {
        [Required]
        public long LineId { get; set; }

        [Required, StringLength(35)]
        public string StockCode { get; set; } = string.Empty;

        [StringLength(30)]
        public string RouteCode { get; set; } = string.Empty;

        [Required]
        public decimal Quantity { get; set; }

        [StringLength(50)]
        public string? SerialNo { get; set; }

        [StringLength(50)]
        public string? SerialNo2 { get; set; }

        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [StringLength(20)]
        public string? SourceCellCode { get; set; }

        [StringLength(20)]
        public string? TargetCellCode { get; set; }

        [StringLength(100)]
        public string? Description { get; set; }
    }

    public class UpdateWoRouteDto
    {
        public long? LineId { get; set; }

        [StringLength(35)]
        public string? StockCode { get; set; }

        [StringLength(30)]
        public string? RouteCode { get; set; }

        public decimal? Quantity { get; set; }

        [StringLength(50)]
        public string? SerialNo { get; set; }

        [StringLength(50)]
        public string? SerialNo2 { get; set; }

        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [StringLength(20)]
        public string? SourceCellCode { get; set; }

        [StringLength(20)]
        public string? TargetCellCode { get; set; }

        [StringLength(100)]
        public string? Description { get; set; }
    }
}