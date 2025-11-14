using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_WI_HEADER tablosu:
    // Üretim transfer fişinin veya üretim hareketinin üst bilgilerini (header) tutar.
    // Her header birden fazla satır (WoLine) içerir.
    [Table("RII_WI_HEADER")]
    public class WiHeader : BaseHeaderEntity
    {
        // Şube kodu – ERP’deki şube veya işyeri kodunu temsil eder (örnek: "01")
        [Required, MaxLength(10)]
        public string BranchCode { get; set; } = null!;

        // Proje kodu – Eğer üretim/transfer belirli bir projeye aitse kullanılır
        [MaxLength(20)]
        public string? ProjectCode { get; set; }

        // Belge numarası – ERP veya WMS tarafından üretilen fiş numarası (örnek: "WO000123")
        [Required, MaxLength(50)]
        public string DocumentNo { get; set; } = null!;

        // Belge tarihi – fişin oluşturulma veya ERP’ye gönderilme tarihi
        public DateTime DocumentDate { get; set; }

        // Belge tipi – örneğin:
        // "WO" = Warehouse Outbound
        // "IN" = Üretim Girişi
        // "OUT" = Üretimden Çıkış
        // "FSN_OUT" = Fasona Çıkış
        // "FSN_IN" = Fasondan Giriş
        [Required, MaxLength(10)]
        public string DocumentType { get; set; } = null!;

        // 1 = Sevk İrsaliyesi
        // 2 = Fire Çıkış
        // 3 = Düzeltme Çıkış
        // 4 = Transfer ile Çıkış
        [Required, MaxLength(10)]
        public string InboundType { get; set; } = null!;

        // Hesap kodu – genellikle finansal işlemler için kullanılır (örnek: "1000")
        [MaxLength(20)]
        public string? AccountCode { get; set; }

        // Müşteri kodu – genellikle fason üretim veya dış kaynak durumlarında kullanılır (ERP cari kodu)
        [MaxLength(20)]
        public string? CustomerCode { get; set; }

        // Kaynak depo kodu – ürünlerin çıkış yaptığı depo
        [MaxLength(20)]
        public string? SourceWarehouse { get; set; }

        // Hedef depo kodu – ürünlerin giriş yaptığı depo
        [MaxLength(20)]
        public string? TargetWarehouse { get; set; }

        // Yıl kodu – ERP’de dönemsel kayıtlar için kullanılır (örn. 2025)
        [Required, MaxLength(4)]
        public string YearCode { get; set; } = DateTime.Now.Year.ToString();

        // Açıklama alanları – kullanıcıya serbest bilgi notu veya ERP açıklamaları
        [MaxLength(50)]
        public string? Description1 { get; set; }

        [MaxLength(100)]
        public string? Description2 { get; set; }

        // Kayıt tipi (örnek: 0 = üretim transfer, 1 = fason, 2 = üretim çıkışı)
        [Required]
        public byte Type { get; set; }

        // Header’a bağlı satır kayıtları (üretim kalemleri, malzeme detayları)
        public virtual ICollection<WiLine> Lines { get; set; } = new List<WiLine>();

        // Harici kaynaklardan (örneğin Excel, ERP import) gelen satır kayıtları
        public virtual ICollection<WiImportLine> ImportLines { get; set; } = new List<WiImportLine>();
    }
}
