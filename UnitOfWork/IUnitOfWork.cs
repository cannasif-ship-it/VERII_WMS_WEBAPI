using WMS_WEBAPI.Models;
using WMS_WEBAPI.Repositories;

namespace WMS_WEBAPI.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        // Repository properties
        IUserRepository Users { get; }
        IGenericRepository<User> UserEntities { get; }
        IGenericRepository<BaseEntity> BaseEntities { get; }
        IGenericRepository<BaseHeaderEntity> BaseHeaderEntities { get; }
        
        // GoodReceipt repositories
        IGenericRepository<GrHeader> GrHeaders { get; }
        IGenericRepository<GrLine> GrLines { get; }
        IGenericRepository<GrImportDocument> GrImportDocuments { get; }
        IGenericRepository<GrImportL> GrImportLines { get; }
        IGenericRepository<GrImportSerialLine> GrImportSerialLines { get; }
        
        // User and Authority repositories
        IGenericRepository<UserAuthority> UserAuthorities { get; }
        
        // PlatformSidebar repositories
        IGenericRepository<PlatformPageGroup> PlatformPageGroups { get; }
        IGenericRepository<SidebarmenuHeader> SidebarmenuHeaders { get; }
        IGenericRepository<SidebarmenuLine> SidebarmenuLines { get; }
        IGenericRepository<PlatformUserGroupMatch> PlatformUserGroupMatches { get; }
        
        // MobileSidebar repositories
        IGenericRepository<MobilePageGroup> MobilePageGroups { get; }
        IGenericRepository<MobileUserGroupMatch> MobileUserGroupMatches { get; }
        IGenericRepository<MobilemenuHeader> MobilemenuHeaders { get; }
        IGenericRepository<MobilemenuLine> MobilemenuLines { get; }
        
        // WarehouseTransfer repositories
        IGenericRepository<TrBox> TrBoxes { get; }
        IGenericRepository<TrSBox> TrSBoxes { get; }
        IGenericRepository<TrLine> TrLines { get; }
        IGenericRepository<TrHeader> TrHeaders { get; }
        IGenericRepository<TrRoute> TrRoutes { get; }
        IGenericRepository<TrTerminalLine> TrTerminalLines { get; }
        IGenericRepository<TrImportLine> TrImportLines { get; }

        // ProductTransfer repositories
        IGenericRepository<PtHeader> PtHeaders { get; }
        IGenericRepository<PtLine> PtLines { get; }
        IGenericRepository<PtImportLine> PtImportLines { get; }
        IGenericRepository<PtRoute> PtRoutes { get; }
        IGenericRepository<PtTerminalLine> PtTerminalLines { get; }

        // SubcontractingIssueTransfer repositories
        IGenericRepository<SitHeader> SitHeaders { get; }
        IGenericRepository<SitLine> SitLines { get; }
        IGenericRepository<SitImportLine> SitImportLines { get; }
        IGenericRepository<SitRoute> SitRoutes { get; }
        IGenericRepository<SitTerminalLine> SitTerminalLines { get; }

        // SubcontractingReceiptTransfer repositories
        IGenericRepository<SrtHeader> SrtHeaders { get; }
        IGenericRepository<SrtLine> SrtLines { get; }
        IGenericRepository<SrtImportLine> SrtImportLines { get; }
        IGenericRepository<SrtRoute> SrtRoutes { get; }
        IGenericRepository<SrtTerminalLine> SrtTerminalLines { get; }

        // WarehouseOutbound repositories
        IGenericRepository<WoHeader> WoHeaders { get; }
        IGenericRepository<WoLine> WoLines { get; }
        IGenericRepository<WoImportLine> WoImportLines { get; }
        IGenericRepository<WoRoute> WoRoutes { get; }
        IGenericRepository<WoTerminalLine> WoTerminalLines { get; }

        // WarehouseInbound repositories
        IGenericRepository<WiHeader> WiHeaders { get; }
        IGenericRepository<WiLine> WiLines { get; }
        IGenericRepository<WiImportLine> WiImportLines { get; }
        IGenericRepository<WiRoute> WiRoutes { get; }
        IGenericRepository<WiTerminalLine> WiTerminalLines { get; }




        // Methods
        Task<long> SaveChangesAsync();
        long SaveChanges();
    }
}