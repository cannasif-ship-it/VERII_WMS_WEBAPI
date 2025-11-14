using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.Repositories;

namespace WMS_WEBAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WmsDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private bool _disposed = false;

        // Repository instances
        private IUserRepository? _users;
        private IGenericRepository<User>? _userEntities;
        private IGenericRepository<BaseEntity>? _baseEntities;
        private IGenericRepository<BaseHeaderEntity>? _baseHeaderEntities;
        
        // GoodReceipt repository instances
        private IGenericRepository<GrHeader>? _grHeaders;
        private IGenericRepository<GrLine>? _grLines;
        private IGenericRepository<GrImportDocument>? _grImportDocuments;
        private IGenericRepository<GrImportL>? _grImportLines;
        private IGenericRepository<GrImportSerialLine>? _grImportSerialLines;
        
        // User and Authority repository instances
        private IGenericRepository<UserAuthority>? _userAuthorities;
        
        // PlatformSidebar repository instances
        private IGenericRepository<PlatformPageGroup>? _platformPageGroups;
        private IGenericRepository<SidebarmenuHeader>? _sidebarmenuHeaders;
        private IGenericRepository<SidebarmenuLine>? _sidebarmenuLines;
        private IGenericRepository<PlatformUserGroupMatch>? _platformUserGroupMatches;
        
        // MobileSidebar repository instances
        private IGenericRepository<MobilePageGroup>? _mobilePageGroups;
        private IGenericRepository<MobileUserGroupMatch>? _mobileUserGroupMatches;
        private IGenericRepository<MobilemenuHeader>? _mobilemenuHeaders;
        private IGenericRepository<MobilemenuLine>? _mobilemenuLines;
        
        // WarehouseTransfer repository instances
        private IGenericRepository<TrBox>? _trBoxes;
        private IGenericRepository<TrSBox>? _trSBoxes;
        private IGenericRepository<TrLine>? _trLines;
        private IGenericRepository<TrHeader>? _trHeaders;
        private IGenericRepository<TrRoute>? _trRoutes;
        private IGenericRepository<TrTerminalLine>? _trTerminalLines;
        private IGenericRepository<TrImportLine>? _trImportLines;

        // ProductTransfer repository instances
        private IGenericRepository<PtHeader>? _ptHeaders;
        private IGenericRepository<PtLine>? _ptLines;
        private IGenericRepository<PtImportLine>? _ptImportLines;
        private IGenericRepository<PtRoute>? _ptRoutes;
        private IGenericRepository<PtTerminalLine>? _ptTerminalLines;

        // SubcontractingIssueTransfer repository instances
        private IGenericRepository<SitHeader>? _sitHeaders;
        private IGenericRepository<SitLine>? _sitLines;
        private IGenericRepository<SitImportLine>? _sitImportLines;
        private IGenericRepository<SitRoute>? _sitRoutes;
        private IGenericRepository<SitTerminalLine>? _sitTerminalLines;

        // SubcontractingReceiptTransfer repository instances
        private IGenericRepository<SrtHeader>? _srtHeaders;
        private IGenericRepository<SrtLine>? _srtLines;
        private IGenericRepository<SrtImportLine>? _srtImportLines;
        private IGenericRepository<SrtRoute>? _srtRoutes;
        private IGenericRepository<SrtTerminalLine>? _srtTerminalLines;
        private IGenericRepository<WoHeader>? _woHeaders;
        private IGenericRepository<WoLine>? _woLines;
        private IGenericRepository<WoImportLine>? _woImportLines;
        private IGenericRepository<WoRoute>? _woRoutes;
        private IGenericRepository<WoTerminalLine>? _woTerminalLines;
        private IGenericRepository<WiHeader>? _wiHeaders;
        private IGenericRepository<WiLine>? _wiLines;
        private IGenericRepository<WiImportLine>? _wiImportLines;
        private IGenericRepository<WiRoute>? _wiRoutes;
        private IGenericRepository<WiTerminalLine>? _wiTerminalLines;

        public UnitOfWork(WmsDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        // Repository properties
        public IUserRepository Users =>
            _users ??= new UserRepository(_context);

        public IGenericRepository<User> UserEntities =>
            _userEntities ??= new GenericRepository<User>(_context, _httpContextAccessor);

        public IGenericRepository<BaseEntity> BaseEntities =>
            _baseEntities ??= new GenericRepository<BaseEntity>(_context, _httpContextAccessor);

        public IGenericRepository<BaseHeaderEntity> BaseHeaderEntities =>
            _baseHeaderEntities ??= new GenericRepository<BaseHeaderEntity>(_context, _httpContextAccessor);

        // GoodReceipt repository properties
        public IGenericRepository<GrHeader> GrHeaders =>
            _grHeaders ??= new GenericRepository<GrHeader>(_context, _httpContextAccessor);

        public IGenericRepository<GrLine> GrLines =>
            _grLines ??= new GenericRepository<GrLine>(_context, _httpContextAccessor);

        public IGenericRepository<GrImportDocument> GrImportDocuments =>
            _grImportDocuments ??= new GenericRepository<GrImportDocument>(_context, _httpContextAccessor);

        public IGenericRepository<GrImportL> GrImportLines =>
            _grImportLines ??= new GenericRepository<GrImportL>(_context, _httpContextAccessor);

        public IGenericRepository<GrImportSerialLine> GrImportSerialLines =>
            _grImportSerialLines ??= new GenericRepository<GrImportSerialLine>(_context, _httpContextAccessor);

        // User and Authority repository properties
        public IGenericRepository<UserAuthority> UserAuthorities =>
            _userAuthorities ??= new GenericRepository<UserAuthority>(_context, _httpContextAccessor);

        // PlatformSidebar repository properties
        public IGenericRepository<PlatformPageGroup> PlatformPageGroups =>
            _platformPageGroups ??= new GenericRepository<PlatformPageGroup>(_context, _httpContextAccessor);

        public IGenericRepository<SidebarmenuHeader> SidebarmenuHeaders =>
            _sidebarmenuHeaders ??= new GenericRepository<SidebarmenuHeader>(_context, _httpContextAccessor);

        public IGenericRepository<SidebarmenuLine> SidebarmenuLines =>
            _sidebarmenuLines ??= new GenericRepository<SidebarmenuLine>(_context, _httpContextAccessor);

        public IGenericRepository<PlatformUserGroupMatch> PlatformUserGroupMatches =>
            _platformUserGroupMatches ??= new GenericRepository<PlatformUserGroupMatch>(_context, _httpContextAccessor);

        // MobileSidebar repository properties
        public IGenericRepository<MobilePageGroup> MobilePageGroups =>
            _mobilePageGroups ??= new GenericRepository<MobilePageGroup>(_context, _httpContextAccessor);

        public IGenericRepository<MobileUserGroupMatch> MobileUserGroupMatches =>
            _mobileUserGroupMatches ??= new GenericRepository<MobileUserGroupMatch>(_context, _httpContextAccessor);

        public IGenericRepository<MobilemenuHeader> MobilemenuHeaders =>
            _mobilemenuHeaders ??= new GenericRepository<MobilemenuHeader>(_context, _httpContextAccessor);

        public IGenericRepository<MobilemenuLine> MobilemenuLines =>
            _mobilemenuLines ??= new GenericRepository<MobilemenuLine>(_context, _httpContextAccessor);

        // WarehouseTransfer repository properties
        public IGenericRepository<TrBox> TrBoxes =>
            _trBoxes ??= new GenericRepository<TrBox>(_context, _httpContextAccessor);

        public IGenericRepository<TrSBox> TrSBoxes =>
            _trSBoxes ??= new GenericRepository<TrSBox>(_context, _httpContextAccessor);

        public IGenericRepository<TrLine> TrLines =>
            _trLines ??= new GenericRepository<TrLine>(_context, _httpContextAccessor);

        public IGenericRepository<TrHeader> TrHeaders =>
            _trHeaders ??= new GenericRepository<TrHeader>(_context, _httpContextAccessor);

        public IGenericRepository<TrRoute> TrRoutes =>
            _trRoutes ??= new GenericRepository<TrRoute>(_context, _httpContextAccessor);

        public IGenericRepository<TrTerminalLine> TrTerminalLines =>
            _trTerminalLines ??= new GenericRepository<TrTerminalLine>(_context, _httpContextAccessor);

        public IGenericRepository<TrImportLine> TrImportLines =>
            _trImportLines ??= new GenericRepository<TrImportLine>(_context, _httpContextAccessor);

        // ProductTransfer repository properties
        public IGenericRepository<PtHeader> PtHeaders =>
            _ptHeaders ??= new GenericRepository<PtHeader>(_context, _httpContextAccessor);

        public IGenericRepository<PtLine> PtLines =>
            _ptLines ??= new GenericRepository<PtLine>(_context, _httpContextAccessor);

        public IGenericRepository<PtImportLine> PtImportLines =>
            _ptImportLines ??= new GenericRepository<PtImportLine>(_context, _httpContextAccessor);

        public IGenericRepository<PtRoute> PtRoutes =>
            _ptRoutes ??= new GenericRepository<PtRoute>(_context, _httpContextAccessor);

        public IGenericRepository<PtTerminalLine> PtTerminalLines =>
            _ptTerminalLines ??= new GenericRepository<PtTerminalLine>(_context, _httpContextAccessor);

        // SubcontractingIssueTransfer repository properties
        public IGenericRepository<SitHeader> SitHeaders =>
            _sitHeaders ??= new GenericRepository<SitHeader>(_context, _httpContextAccessor);

        public IGenericRepository<SitLine> SitLines =>
            _sitLines ??= new GenericRepository<SitLine>(_context, _httpContextAccessor);

        public IGenericRepository<SitImportLine> SitImportLines =>
            _sitImportLines ??= new GenericRepository<SitImportLine>(_context, _httpContextAccessor);

        public IGenericRepository<SitRoute> SitRoutes =>
            _sitRoutes ??= new GenericRepository<SitRoute>(_context, _httpContextAccessor);

        public IGenericRepository<SitTerminalLine> SitTerminalLines =>
            _sitTerminalLines ??= new GenericRepository<SitTerminalLine>(_context, _httpContextAccessor);

        // SubcontractingReceiptTransfer repository properties
        public IGenericRepository<SrtHeader> SrtHeaders =>
            _srtHeaders ??= new GenericRepository<SrtHeader>(_context, _httpContextAccessor);

        public IGenericRepository<SrtLine> SrtLines =>
            _srtLines ??= new GenericRepository<SrtLine>(_context, _httpContextAccessor);

        public IGenericRepository<SrtImportLine> SrtImportLines =>
            _srtImportLines ??= new GenericRepository<SrtImportLine>(_context, _httpContextAccessor);

        public IGenericRepository<SrtRoute> SrtRoutes =>
            _srtRoutes ??= new GenericRepository<SrtRoute>(_context, _httpContextAccessor);

        public IGenericRepository<SrtTerminalLine> SrtTerminalLines =>
            _srtTerminalLines ??= new GenericRepository<SrtTerminalLine>(_context, _httpContextAccessor);

        // WarehouseOutbound repository properties
        public IGenericRepository<WoHeader> WoHeaders =>
            _woHeaders ??= new GenericRepository<WoHeader>(_context, _httpContextAccessor);

        public IGenericRepository<WoLine> WoLines =>
            _woLines ??= new GenericRepository<WoLine>(_context, _httpContextAccessor);

        public IGenericRepository<WoImportLine> WoImportLines =>
            _woImportLines ??= new GenericRepository<WoImportLine>(_context, _httpContextAccessor);

        public IGenericRepository<WoRoute> WoRoutes =>
            _woRoutes ??= new GenericRepository<WoRoute>(_context, _httpContextAccessor);

        public IGenericRepository<WoTerminalLine> WoTerminalLines =>
            _woTerminalLines ??= new GenericRepository<WoTerminalLine>(_context, _httpContextAccessor);

        // WarehouseInbound repository properties
        public IGenericRepository<WiHeader> WiHeaders =>
            _wiHeaders ??= new GenericRepository<WiHeader>(_context, _httpContextAccessor);

        public IGenericRepository<WiLine> WiLines =>
            _wiLines ??= new GenericRepository<WiLine>(_context, _httpContextAccessor);

        public IGenericRepository<WiImportLine> WiImportLines =>
            _wiImportLines ??= new GenericRepository<WiImportLine>(_context, _httpContextAccessor);

        public IGenericRepository<WiRoute> WiRoutes =>
            _wiRoutes ??= new GenericRepository<WiRoute>(_context, _httpContextAccessor);

        public IGenericRepository<WiTerminalLine> WiTerminalLines =>
            _wiTerminalLines ??= new GenericRepository<WiTerminalLine>(_context, _httpContextAccessor);

        public async Task<long> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public long SaveChanges()
        {
            return _context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}