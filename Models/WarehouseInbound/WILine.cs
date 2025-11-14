using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_WI_LINE tablosu: Warehouse Inbound (Warehouse Inbound) veya Warehouse Inbound Satırı kayıtlarını tutar
    [Table("RII_WI_LINE")]
    public class WiLine : BaseEntity
    {
        // İlgili başlık (header) kaydının Id’si. Her satır bir header’a bağlıdır.
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual WiHeader Header { get; set; } = null!;

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

        public virtual ICollection<WiRoute> Routes { get; set; } = new List<WiRoute>();

        // Harici sistemden (ERP, Excel vb.) içe aktarılan satırlarla ilişki
        public virtual ICollection<WiImportLine> ImportLines { get; set; } = new List<WiImportLine>();

        // Terminal (operatör, üretim istasyonu) tarafından işlenen satırlar
        public virtual ICollection<WiTerminalLine> TerminalLines { get; set; } = new List<WiTerminalLine>();
    }
}
