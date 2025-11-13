using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_PT_LINE tablosu: Üretim Transfer (Production Transfer) veya Üretim Satırı kayıtlarını tutar
    [Table("RII_PT_LINE")]
    public class PtLine : BaseEntity
    {
        // İlgili başlık (header) kaydının Id’si. Her satır bir header’a bağlıdır.
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }

        // Header ilişkisi (1-N ilişki). Navigation property.
        public virtual PtHeader Header { get; set; } = null!;

        // Stok kodu – ERP veya WMS tarafındaki malzeme/ürün kodu
        [Required, MaxLength(35)]
        public string StockCode { get; set; } = null!;

        // Eğer satır bir üretim emrine veya iş emrine bağlıysa, bu id o kaydı gösterir (opsiyonel)
        public int? OrderId { get; set; }

        // Satırdaki miktar – üretime gönderilen ya da üretilen miktar
        [Required]
        public decimal Quantity { get; set; }

        // Miktarın birimi (örneğin KG, ADET, MTR)
        [MaxLength(10)]
        public string? Unit { get; set; }

        // ERP alanları ↓
        // ERP'deki üretim veya transfer emri numarası (örneğin Netsis Üretim Emri No)
        [MaxLength(50)]
        public string? ErpOrderNo { get; set; }

        // ERP emrinin satır numarası (örneğin "001", "002")
        [MaxLength(10)]
        public string? ErpOrderLineNo { get; set; }

        // ERP satır referansı – genellikle ERP sisteminde satırı eşleştirmek için kullanılır
        [MaxLength(10)]
        public string? ErpLineReference { get; set; }

        // Satır açıklaması – stokun, operasyonun veya üretim işinin açıklaması olabilir
        [MaxLength(100)]
        public string? Description { get; set; }

        // Navigation properties ↓
        // Üretim rotasıyla ilişkili adımlar (örneğin iş istasyonları, operasyon sıraları)
        public virtual ICollection<PtRoute> Routes { get; set; } = new List<PtRoute>();

        // Harici sistemden (ERP, Excel vb.) içe aktarılan satırlarla ilişki
        public virtual ICollection<PtImportLine> ImportLines { get; set; } = new List<PtImportLine>();

        // Terminal (operatör, üretim istasyonu) tarafından işlenen satırlar
        public virtual ICollection<PtTerminalLine> TerminalLines { get; set; } = new List<PtTerminalLine>();
    }
}
