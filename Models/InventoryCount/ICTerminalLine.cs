using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    // RII_IC_TERMINAL_LINE tablosu:
    // Üretim veya transfer sürecinde, terminal (mobil cihaz / operatör paneli) tarafından işlenen kayıtları temsil eder.
    // Hangi kullanıcı hangi fiş üzerinde işlem yaptı, bunu izlemek için kullanılır.
    [Table("RII_IC_TERMINAL_LINE")]
    public class IcTerminalLine : BaseEntity
    {
        // İlgili IcHeader (fiş) kaydının Id'si.
        // Bu, operatörün hangi sayım fişi üzerinde işlem yaptığını gösterir.
        // Header ilişkisi (1-N) — terminal satırı, hangi IcHeader’a bağlı olduğunu belirtir.
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual IcHeader Header { get; set; } = null!;

        // Terminali kullanan operatörün (kullanıcı) Id'si.
        // Bu, işlem yapan kişiyi (User tablosundaki kaydı) belirtir.
        [ForeignKey(nameof(User))]
        public long TerminalUserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}
