using System;

namespace WMS_WEBAPI.DTOs
{
    public class BaseHeaderCreateDto
    {
        public string BranchCode { get; set; } = string.Empty;
        public string? ProjectCode { get; set; }
        public string DocumentType { get; set; } = string.Empty;
        public string YearCode { get; set; } = string.Empty;
        public string? Description1 { get; set; }
        public string? Description2 { get; set; }
        public byte? PriorityLevel { get; set; }
        public DateTime PlannedDate { get; set; }
        public bool IsPlanned { get; set; }
    }
}