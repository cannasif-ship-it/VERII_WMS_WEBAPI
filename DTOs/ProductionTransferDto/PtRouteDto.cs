using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class PtRouteDto
    {
        public long Id { get; set; }
        public long ImportLineId { get; set; }
        public decimal Quantity { get; set; }
        public string? SerialNo { get; set; }
        public string? SerialNo2 { get; set; }
        public string? SerialNo3 { get; set; }
        public string? SerialNo4 { get; set; }
        public string? ScannedBarcode { get; set; }
        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }
        public string? SourceCellCode { get; set; }
        public string? TargetCellCode { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public long? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }
    }

    public class CreatePtRouteDto
    {
        [Required]
        public long ImportLineId { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [StringLength(50)]
        public string? SerialNo { get; set; }

        [StringLength(50)]
        public string? SerialNo2 { get; set; }

        [StringLength(50)]
        public string? SerialNo3 { get; set; }

        [StringLength(50)]
        public string? SerialNo4 { get; set; }

        [StringLength(75)]
        public string? ScannedBarcode { get; set; }

        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [StringLength(20)]
        public string? SourceCellCode { get; set; }

        [StringLength(20)]
        public string? TargetCellCode { get; set; }
    }

    public class UpdatePtRouteDto
    {
        public long? ImportLineId { get; set; }

        public decimal? Quantity { get; set; }

        [StringLength(50)]
        public string? SerialNo { get; set; }

        [StringLength(50)]
        public string? SerialNo2 { get; set; }

        [StringLength(50)]
        public string? SerialNo3 { get; set; }

        [StringLength(50)]
        public string? SerialNo4 { get; set; }

        [StringLength(75)]
        public string? ScannedBarcode { get; set; }

        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [StringLength(20)]
        public string? SourceCellCode { get; set; }

        [StringLength(20)]
        public string? TargetCellCode { get; set; }
    }
}