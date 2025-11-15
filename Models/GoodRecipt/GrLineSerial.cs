using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Models
{
    [Table("RII_GR_LINE_SERIAL")]
    public class GrLineSerial : BaseLineEntity
    {
        public long ImportLineId { get; set; }
        [ForeignKey(nameof(ImportLineId))]
        public virtual GrImportLine ImportLine { get; set; } = null!;


    }
}
