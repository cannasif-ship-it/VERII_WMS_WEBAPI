using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_PT_IMPORT_LINE tablosu:
    // ERP veya harici sistemlerden gelen üretim / transfer / fason satır verilerini temsil eder.
    // PtHeader (belge), PtLine (kalem) ve PtRoute (rota) ile ilişkili olabilir.
    // Genellikle barkod, seri, lot gibi terminalden toplanan veya ERP’den çekilen satır detaylarını içerir.
    [Table("RII_SIT_IMPORT_LINE")]
    public class SitImportLine : BaseEntity
    {
        // HEADER İLİŞKİSİ
        // Bu satırın ait olduğu üst belge (örneğin üretim transferi veya fason fişi)
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual SitHeader Header { get; set; } = null!;

        // LINE İLİŞKİSİ
        // Bu satır hangi işlem kalemine (SitLine) bağlı
        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual SitLine Line { get; set; } = null!;

        // ROUTE İLİŞKİSİ (isteğe bağlı)
        // Eğer satır belirli bir rota (operasyon adımı) üzerinden geliyorsa bu alan doldurulur
        [ForeignKey(nameof(Route))]
        public long? RouteId { get; set; }
        public virtual SitRoute? Route { get; set; }

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
    }
}
