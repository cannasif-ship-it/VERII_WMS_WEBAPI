using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WI_IMPORT_LINE")]
    public class WiImportLine : BaseEntity
    {
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual WiHeader Header { get; set; } = null!;

        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual WiLine Line { get; set; } = null!;

        [ForeignKey(nameof(Route))]
        public long? RouteId { get; set; }
        public virtual WiRoute? Route { get; set; }

        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        [MaxLength(30)]
        public string? Description1 { get; set; }

        [MaxLength(50)]
        public string? Description2 { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }
    }
}
