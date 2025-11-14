using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_IC_IMPORT_LINE tablosu:
    // ERP veya harici sistemlerden gelen sayım satır verilerini temsil eder.
    // IcHeader (belge), IcLine (kalem) ve IcRoute (rota) ile ilişkili olabilir.
    // Genellikle barkod, seri, lot gibi terminalden toplanan veya ERP’den çekilen satır detaylarını içerir.
    [Table("RII_IC_IMPORT_LINE")]
    public class IcImportLine : BaseEntity
    {
        // HEADER İLİŞKİSİ
        // Bu satırın ait olduğu üst belge (örneğin sayım fişi)
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual IcHeader Header { get; set; } = null!;

        // ÜRÜN / MALZEME BİLGİLERİ
        // Stok kodu – ERP veya WMS’deki ürün referansı
        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        [MaxLength(35)]
        public string? YapKod { get; set; } = null;

        // AÇIKLAMA ALANLARI
        // İşlemi açıklayan ek bilgiler (örneğin fason açıklaması, terminal notu)
        [MaxLength(30)]
        public string? Description1 { get; set; }

        [MaxLength(50)]
        public string? Description2 { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }

        public virtual ICollection<IcRoute> Routes { get; set; } = new List<IcRoute>();

    }
}
