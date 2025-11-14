using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WO_IMPORT_LINE")]
    public class WoImportLine : BaseEntity
    {
        [Required, ForeignKey(nameof(HeaderId))]
        public long HeaderId { get; set; }
        public virtual WoHeader Header { get; set; } = null!;

        public long? LineId { get; set; }
        [ForeignKey(nameof(LineId))]
        public virtual WoLine? Line { get; set; }

        // ÜRÜN / MALZEME BİLGİLERİ
        // Stok kodu – ERP veya WMS’deki ürün referansı
        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        // AÇIKLAMA ALANLARI
        // İşlemi açıklayan ek bilgiler (örneğin fason açıklaması, terminal notu)
        [MaxLength(30)]
        public string? Description1 { get; set; }

        [MaxLength(50)]
        public string? Description2 { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }

        // Navigation properties
        public virtual ICollection<WoRoute> Routes { get; set; } = new List<WoRoute>();
    }
}
