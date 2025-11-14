using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_SRT_IMPORT_LINE tablosu:
    // ERP veya harici sistemlerden gelen üretim / transfer / fason satır verilerini temsil eder.
    // SrtHeader (belge), SrtLine (kalem) ve SrtRoute (rota) ile ilişkili olabilir.
    // Genellikle barkod, seri, lot gibi terminalden toplanan veya ERP’den çekilen satır detaylarını içerir.
    [Table("RII_SRT_IMPORT_LINE")]
    public class SrtImportLine : BaseEntity
    {
        // HEADER İLİŞKİSİ
        // Bu satırın ait olduğu üst belge (örneğin üretim transferi veya fason fişi)
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual SrtHeader Header { get; set; } = null!;

        // LINE İLİŞKİSİ
        // Bu satır hangi işlem kalemine (SrtLine) bağlı
        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual SrtLine Line { get; set; } = null!;

        // ROUTE İLİŞKİSİ (isteğe bağlı)
        // Eğer satır belirli bir rota (operasyon adımı) üzerinden geliyorsa bu alan doldurulur
        [ForeignKey(nameof(Route))]
        public long? RouteId { get; set; }
        public virtual SrtRoute? Route { get; set; }

        // ÜRÜN / MALZEME BİLGİLERİ
        // Stok kodu – ERP veya WMS’deki ürün referansı
        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        // Seri numaraları (lot veya barkod takibi için)
        // Birden fazla seri desteği (örneğin komponent bazlı ürünler için)
        [MaxLength(50)]
        public string? SerialNo { get; set; }

        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        [MaxLength(50)]
        public string? SerialNo3 { get; set; }

        [MaxLength(50)]
        public string? SerialNo4 { get; set; }

        // Aktarılan miktar
        [Required]
        public decimal Quantity { get; set; } = 0;

        // Terminal veya barkod okuyucudan okunan orijinal barkod değeri
        [MaxLength(100)]
        public string? ScannedBarkod { get; set; }

        // ERP İLİŞKİSİ
        // ERP tarafındaki üretim veya sipariş bilgileri
        [MaxLength(50)]
        public string? ErpOrderNumber { get; set; }    // Eski/alternatif sipariş numarası

        [MaxLength(50)]
        public string? ErpOrderNo { get; set; }        // Ana sipariş numarası

        [MaxLength(10)]
        public string? ErpOrderLineNumber { get; set; } // ERP satır numarası

        [MaxLength(10)]
        public string? ErpOrderSequence { get; set; }   // ERP sıra veya operasyon numarası

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
