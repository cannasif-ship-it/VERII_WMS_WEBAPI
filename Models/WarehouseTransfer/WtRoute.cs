using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WMS_WEBAPI.Models
{
    [Table("RII_WT_ROUTE")]
    public class WtRoute : BaseRouteEntity
    {
       
        public long RouteId { get; set; }
        [ForeignKey(nameof(RouteId))]
        public virtual WtRoute Route { get; set; } = null!;

    }
}