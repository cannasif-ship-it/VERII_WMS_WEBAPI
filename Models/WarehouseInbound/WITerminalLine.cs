using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WI_TERMINAL_LINE")]
    public class WiTerminalLine : BaseEntity
    {
        [Required, ForeignKey(nameof(Header))]
        public long HeaderId { get; set; }
        public virtual WiHeader Header { get; set; } = null!;

        [ForeignKey(nameof(User))]
        public long TerminalUserId { get; set; }
        public virtual User User { get; set; } = null!;
    }
}