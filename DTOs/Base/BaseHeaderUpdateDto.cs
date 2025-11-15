using System;

namespace WMS_WEBAPI.DTOs
{
    public class BaseHeaderUpdateDto
    {
        public string? BranchCode { get; set; }
        public string? ProjectCode { get; set; }
        public string? DocumentType { get; set; }
        public string? YearCode { get; set; }
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
        public byte? PriorityLevel { get; set; }
        public DateTime? PlannedDate { get; set; }
        public bool? IsPlanned { get; set; }
    }
}