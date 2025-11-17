using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WtHeaderService : IWtHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WtHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<PagedResponse<WtHeaderDto>>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy = null,
            string? sortDirection = "asc")
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1) pageSize = 10;

                var query = _unitOfWork.WtHeaders.AsQueryable()
                    .Where(x => !x.IsDeleted);

                bool desc = string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase);
                switch (sortBy?.Trim())
                {
                    case "DocumentDate":
                        query = desc ? query.OrderByDescending(x => x.DocumentDate) : query.OrderBy(x => x.DocumentDate);
                        break;
                    case "DocumentNo":
                        query = desc ? query.OrderByDescending(x => x.DocumentNo) : query.OrderBy(x => x.DocumentNo);
                        break;
                    case "CreatedDate":
                        query = desc ? query.OrderByDescending(x => x.CreatedDate) : query.OrderBy(x => x.CreatedDate);
                        break;
                    default:
                        query = desc ? query.OrderByDescending(x => x.Id) : query.OrderBy(x => x.Id);
                        break;
                }

                var totalCount = await query.CountAsync();
                var items = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var dtos = _mapper.Map<List<WtHeaderDto>>(items);

                var result = new PagedResponse<WtHeaderDto>(dtos, totalCount, pageNumber, pageSize);

                return ApiResponse<PagedResponse<WtHeaderDto>>.SuccessResult(
                    result,
                    _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResponse<WtHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message,
                    ex.Message,
                    500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WtHeaders
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WtHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WtHeaders
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<WtHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                var dto = _mapper.Map<WtHeaderDto>(entity);
                return ApiResponse<WtHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WtHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetByDocumentNoAsync(string documentNo)
        {
            try
            {
                var entities = await _unitOfWork.WtHeaders
                    .FindAsync(x => x.DocumentNo == documentNo && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }



        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetByWarehouseAsync(string warehouse)
        {
            try
            {
                // Filter by SourceWarehouse or TargetWarehouse since WtHeader has these properties
                var entities = await _unitOfWork.WtHeaders  
                    .FindAsync(x => (x.SourceWarehouse == warehouse || x.TargetWarehouse == warehouse) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }


        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var entities = await _unitOfWork.WtHeaders
                    .FindAsync(x => x.DocumentDate >= startDate && x.DocumentDate <= endDate && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WtHeaderDto>> CreateAsync(CreateWtHeaderDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WtHeader>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;

                await _unitOfWork.WtHeaders.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<WtHeaderDto>(entity);
                return ApiResponse<WtHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WtHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WtHeaderDto>> UpdateAsync(long id, UpdateWtHeaderDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.WtHeaders.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<WtHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.WtHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<WtHeaderDto>(entity);
                return ApiResponse<WtHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WtHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.WtHeaders.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                await _unitOfWork.WtHeaders.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("RecordDeletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> CompleteAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WtHeaders.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                entity.IsCompleted = true;
                entity.CompletionDate = DateTime.UtcNow;
                entity.IsPendingApproval = false;

                _unitOfWork.WtHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("RecordCompletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetByBranchCodeAsync(string branchCode)
        {
            try
            {
                var entities = await _unitOfWork.WtHeaders
                    .FindAsync(x => x.BranchCode == branchCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetByCustomerCodeAsync(string customerCode)
        {
            try
            {
                var entities = await _unitOfWork.WtHeaders
                    .FindAsync(x => x.CustomerCode == customerCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtHeaderDto>>> GetByDocumentTypeAsync(string documentType)
        {
            try
            {
                var entities = await _unitOfWork.WtHeaders
                    .FindAsync(x => x.DocumentType == documentType && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WtHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        // Korelasyon anahtarlarıyla toplu Wt oluşturma: temp ID -> gerçek ID eşleme
        public async Task<ApiResponse<int>> BulkCreateInterWarehouseTransferAsync(BulkCreateWtRequestDto request)
        {
            try
            {
                using (var scope = new System.Transactions.TransactionScope(System.Transactions.TransactionScopeAsyncFlowOption.Enabled))
                {
                    // 1) Header oluştur ve kaydet
                    var wtHeader = _mapper.Map<WtHeader>(request.Header);
                    await _unitOfWork.WtHeaders.AddAsync(wtHeader);
                    await _unitOfWork.SaveChangesAsync();

                    // 2) Lines ekle ve ClientKey/ClientGuid -> LineId eşlemesi oluştur
                    var lineKeyToId = new Dictionary<string, long>(StringComparer.OrdinalIgnoreCase);
                    var lineGuidToId = new Dictionary<Guid, long>();
                    if (request.Lines != null && request.Lines.Count > 0)
                    {
                        var lines = new List<WtLine>(request.Lines.Count);
                        foreach (var lineDto in request.Lines)
                        {
                            var line = new WtLine
                            {
                                HeaderId = trHeader.Id,
                                StockCode = lineDto.StockCode,
                                OrderId = lineDto.OrderId,
                                Quantity = lineDto.Quantity,
                                Unit = lineDto.Unit,
                                ErpOrderNo = lineDto.ErpOrderNo,
                                ErpOrderLineNo = lineDto.ErpOrderLineNo,
                                ErpLineReference = lineDto.ErpLineReference,
                                Description = lineDto.Description
                            };
                            lines.Add(line);
                        }
                        await _unitOfWork.WtLines.AddRangeAsync(lines);
                        await _unitOfWork.SaveChangesAsync();

                        // İD'leri doldurulduktan sonra eşle
                        for (int i = 0; i < request.Lines.Count; i++)
                        {
                            var key = request.Lines[i].ClientKey;
                            var guid = request.Lines[i].ClientGuid;
                            var id = lines[i].Id;
                            if (!string.IsNullOrWhiteSpace(key))
                            {
                                lineKeyToId[key!] = id;
                            }
                            if (guid.HasValue)
                            {
                                lineGuidToId[guid.Value] = id;
                            }
                        }
                    }

                    // 3) Routes ekle ve LineClientKey/LineGroupGuid üzerinden LineId set et, ayrıca route için ClientKey/Guid -> RouteId eşlemesi oluştur
                    var routeKeyToId = new Dictionary<string, long>(StringComparer.OrdinalIgnoreCase);
                    var routeGuidToId = new Dictionary<Guid, long>();
                    if (request.Routes != null && request.Routes.Count > 0)
                    {
                        var routes = new List<WtRoute>(request.Routes.Count);
                        foreach (var rDto in request.Routes)
                        {
                            long lineId = 0;
                            if (rDto.LineGroupGuid.HasValue)
                            {
                                var lg = rDto.LineGroupGuid.Value;
                                if (!lineGuidToId.TryGetValue(lg, out lineId))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": LineGroupGuid bulunamadı: {lg}",
                                        "LineGroupGuidNotFound",
                                        400
                                    );
                                }
                            }
                            else if (!string.IsNullOrWhiteSpace(rDto.LineClientKey))
                            {
                                if (!lineKeyToId.TryGetValue(rDto.LineClientKey!, out lineId))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": LineClientKey bulunamadı: {rDto.LineClientKey}",
                                        "LineClientKeyNotFound",
                                        400
                                    );
                                }
                            }
                            else
                            {
                                return ApiResponse<int>.ErrorResult(
                                    _localizationService.GetLocalizedString("InvalidCorrelationKey") + ": Route için Line referansı (LineGroupGuid veya LineClientKey) zorunlu",
                                    "LineReferenceMissing",
                                    400
                                );
                            }

                            var route = new WtRoute
                            {
                                LineId = lineId,
                                StockCode = rDto.StockCode,
                                RouteCode = rDto.RouteCode ?? string.Empty,
                                Quantity = rDto.Quantity,
                                SerialNo = rDto.SerialNo,
                                SerialNo2 = rDto.SerialNo2,
                                SourceWarehouse = rDto.SourceWarehouse,
                                TargetWarehouse = rDto.TargetWarehouse,
                                SourceCellCode = rDto.SourceCellCode,
                                TargetCellCode = rDto.TargetCellCode,
                                Priority = rDto.Priority,
                                Description = rDto.Description
                            };
                            routes.Add(route);
                        }
                        await _unitOfWork.WtRoutes.AddRangeAsync(routes);
                        await _unitOfWork.SaveChangesAsync();

                        // route client key / group guid -> id eşlemesi
                        for (int i = 0; i < request.Routes.Count; i++)
                        {
                            var key = request.Routes[i].ClientKey;
                            var guid = request.Routes[i].ClientGroupGuid;
                            var id = routes[i].Id;
                            if (!string.IsNullOrWhiteSpace(key))
                            {
                                routeKeyToId[key!] = id;
                            }
                            if (guid.HasValue)
                            {
                                routeGuidToId[guid.Value] = id;
                            }
                        }
                    }

                    // 4) ImportLines ekle ve LineClientKey/LineGroupGuid'den LineId, RouteClientKey/RouteGroupGuid'den RouteId set et
                    if (request.ImportLines != null && request.ImportLines.Count > 0)
                    {
                        var importLines = new List<WtImportLine>(request.ImportLines.Count);
                        foreach (var importDto in request.ImportLines)
                        {
                            long lineId = 0;
                            if (importDto.LineGroupGuid.HasValue)
                            {
                                var lg = importDto.LineGroupGuid.Value;
                                if (!lineGuidToId.TryGetValue(lg, out lineId))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": LineGroupGuid bulunamadı: {lg}",
                                        "LineGroupGuidNotFound",
                                        400
                                    );
                                }
                            }
                            else if (!string.IsNullOrWhiteSpace(importDto.LineClientKey))
                            {
                                if (!lineKeyToId.TryGetValue(importDto.LineClientKey!, out lineId))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": LineClientKey bulunamadı: {importDto.LineClientKey}",
                                        "LineClientKeyNotFound",
                                        400
                                    );
                                }
                            }
                            else
                            {
                                return ApiResponse<int>.ErrorResult(
                                    _localizationService.GetLocalizedString("InvalidCorrelationKey") + ": ImportLine için Line referansı (LineGroupGuid veya LineClientKey) zorunlu",
                                    "LineReferenceMissing",
                                    400
                                );
                            }

                            long? routeId = null;
                            if (importDto.RouteGroupGuid.HasValue)
                            {
                                var rg = importDto.RouteGroupGuid.Value;
                                if (!routeGuidToId.TryGetValue(rg, out var rid))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": RouteGroupGuid bulunamadı: {rg}",
                                        "RouteGroupGuidNotFound",
                                        400
                                    );
                                }
                                routeId = rid;
                            }
                            else if (!string.IsNullOrWhiteSpace(importDto.RouteClientKey))
                            {
                                if (routeKeyToId.TryGetValue(importDto.RouteClientKey!, out var rid))
                                {
                                    routeId = rid;
                                }
                                else
                                {
                                    // Route opsiyonel olduğundan, bulunamazsa null bırakabiliriz
                                    routeId = null;
                                }
                            }

                            var importLine = new WtImportLine
                            {
                                HeaderId = wtHeader.Id,
                                LineId = lineId,
                                LineId1 = lineId, // DB'deki ek FK sütunu ile uyum
                                RouteId = routeId,
                                StockCode = importDto.StockCode,
                                Quantity = importDto.Quantity,
                                SerialNo = importDto.SerialNo,
                                SerialNo2 = importDto.SerialNo2,
                                SerialNo3 = importDto.SerialNo3,
                                SerialNo4 = importDto.SerialNo4,
                                ScannedBarkod = importDto.ScannedBarkod,
                                ErpOrderNumber = importDto.ErpOrderNumber,
                                ErpOrderNo = importDto.ErpOrderNo,
                                ErpOrderLineNumber = int.TryParse(importDto.ErpOrderLineNumber, out var ln) ? ln : null
                            };
                            importLines.Add(importLine);
                        }
                        await _unitOfWork.TrImportLines.AddRangeAsync(importLines);
                        await _unitOfWork.SaveChangesAsync();
                    }

                    scope.Complete();
                    return ApiResponse<int>.SuccessResult(1, _localizationService.GetLocalizedString("Success"));
                }
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.Message ?? string.Empty;
                var combined = string.IsNullOrWhiteSpace(inner) ? ex.Message : ($"{ex.Message} | Inner: {inner}");
                return ApiResponse<int>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + combined, ex.Message ?? string.Empty, 500);
            }
        }
    }
}
