using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class WoHeaderDto
    {
        public long Id { get; set; }
        public string BranchCode { get; set; } = string.Empty;
        public string? ProjectCode { get; set; }
        public string DocumentNo { get; set; } = string.Empty;
        public DateTime DocumentDate { get; set; }
        public string DocumentType { get; set; } = string.Empty;
        public string OutboundType { get; set; } = string.Empty;
        public string? AccountCode { get; set; }
        public string? CustomerCode { get; set; }
        public string? SourceWarehouse { get; set; }
        public string? TargetWarehouse { get; set; }
        public string YearCode { get; set; } = string.Empty;
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
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

    public class CreateWoHeaderDto
    {
        [Required, StringLength(10)]
        public string BranchCode { get; set; } = string.Empty;

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        [Required, StringLength(50)]
        public string DocumentNo { get; set; } = string.Empty;

        public DateTime DocumentDate { get; set; }

        [Required, StringLength(10)]
        public string DocumentType { get; set; } = string.Empty;

        [Required, StringLength(10)]
        public string OutboundType { get; set; } = string.Empty;

        [StringLength(20)]
        public string? AccountCode { get; set; }

        [StringLength(20)]
        public string? CustomerCode { get; set; }

        [StringLength(20)]
        public string? SourceWarehouse { get; set; }

        [StringLength(20)]
        public string? TargetWarehouse { get; set; }

        [Required, StringLength(4)]
        public string YearCode { get; set; } = string.Empty;

        [StringLength(50)]
        public string? Description1 { get; set; }

        [StringLength(100)]
        public string? Description2 { get; set; }

        [Required]
        public byte Type { get; set; }
    }

    public class UpdateWoHeaderDto
    {
        [StringLength(10)]
        public string? BranchCode { get; set; }

        [StringLength(20)]
        public string? ProjectCode { get; set; }

        [StringLength(50)]
        public string? DocumentNo { get; set; }

        public DateTime? DocumentDate { get; set; }

        [StringLength(10)]
        public string? DocumentType { get; set; }

        [StringLength(10)]
        public string? OutboundType { get; set; }

        [StringLength(20)]
        public string? AccountCode { get; set; }

        [StringLength(20)]
        public string? CustomerCode { get; set; }

        [StringLength(20)]
        public string? SourceWarehouse { get; set; }

        [StringLength(20)]
        public string? TargetWarehouse { get; set; }

        [StringLength(4)]
        public string? YearCode { get; set; }

        [StringLength(50)]
        public string? Description1 { get; set; }

        [StringLength(100)]
        public string? Description2 { get; set; }

        public byte? Type { get; set; }
    }
}