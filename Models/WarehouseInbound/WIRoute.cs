using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WI_ROUTE")]
    public class WiRoute : BaseEntity
    {
        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual WiLine Line { get; set; } = null!;

        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        [MaxLength(30)]
        public string RouteCode { get; set; } = string.Empty;

        [Required]
        public decimal Quantity { get; set; }

        [MaxLength(50)]
        public string? SerialNo { get; set; }

        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [MaxLength(20)]
        public string? SourceCellCode { get; set; }

        [MaxLength(20)]
        public string? TargetCellCode { get; set; }

        [MaxLength(100)]
        public string? Description { get; set; }

        public virtual ICollection<WiImportLine> ImportLines { get; set; } = new List<WiImportLine>();
    }
}
