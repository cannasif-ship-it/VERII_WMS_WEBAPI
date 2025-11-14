using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class IcImportLineDto
    {
        public long Id { get; set; }
        public long HeaderId { get; set; }
        public string StockCode { get; set; } = string.Empty;
        public string? YapKod { get; set; }
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

    public class CreateIcImportLineDto
    {
        [Required]
        public long HeaderId { get; set; }

        [Required, StringLength(35)]
        public string StockCode { get; set; } = string.Empty;

        [StringLength(35)]
        public string? YapKod { get; set; }

        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

        [StringLength(255)]
        public string? Description { get; set; }
    }

    public class UpdateIcImportLineDto
    {
        public long? HeaderId { get; set; }

        [StringLength(35)]
        public string? StockCode { get; set; }

        [StringLength(35)]
        public string? YapKod { get; set; }

        [StringLength(30)]
        public string? Description1 { get; set; }

        [StringLength(50)]
        public string? Description2 { get; set; }

        [StringLength(255)]
        public string? Description { get; set; }
    }
}