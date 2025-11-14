using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_WO_ROUTE tablosu:
    // Üretim veya transfer sürecinde, her satırın (WoLine) izlediği rotayı (kaynak → hedef) tanımlar.
    // Rota, malzemenin hangi depodan/hücreden nereye taşındığını, hangi sırayla işlendiğini belirtir.
    [Table("RII_WO_ROUTE")]
    public class WoRoute : BaseEntity
    {
        // Bu rota hangi WoLine kaydına bağlı (örneğin üretim satırı veya transfer kalemi)
        // Navigation property – rota, bağlı olduğu satıra (WoLine) erişim sağlar
        [Required, ForeignKey(nameof(Line))]
        public long LineId { get; set; }
        public virtual WoLine Line { get; set; } = null!;

        // Stok kodu – bu rotanın ilişkili olduğu ürün veya malzeme
        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        // Rota kodu – ERP veya WMS içindeki operasyon/rota tanımı
        // Örneğin: “MONT01”, “BOYA02”, “AMBALAJ”
        [MaxLength(30)]
        public string RouteCode { get; set; } = string.Empty;

        // Bu rotada işlenecek veya taşınacak miktar
        [Required]
        public decimal Quantity { get; set; }

        // Seri numarası bilgileri (isteğe bağlı)
        // Bazı üretimlerde veya fason işlemlerinde lot/seri takibi için kullanılır
        [MaxLength(50)]
        public string? SerialNo { get; set; }

        [MaxLength(50)]
        public string? SerialNo2 { get; set; }

        // Kaynak depo Id’si (ERP veya WMS içindeki depo referansı)
        // Örneğin: 10 = Hammadde Deposu
        public int? SourceWarehouse { get; set; }

        // Hedef depo Id’si (örneğin: 20 = Üretim Alanı)
        public int? TargetWarehouse { get; set; }

        // Kaynak hücre kodu (örneğin raf adresi veya üretim istasyonu kodu)
        [MaxLength(20)]
        public string? SourceCellCode { get; set; }

        // Hedef hücre kodu (örneğin hedef raf veya üretim istasyonu kodu)
        [MaxLength(20)]
        public string? TargetCellCode { get; set; }

        // Açıklama alanı – operasyon veya rota hakkında serbest bilgi
        [MaxLength(100)]
        public string? Description { get; set; }

        // Navigation properties ↓
        // İçe aktarılan (import edilen) satırlar ile ilişki (örneğin ERP’den veya CSV’den gelen rota verisi)
        public virtual ICollection<WoImportLine> ImportLines { get; set; } = new List<WoImportLine>();
    }
}
