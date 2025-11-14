using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WT_ROUTE")]
    public class WtRoute : BaseEntity
    {
       [Required, ForeignKey(nameof(Route))]
        public long RouteId { get; set; }
        public virtual WtRoute Route { get; set; } = null!;

        [MaxLength(50)]
        public string Barcode { get; set; } = string.Empty;

        [Required]
        public decimal Quantity { get; set; }

        // Seri bilgileri (isteğe bağlı, kalabilir veya kaldırılabilir)
        [MaxLength(50)]
        public string? SerialNo { get; set; }
        
        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        // Location details
        public int? SourceWarehouse { get; set; }
        public int? TargetWarehouse { get; set; }

        [MaxLength(20)]
        public string? SourceCellCode { get; set; }

        [MaxLength(20)]
        public string? TargetCellCode { get; set; }
    }
}