using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class ICHeaderDto
    {
        public long Id { get; set; }
        public string BranchCode { get; set; } = string.Empty;
        public string? ProjectCode { get; set; }
        public DateTime DocumentDate { get; set; }
        public string DocumentType { get; set; } = string.Empty;
        public string? CellCode { get; set; }
        public string? WarehouseCode { get; set; }
        public string? ProductCode { get; set; }
        public string YearCode { get; set; } = string.Empty;
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
        public byte? PriorityLevel { get; set; }
        public byte Type { get; set; }
        public long? CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public long? DeletedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsPendingApproval { get; set; }
        public bool? ApprovalStatus { get; set; }
        public long? ApprovedByUserId { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public string? CreatedByFullUser { get; set; }
        public string? UpdatedByFullUser { get; set; }
        public string? DeletedByFullUser { get; set; }
    }

    public class CreateICHeaderDto
    {
        [Required, StringLength(10)]
        public string BranchCode { get; set; } = string.Empty;

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        public DateTime DocumentDate { get; set; }

        [Required, StringLength(10)]
        public string DocumentType { get; set; } = string.Empty;

        [StringLength(35)]
        public string? CellCode { get; set; }

        [StringLength(20)]
        public string? WarehouseCode { get; set; }

        [StringLength(50)]
        public string? ProductCode { get; set; }

        [Required, StringLength(4)]
        public string YearCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Description1 { get; set; }

        [StringLength(100)]
        public string? Description2 { get; set; }

        [Required]
        public byte Type { get; set; }
    }

    public class UpdateICHeaderDto
    {
        [StringLength(10)]
        public string? BranchCode { get; set; }

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        public DateTime? DocumentDate { get; set; }

        [StringLength(10)]
        public string? DocumentType { get; set; }

        [StringLength(35)]
        public string? CellCode { get; set; }

        [StringLength(20)]
        public string? WarehouseCode { get; set; }

        [StringLength(50)]
        public string? ProductCode { get; set; }

        [StringLength(4)]
        public string? YearCode { get; set; }

        [StringLength(50)]
        public string? Description1 { get; set; }

        [StringLength(100)]
        public string? Description2 { get; set; }

        public byte? Type { get; set; }
        public byte? PriorityLevel { get; set; }
    }
}