using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WT_LINE")]
    public class WtLine : BaseEntity
    {
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual WtHeader Header { get; set; } = null!;

        public int? OrderId { get; set; }

        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        public string? YapKod { get; set; } = null;

        [Required, Column(TypeName = "decimal(18,6)")]
        public decimal Quantity { get; set; }

        [MaxLength(10)]
        public string? Unit { get; set; }

        // ERP fields
        [MaxLength(50)]
        public string? ErpOrderNo { get; set; }

        [MaxLength(10)]
        public string? ErpOrderLineNo { get; set; }

        [MaxLength(10)]
        public string? ErpLineReference { get; set; }

        [MaxLength(100)]
        public string? Description { get; set; }

        // Navigation properties
        public virtual ICollection<WtImportLine> ImportLines { get; set; } = new List<WtImportLine>();
        public virtual ICollection<WtLineSerialLine> SerialLines { get; set; } = new List<WtLineSerialLine>();
    }
}