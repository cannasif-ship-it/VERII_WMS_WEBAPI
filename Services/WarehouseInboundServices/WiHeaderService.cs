using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WiHeaderService : IWiHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WiHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<PagedResponse<WiHeaderDto>>> GetPagedAsync(int pageNumber, int pageSize, string? sortBy = null, string? sortDirection = "asc")
        {
            try
            {
                var query = _unitOfWork.WiHeaders.AsQueryable();

                if (!string.IsNullOrWhiteSpace(sortBy))
                {
                    var ascending = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase);
                    query = sortBy switch
                    {
                        nameof(WiHeader.ERPReferenceNumber) => ascending ? query.OrderBy(x => x.ERPReferenceNumber) : query.OrderByDescending(x => x.ERPReferenceNumber),
                        nameof(WiHeader.CreatedDate) => ascending ? query.OrderBy(x => x.CreatedDate) : query.OrderByDescending(x => x.CreatedDate),
                        _ => query
                    };
                }

                var totalCount = await query.CountAsync();
                var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
                var dtos = _mapper.Map<List<WiHeaderDto>>(items);
                var result = new PagedResponse<WiHeaderDto>(dtos, totalCount, pageNumber, pageSize);
                return ApiResponse<PagedResponse<WiHeaderDto>>.SuccessResult(result, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResponse<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WiHeaders.GetByIdAsync(id);
                if (entity == null) return ApiResponse<WiHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var dto = _mapper.Map<WiHeaderDto>(entity);
                return ApiResponse<WiHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByBranchCodeAsync(string branchCode)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.BranchCode == branchCode);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.PlannedDate >= startDate && x.PlannedDate <= endDate);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }


        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByCustomerCodeAsync(string customerCode)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.CustomerCode == customerCode);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByDocumentTypeAsync(string documentType)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.DocumentType == documentType);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByDocumentNoAsync(string documentNo)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.ERPReferenceNumber == documentNo);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByInboundTypeAsync(string inboundType)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.InboundType == inboundType);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiHeaderDto>>> GetByAccountCodeAsync(string accountCode)
        {
            try
            {
                var entities = await _unitOfWork.WiHeaders.FindAsync(x => x.AccountCode == accountCode);
                var dtos = _mapper.Map<IEnumerable<WiHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WiHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiHeaderDto>> CreateAsync(CreateWiHeaderDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WiHeader>(createDto);
                var created = await _unitOfWork.WiHeaders.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WiHeaderDto>(created);
                return ApiResponse<WiHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Created"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiHeaderDto>> UpdateAsync(long id, UpdateWiHeaderDto updateDto)
        {
            try
            {
                var existing = await _unitOfWork.WiHeaders.GetByIdAsync(id);
                if (existing == null) return ApiResponse<WiHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var entity = _mapper.Map(updateDto, existing);
                _unitOfWork.WiHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WiHeaderDto>(entity);
                return ApiResponse<WiHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Updated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                await _unitOfWork.WiHeaders.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("Deleted"));
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
                var existing = await _unitOfWork.WiHeaders.GetByIdAsync(id);
                if (existing == null) return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                existing.IsCompleted = true;
                existing.CompletionDate = DateTime.UtcNow;
                _unitOfWork.WiHeaders.Update(existing);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }
    }
}