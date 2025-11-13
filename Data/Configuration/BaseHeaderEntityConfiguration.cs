using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Data.Configuration
{
    public abstract class BaseHeaderEntityConfiguration<T> : BaseEntityConfiguration<T> where T : BaseHeaderEntity
    {
        public override void Configure(EntityTypeBuilder<T> builder)
        {
            base.Configure(builder);

            builder.Property(h => h.CompletionDate).IsRequired(false);
            builder.Property(h => h.IsCompleted).HasDefaultValue(false);

            builder.Property(h => h.IsPendingApproval).HasDefaultValue(false);
            builder.Property(h => h.ApprovalStatus).IsRequired(false);
            builder.Property(h => h.ApprovedByUserId).IsRequired(false);
            builder.Property(h => h.ApprovalDate).IsRequired(false);

            builder.Property(h => h.IsERPIntegrated).HasDefaultValue(false);
            builder.Property(h => h.ERPIntegrationDate).IsRequired(false);
            builder.Property(h => h.ERPReferenceNumber).IsRequired(false);
            builder.Property(h => h.ERPIntegrationStatus).IsRequired(false);
            builder.Property(h => h.ERPErrorMessage).IsRequired(false);
        }
    }
}