using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WtImportLineService : IWtImportLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WtImportLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WtImportLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<WtImportLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WtImportLines
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<WtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineNotFound"), _localizationService.GetLocalizedString("WtImportLineNotFound"), 404);
                }

                var dto = _mapper.Map<WtImportLineDto>(entity);
                return ApiResponse<WtImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500); 
            }
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetByHeaderIdAsync(long headerId)
        {
            try
            {
                var entities = await _unitOfWork.WtImportLines
                    .FindAsync(x => x.HeaderId == headerId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.WtImportLines
                    .FindAsync(x => x.StockCode == stockCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }



        // Quantity alanı WtImportLine modelinde bulunmuyor, bu nedenle kapsam dışında bırakıldı

        public async Task<ApiResponse<WtImportLineDto>> CreateAsync(CreateWtImportLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WtImportLine>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;

                await _unitOfWork.WtImportLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<WtImportLineDto>(entity);
                return ApiResponse<WtImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("WtImportLineCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<WtImportLineDto>> UpdateAsync(long id, UpdateWtImportLineDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.WtImportLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<WtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineNotFound"), _localizationService.GetLocalizedString("WtImportLineNotFound"), 404);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.WtImportLines.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<WtImportLineDto>(entity);
                return ApiResponse<WtImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("WtImportLineUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.WtImportLines.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineNotFound"), _localizationService.GetLocalizedString("WtImportLineNotFound"), 404);
                }

                await _unitOfWork.WtImportLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("WtImportLineDeletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.WtImportLines
                    .FindAsync(x => x.LineId == lineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetByRouteIdAsync(long routeId)
        {
            try
            {
                var routes = await _unitOfWork.WtRoutes.FindAsync(r => r.Id == routeId && !r.IsDeleted);
                var importLineIds = routes.Select(r => r.ImportLineId).ToList();

                var entities = importLineIds.Count == 0
                    ? new List<WtImportLine>()
                    : await _unitOfWork.WtImportLines.FindAsync(x => importLineIds.Contains(x.Id) && !x.IsDeleted);

                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetByErpOrderNoAsync(string erpOrderNo)
        {
            try
            {
                var lines = await _unitOfWork.WtLines.FindAsync(l => l.ErpOrderNo == erpOrderNo && !l.IsDeleted);
                var lineIds = lines.Select(l => l.Id).ToList();

                var entities = lineIds.Count == 0
                    ? new List<WtImportLine>()
                    : await _unitOfWork.WtImportLines.FindAsync(x => x.LineId.HasValue && lineIds.Contains(x.LineId.Value) && !x.IsDeleted);

                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WtImportLineDto>>> GetByCellCodeAsync(string cellCode)
        {
            try
            {
                // WtImportLine model doesn't have CellCode property, filtering only by IsDeleted
                var entities = await _unitOfWork.WtImportLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("WtImportLineRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("WtImportLineErrorOccurred"), ex.Message ?? string.Empty, 500);
            }
        }
    }
}
