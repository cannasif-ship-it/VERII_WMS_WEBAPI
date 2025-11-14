using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WoRouteService : IWoRouteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WoRouteService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WoRouteDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WoRoutes.GetByIdAsync(id);
                if (entity == null) return ApiResponse<WoRouteDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var dto = _mapper.Map<WoRouteDto>(entity);
                return ApiResponse<WoRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WoRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => x.LineId == lineId);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => x.StockCode == stockCode);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetBySerialNoAsync(string serialNo)
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => x.SerialNo == serialNo || x.SerialNo2 == serialNo);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetBySourceWarehouseAsync(int sourceWarehouse)
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => x.SourceWarehouse == sourceWarehouse);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetByTargetWarehouseAsync(int targetWarehouse)
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => x.TargetWarehouse == targetWarehouse);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WoRouteDto>>> GetByQuantityRangeAsync(decimal minQuantity, decimal maxQuantity)
        {
            try
            {
                var entities = await _unitOfWork.WoRoutes.FindAsync(x => x.Quantity >= minQuantity && x.Quantity <= maxQuantity);
                var dtos = _mapper.Map<IEnumerable<WoRouteDto>>(entities);
                return ApiResponse<IEnumerable<WoRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WoRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WoRouteDto>> CreateAsync(CreateWoRouteDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WoRoute>(createDto);
                var created = await _unitOfWork.WoRoutes.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WoRouteDto>(created);
                return ApiResponse<WoRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Created"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WoRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WoRouteDto>> UpdateAsync(long id, UpdateWoRouteDto updateDto)
        {
            try
            {
                var existing = await _unitOfWork.WoRoutes.GetByIdAsync(id);
                if (existing == null) return ApiResponse<WoRouteDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var entity = _mapper.Map(updateDto, existing);
                _unitOfWork.WoRoutes.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WoRouteDto>(entity);
                return ApiResponse<WoRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Updated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WoRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                await _unitOfWork.WoRoutes.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("Deleted"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }
    }
}