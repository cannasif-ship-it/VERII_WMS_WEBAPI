using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class TrHeaderService : ITrHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public TrHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<PagedResponse<TrHeaderDto>>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy = null,
            string? sortDirection = "asc")
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1) pageSize = 10;

                var query = _unitOfWork.TrHeaders.AsQueryable()
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

                var dtos = _mapper.Map<List<TrHeaderDto>>(items);

                var result = new PagedResponse<TrHeaderDto>(dtos, totalCount, pageNumber, pageSize);

                return ApiResponse<PagedResponse<TrHeaderDto>>.SuccessResult(
                    result,
                    _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResponse<TrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message,
                    ex.Message,
                    500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.TrHeaders
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                var dto = _mapper.Map<TrHeaderDto>(entity);
                return ApiResponse<TrHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByDocumentNoAsync(string documentNo)
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => x.DocumentNo == documentNo && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }



        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByWarehouseAsync(string warehouse)
        {
            try
            {
                // Filter by SourceWarehouse or TargetWarehouse since TrHeader has these properties
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => (x.SourceWarehouse == warehouse || x.TargetWarehouse == warehouse) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => x.DocumentDate >= startDate && x.DocumentDate <= endDate && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrHeaderDto>> CreateAsync(CreateTrHeaderDto createDto)
        {
            try
            {
                var entity = _mapper.Map<TrHeader>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;

                await _unitOfWork.TrHeaders.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrHeaderDto>(entity);
                return ApiResponse<TrHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrHeaderDto>> UpdateAsync(long id, UpdateTrHeaderDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.TrHeaders.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.TrHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrHeaderDto>(entity);
                return ApiResponse<TrHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.TrHeaders.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                await _unitOfWork.TrHeaders.SoftDelete(id);
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
                var entity = await _unitOfWork.TrHeaders.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                entity.IsCompleted = true;
                entity.CompletionDate = DateTime.UtcNow;
                entity.IsPendingApproval = false;

                _unitOfWork.TrHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("RecordCompletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByBranchCodeAsync(string branchCode)
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => x.BranchCode == branchCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByCustomerCodeAsync(string customerCode)
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => x.CustomerCode == customerCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByDocumentTypeAsync(string documentType)
        {
            try
            {
                var entities = await _unitOfWork.TrHeaders
                    .FindAsync(x => x.DocumentType == documentType && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrHeaderDto>>(entities);
                return ApiResponse<IEnumerable<TrHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        // Korelasyon anahtarlarıyla toplu TR oluşturma: temp ID -> gerçek ID eşleme
        public async Task<ApiResponse<int>> BulkCreateInterWarehouseTransferAsync(BulkCreateTrRequestDto request)
        {
            try
            {
                using (var scope = new System.Transactions.TransactionScope(System.Transactions.TransactionScopeAsyncFlowOption.Enabled))
                {
                    // 1) Header oluştur ve kaydet
                    var trHeader = _mapper.Map<TrHeader>(request.Header);
                    await _unitOfWork.TrHeaders.AddAsync(trHeader);
                    await _unitOfWork.SaveChangesAsync();

                    // 2) Lines ekle ve ClientKey/ClientGuid -> LineId eşlemesi oluştur
                    var lineKeyToId = new Dictionary<string, long>(StringComparer.OrdinalIgnoreCase);
                    var lineGuidToId = new Dictionary<Guid, long>();
                    if (request.Lines != null && request.Lines.Count > 0)
                    {
                        var lines = new List<TrLine>(request.Lines.Count);
                        foreach (var lineDto in request.Lines)
                        {
                            var line = new TrLine
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
                        await _unitOfWork.TrLines.AddRangeAsync(lines);
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
                        var routes = new List<TrRoute>(request.Routes.Count);
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

                            var route = new TrRoute
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
                        await _unitOfWork.TrRoutes.AddRangeAsync(routes);
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
                        var importLines = new List<TrImportLine>(request.ImportLines.Count);
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

                            var importLine = new TrImportLine
                            {
                                HeaderId = trHeader.Id,
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
                                ErpOrderLineNumber = importDto.ErpOrderLineNumber
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
                return ApiResponse<int>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + combined, ex.Message, 500, inner);
            }
        }
    }
}
