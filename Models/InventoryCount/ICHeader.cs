using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_IC_HEADER tablosu:
    // Üretim transfer fişinin veya üretim hareketinin üst bilgilerini (header) tutar.
    // Her header birden fazla satır (PtLine) içerir.
    [Table("RII_IC_HEADER")]
    public class ICHeader : BaseHeaderEntity
    {
        // Şube kodu – ERP’deki şube veya işyeri kodunu temsil eder (örnek: "01")
        [Required, MaxLength(10)]
        public string BranchCode { get; set; } = null!;

        // Proje kodu – Eğer üretim/transfer belirli bir projeye aitse kullanılır
        [MaxLength(20)]
        public string? ProjectCode { get; set; }
        
        public DateTime DocumentDate { get; set; }

        // Belge tipi – örneğin:
        // "PT" = Production Transfer
        // "IN" = Üretim Girişi
        // "OUT" = Üretimden Çıkış
        // "FSN_OUT" = Fasona Çıkış
        // "FSN_IN" = Fasondan Giriş
        [Required, MaxLength(10)]
        public string DocumentType { get; set; } = null!;

        [MaxLength(35)]
        public string? CellCode { get; set; }

        // Depo kodu – ürünlerin sayım yaptığı depo
        [MaxLength(20)]
        public string? WarehouseCode { get; set; }

        // Ürün kodu – sayım yapılacak ürünün kodu (örn. "M12345")
        [MaxLength(50)]
        public string? ProductCode { get; set; }

        // Yıl kodu – ERP’de dönemsel kayıtlar için kullanılır (örn. 2025)
        [Required, MaxLength(4)]
        public string YearCode { get; set; } = DateTime.Now.Year.ToString();

        // Açıklama alanları – kullanıcıya serbest bilgi notu veya ERP açıklamaları
        [MaxLength(50)]
        public string? Description1 { get; set; }

        [MaxLength(100)]
        public string? Description2 { get; set; }

        // Sayısal öncelik değeri (örneğin 1 = yüksek, 3 = düşük)
        public byte? PriorityLevel { get; set; }

        // Sayım tipi (örnek: 1 = Tam Sayım, 2 = Kısmi Sayım, 3 = Döngü Sayım)
        [Required]
        public byte Type { get; set; }

        public virtual ICollection<IcTerminalLine> TerminalLines { get; set; } = new List<IcTerminalLine>();
        public virtual ICollection<ICImportLine> ImportLines { get; set; } = new List<ICImportLine>();

    }
}
