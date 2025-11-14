using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WO_LINE_SERIAL_LINE")]
    public class WoLineSerialLine : BaseEntity
    {
       [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual WoLine Line { get; set; } = null!;

        [Required]
        public decimal Quantity { get; set; }

        // Seri bilgileri (isteğe bağlı, kalabilir veya kaldırılabilir)
        [MaxLength(50)]
        public string? SerialNo { get; set; }
        
        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        [MaxLength(20)]
        public string? SourceCellCode { get; set; }

        [MaxLength(20)]
        public string? TargetCellCode { get; set; }
    }
}