using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class GrHeaderService : IGrHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public GrHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<PagedResponse<GrHeaderDto>>> GetPagedAsync(
            int pageNumber,
            int pageSize,
            string? sortBy = null,
            string? sortDirection = "asc")
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1) pageSize = 10;

                var query = _unitOfWork.GrHeaders.AsQueryable();

                // Sorting (default by Id)
                bool desc = string.Equals(sortDirection, "desc", StringComparison.OrdinalIgnoreCase);
                switch (sortBy?.Trim())
                {
                    case "DocumentDate":
                        query = desc ? query.OrderByDescending(x => x.DocumentDate) : query.OrderBy(x => x.DocumentDate);
                        break;
                    case "ERPDocumentNo":
                        query = desc ? query.OrderByDescending(x => x.ERPDocumentNo) : query.OrderBy(x => x.ERPDocumentNo);
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

                var dtos = _mapper.Map<List<GrHeaderDto>>(items);

                var result = new PagedResponse<GrHeaderDto>(dtos, totalCount, pageNumber, pageSize);

                return ApiResponse<PagedResponse<GrHeaderDto>>.SuccessResult(
                    result,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResponse<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500);
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetAllAsync()
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders.GetAllAsync();
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos, 
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrHeaderDto?>> GetByIdAsync(int id)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (grHeader == null)
                {
                    return ApiResponse<GrHeaderDto?>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }
                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto?>.SuccessResult(grHeaderDto,_localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto?>.ErrorResult(_localizationService.GetLocalizedString("GrHeaderRetrievalError"), ex.Message, 500, "Error retrieving GrHeader data");
            }
        }

        public async Task<ApiResponse<GrHeaderDto?>> GetByERPDocumentNoAsync(string erpDocumentNo)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetFirstOrDefaultAsync(x => x.ERPDocumentNo == erpDocumentNo);
                
                if (grHeader == null)
                {
                    return ApiResponse<GrHeaderDto?>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }

                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto?>.SuccessResult(
                    grHeaderDto,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto?>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrHeaderDto>> CreateAsync(CreateGrHeaderDto createDto)
        {
            try
            {
                var grHeader = _mapper.Map<GrHeader>(createDto);

                await _unitOfWork.GrHeaders.AddAsync(grHeader);
                await _unitOfWork.SaveChangesAsync();

                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto>.SuccessResult(
                    grHeaderDto,
                    _localizationService.GetLocalizedString("GrHeaderCreatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderCreationError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrHeaderDto>> UpdateAsync(int id, UpdateGrHeaderDto updateDto)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (grHeader == null)
                {
                    return ApiResponse<GrHeaderDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }

                // Update only non-null properties
                if (!string.IsNullOrEmpty(updateDto.BranchCode))
                    grHeader.BranchCode = updateDto.BranchCode;
                
                if (updateDto.ProjectCode != null)
                    grHeader.ProjectCode = updateDto.ProjectCode;
                
                if (!string.IsNullOrEmpty(updateDto.CustomerCode))
                    grHeader.CustomerCode = updateDto.CustomerCode;
                
                if (!string.IsNullOrEmpty(updateDto.ERPDocumentNo))
                    grHeader.ERPDocumentNo = updateDto.ERPDocumentNo;
                
                if (!string.IsNullOrEmpty(updateDto.DocumentType))
                    grHeader.DocumentType = updateDto.DocumentType;
                
                if (updateDto.DocumentDate.HasValue)
                    grHeader.DocumentDate = updateDto.DocumentDate.Value;
                
                if (!string.IsNullOrEmpty(updateDto.YearCode))
                    grHeader.YearCode = updateDto.YearCode;
                
                if (updateDto.ReturnCode.HasValue)
                    grHeader.ReturnCode = updateDto.ReturnCode.Value;
                
                if (updateDto.OCRSource.HasValue)
                    grHeader.OCRSource = updateDto.OCRSource.Value;
                
                if (updateDto.IsPlanned.HasValue)
                    grHeader.IsPlanned = updateDto.IsPlanned.Value;

                if (updateDto.Description1 != null)
                    grHeader.Description1 = updateDto.Description1;
                
                if (updateDto.Description2 != null)
                    grHeader.Description2 = updateDto.Description2;
                
                if (updateDto.Description3 != null)
                    grHeader.Description3 = updateDto.Description3;
                
                if (updateDto.Description4 != null)
                    grHeader.Description4 = updateDto.Description4;
                
                if (updateDto.Description5 != null)
                    grHeader.Description5 = updateDto.Description5;

                _unitOfWork.GrHeaders.Update(grHeader);
                await _unitOfWork.SaveChangesAsync();

                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto>.SuccessResult(
                    grHeaderDto,
                    _localizationService.GetLocalizedString("GrHeaderUpdatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderUpdateError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(int id)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (grHeader == null)
                {
                    return ApiResponse<bool>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }

                await _unitOfWork.GrHeaders.SoftDelete(grHeader.Id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(
                    true,
                    _localizationService.GetLocalizedString("GrHeaderDeletedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderSoftDeletionError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetActiveAsync()
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders.GetAllAsync();
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByBranchCodeAsync(string branchCode)
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders
                    .FindAsync(x => x.BranchCode == branchCode);
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByCustomerCodeAsync(string customerCode)
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders
                    .FindAsync(x => x.CustomerCode == customerCode);
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders
                    .FindAsync(x => x.DocumentDate >= startDate && x.DocumentDate <= endDate);
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        // Korelasyon anahtarlarıyla toplu oluşturma: temp ID -> gerçek ID eşleme
        public async Task<ApiResponse<int>> BulkCreateCorrelatedAsync(BulkCreateGrRequestDto request)
        {
            try
            {
                using (var scope = new System.Transactions.TransactionScope(System.Transactions.TransactionScopeAsyncFlowOption.Enabled))
                {
                    // 1) Header oluştur ve kaydet
                    var grHeader = _mapper.Map<GrHeader>(request.Header);
                    await _unitOfWork.GrHeaders.AddAsync(grHeader);
                    await _unitOfWork.SaveChangesAsync();

                    // 2) ImportDocument(ler) ekle (varsa) - AddRange ile optimize
                    if (request.Documents != null && request.Documents.Count > 0)
                    {
                        var docs = new List<GrImportDocument>(request.Documents.Count);
                        foreach (var docDto in request.Documents)
                        {
                            docs.Add(new GrImportDocument
                            {
                                HeaderId = grHeader.Id,
                                Base64 = docDto.Base64
                            });
                        }
                        await _unitOfWork.GrImportDocuments.AddRangeAsync(docs);
                        await _unitOfWork.SaveChangesAsync();
                    }

                    // 3) Lines ekle ve ClientKey/ClientGuid -> LineId eşlemesi oluştur
                    var lineKeyToId = new Dictionary<string, long>(StringComparer.OrdinalIgnoreCase);
                    var lineGuidToId = new Dictionary<Guid, long>();
                    if (request.Lines != null && request.Lines.Count > 0)
                    {
                        var lines = new List<GrLine>(request.Lines.Count);
                        foreach (var lineDto in request.Lines)
                        {
                            var line = new GrLine
                            {
                                HeaderId = grHeader.Id,
                                StockCode = lineDto.StockCode,
                                Quantity = lineDto.Quantity,
                                Unit = lineDto.Unit,
                                ErpOrderNo = lineDto.ErpOrderNo,
                                ErpOrderLineNo = lineDto.ErpOrderLineNo,
                                Description = lineDto.Description
                            };
                            lines.Add(line);
                        }
                        await _unitOfWork.GrLines.AddRangeAsync(lines);
                        await _unitOfWork.SaveChangesAsync();

                        // İD'leri doldurulduktan sonra eşle
                        for (int i = 0; i < request.Lines.Count; i++)
                        {
                            var key = request.Lines[i].ClientKey;
                            var guid = request.Lines[i].ClientGuid;
                            var id = lines[i].Id;
                            if (!string.IsNullOrWhiteSpace(key))
                            {
                                lineKeyToId[key] = id;
                            }
                            if (guid.HasValue)
                            {
                                lineGuidToId[guid.Value] = id;
                            }
                        }
                    }

                    // 4) ImportLines ekle ve LineClientKey/LineGroupGuid üzerinden LineId set et
                    var importLineKeyToId = new Dictionary<string, long>(StringComparer.OrdinalIgnoreCase);
                    var importLineGuidToId = new Dictionary<Guid, long>();
                    var importLineIdToStockCode = new Dictionary<long, string>();
                    if (request.ImportLines != null && request.ImportLines.Count > 0)
                    {
                        var importLines = new List<GrImportLine>(request.ImportLines.Count);
                        foreach (var importDto in request.ImportLines)
                        {
                            long lineId = 0;
                            // Öncelik: GUID gruplama varsa onu kullan
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
                                if (!lineKeyToId.TryGetValue(importDto.LineClientKey, out lineId))
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
                                // Line referansı sağlanmadıysa, sadece HeaderId ile ilerleyelim (LineId = null)
                                lineId = 0;
                            }

                            var importLine = new GrImportLine
                            {
                                HeaderId = grHeader.Id,
                                LineId = lineId == 0 ? null : lineId,
                                StockCode = importDto.StockCode,
                                Description1 = importDto.Description1,
                                Description2 = importDto.Description2
                            };
                            importLines.Add(importLine);
                        }
                        await _unitOfWork.GrImportLines.AddRangeAsync(importLines);
                        await _unitOfWork.SaveChangesAsync();

                        // import line client key / group guid -> id eşlemesi (opsiyonel) ve stok kodu eşlemesi
                        for (int i = 0; i < request.ImportLines.Count; i++)
                        {
                            var key = request.ImportLines[i].ClientKey;
                            var groupGuid = request.ImportLines[i].LineGroupGuid; // import line tarafında çocuklar için kullanacağız
                            importLineIdToStockCode[importLines[i].Id] = importLines[i].StockCode;
                            if (!string.IsNullOrWhiteSpace(key))
                            {
                                importLineKeyToId[key] = importLines[i].Id;
                            }
                            if (groupGuid.HasValue)
                            {
                                importLineGuidToId[groupGuid.Value] = importLines[i].Id;
                            }
                        }
                    }

                    // 5) SerialLines ekle ve ImportLineClientKey/ImportLineGroupGuid'den ImportLineId set et
                    if (request.SerialLines != null && request.SerialLines.Count > 0)
                    {
                        var serialLines = new List<GrLineSerial>(request.SerialLines.Count);
                        foreach (var sDto in request.SerialLines)
                        {
                            long importLineId = 0;
                            if (sDto.ImportLineGroupGuid.HasValue)
                            {
                                var ig = sDto.ImportLineGroupGuid.Value;
                                if (!importLineGuidToId.TryGetValue(ig, out importLineId))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": ImportLineGroupGuid bulunamadı: {ig}",
                                        "ImportLineGroupGuidNotFound",
                                        400
                                    );
                                }
                            }
                            else if (!string.IsNullOrWhiteSpace(sDto.ImportLineClientKey))
                            {
                                if (!importLineKeyToId.TryGetValue(sDto.ImportLineClientKey, out importLineId))
                                {
                                    return ApiResponse<int>.ErrorResult(
                                        _localizationService.GetLocalizedString("InvalidCorrelationKey") + $": ImportLineClientKey bulunamadı: {sDto.ImportLineClientKey}",
                                        "ImportLineClientKeyNotFound",
                                        400
                                    );
                                }
                            }
                            else
                            {
                                return ApiResponse<int>.ErrorResult(
                                    _localizationService.GetLocalizedString("InvalidCorrelationKey") + ": SerialLine için ImportLine referansı (ImportLineGroupGuid veya ImportLineClientKey) zorunlu",
                                    "ImportLineReferenceMissing",
                                    400
                                );
                            }

                            var serial = new GrLineSerial
                            {
                                ImportLineId = importLineId,
                                SerialNo = sDto.SerialNo,
                                SerialNo2 = sDto.SerialNo2,
                                SerialNo3 = sDto.SerialNo3,
                                SerialNo4 = sDto.SerialNo4,
                                SourceCellCode = sDto.SourceCellCode,
                                TargetCellCode = sDto.TargetCellCode,
                                CreatedDate = DateTime.UtcNow
                            };
                            serial.Quantity = sDto.Quantity;
                            serialLines.Add(serial);
                        }
                        await _unitOfWork.GrImportSerialLines.AddRangeAsync(serialLines);
                        await _unitOfWork.SaveChangesAsync();
                    }

                    scope.Complete();
                    return ApiResponse<int>.SuccessResult(1, _localizationService.GetLocalizedString("Success"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<int>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> CompleteAsync(int id)
        {
            try
            {
                var entity = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (entity == null)
                {
                    return ApiResponse<bool>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found");
                }

                entity.IsCompleted = true;
                entity.CompletionDate = DateTime.UtcNow;
                entity.IsPendingApproval = false;

                _unitOfWork.GrHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("GrHeaderCompletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderCompletionError"),
                    ex.Message,
                    500);
            }
        }
         
    }
}
