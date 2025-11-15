using System;
using System.ComponentModel.DataAnnotations;

namespace WMS_WEBAPI.DTOs
{
    public class GrHeaderDto : BaseHeaderEntityDto
    {
        [Required]
        [StringLength(30)]
        public string CustomerCode { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string ERPDocumentNo { get; set; } = null!;

        public DateTime DocumentDate { get; set; }

        public bool ReturnCode { get; set; } = false;
        public bool OCRSource { get; set; } = false;

        [StringLength(50)]
        public string? Description3 { get; set; }
        
        [StringLength(100)]
        public string? Description4 { get; set; }
        
        [StringLength(100)]
        public string? Description5 { get; set; }
    }

    public class CreateGrHeaderDto : BaseHeaderCreateDto
    {
        [Required]
        [StringLength(30)]
        public string CustomerCode { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string ERPDocumentNo { get; set; } = null!;

        public DateTime DocumentDate { get; set; }

        public bool ReturnCode { get; set; } = false;
        public bool OCRSource { get; set; } = false;

        [StringLength(50)]
        public string? Description3 { get; set; }
        
        [StringLength(100)]
        public string? Description4 { get; set; }
        
        [StringLength(100)]
        public string? Description5 { get; set; }
    }

    public class UpdateGrHeaderDto : BaseHeaderUpdateDto
    {
        [StringLength(30)]
        public string? CustomerCode { get; set; }

        [StringLength(20)]
        public string? ERPDocumentNo { get; set; }

        public DateTime? DocumentDate { get; set; }

        public bool? ReturnCode { get; set; }
        public bool? OCRSource { get; set; }

        [StringLength(50)]
        public string? Description3 { get; set; }
        
        [StringLength(100)]
        public string? Description4 { get; set; }
        
        [StringLength(100)]
        public string? Description5 { get; set; }
    }
}
