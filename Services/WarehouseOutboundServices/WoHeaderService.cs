using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WoHeaderService : IWoHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WoHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<PagedResponse<WoHeaderDto>>> GetPagedAsync(int pageNumber, int pageSize, string? sortBy = null, string? sortDirection = "asc")
        {
            try
            {
                var query = _unitOfWork.WoHeaders.AsQueryable();

                if (!string.IsNullOrWhiteSpace(sortBy))
                {
                    var ascending = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase);
                    query = sortBy switch
                    {
                        nameof(WoHeader.ERPReferenceNumber) => ascending ? query.OrderBy(x => x.ERPReferenceNumber) : query.OrderByDescending(x => x.ERPReferenceNumber),
                        nameof(WoHeader.CreatedDate) => ascending ? query.OrderBy(x => x.CreatedDate) : query.OrderByDescending(x => x.CreatedDate),
                        _ => query
                    };
                }

                var totalCount = await query.CountAsync();
                var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
                var dtos = _mapper.Map<List<WoHeaderDto>>(items);
                var result = new PagedResponse<WoHeaderDto>(dtos, totalCount, pageNumber, pageSize);
                return ApiResponse<PagedResponse<WoHeaderDto>>.SuccessResult(result, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PagedResponse<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WoHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WoHeaders.GetByIdAsync(id);
                if (entity == null) return ApiResponse<WoHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var dto = _mapper.Map<WoHeaderDto>(entity);
                return ApiResponse<WoHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WoHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByBranchCodeAsync(string branchCode)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.BranchCode == branchCode);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.PlannedDate >= startDate && x.PlannedDate <= endDate);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByCustomerCodeAsync(string customerCode)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.CustomerCode == customerCode);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByDocumentTypeAsync(string documentType)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.DocumentType == documentType);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByDocumentNoAsync(string documentNo)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.ERPReferenceNumber == documentNo);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByOutboundTypeAsync(string outboundType)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.OutboundType == outboundType);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoHeaderDto>>> GetByAccountCodeAsync(string accountCode)
        {
            try
            {
                var entities = await _unitOfWork.WoHeaders.FindAsync(x => x.AccountCode == accountCode);
                var dtos = _mapper.Map<IEnumerable<WoHeaderDto>>(entities);
                return ApiResponse<IEnumerable<WoHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WoHeaderDto>> CreateAsync(CreateWoHeaderDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WoHeader>(createDto);
                var created = await _unitOfWork.WoHeaders.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WoHeaderDto>(created);
                return ApiResponse<WoHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Created"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WoHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WoHeaderDto>> UpdateAsync(long id, UpdateWoHeaderDto updateDto)
        {
            try
            {
                var existing = await _unitOfWork.WoHeaders.GetByIdAsync(id);
                if (existing == null) return ApiResponse<WoHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var entity = _mapper.Map(updateDto, existing);
                _unitOfWork.WoHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WoHeaderDto>(entity);
                return ApiResponse<WoHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Updated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WoHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                await _unitOfWork.WoHeaders.SoftDelete(id);
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
                var existing = await _unitOfWork.WoHeaders.GetByIdAsync(id);
                if (existing == null) return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                existing.IsCompleted = true;
                existing.CompletionDate = DateTime.UtcNow;
                _unitOfWork.WoHeaders.Update(existing);
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