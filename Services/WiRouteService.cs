using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WiRouteService : IWiRouteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WiRouteService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiRouteDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WiRoutes.GetByIdAsync(id);
                if (entity == null) return ApiResponse<WiRouteDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var dto = _mapper.Map<WiRouteDto>(entity);
                return ApiResponse<WiRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => x.LineId == lineId);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => x.StockCode == stockCode);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetBySerialNoAsync(string serialNo)
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => x.SerialNo == serialNo || x.SerialNo2 == serialNo);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetBySourceWarehouseAsync(int sourceWarehouse)
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => x.SourceWarehouse == sourceWarehouse);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetByTargetWarehouseAsync(int targetWarehouse)
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => x.TargetWarehouse == targetWarehouse);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiRouteDto>>> GetByQuantityRangeAsync(decimal minQuantity, decimal maxQuantity)
        {
            try
            {
                var entities = await _unitOfWork.WiRoutes.FindAsync(x => x.Quantity >= minQuantity && x.Quantity <= maxQuantity);
                var dtos = _mapper.Map<IEnumerable<WiRouteDto>>(entities);
                return ApiResponse<IEnumerable<WiRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiRouteDto>> CreateAsync(CreateWiRouteDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WiRoute>(createDto);
                var created = await _unitOfWork.WiRoutes.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WiRouteDto>(created);
                return ApiResponse<WiRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Created"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiRouteDto>> UpdateAsync(long id, UpdateWiRouteDto updateDto)
        {
            try
            {
                var existing = await _unitOfWork.WiRoutes.GetByIdAsync(id);
                if (existing == null) return ApiResponse<WiRouteDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var entity = _mapper.Map(updateDto, existing);
                _unitOfWork.WiRoutes.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WiRouteDto>(entity);
                return ApiResponse<WiRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Updated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                await _unitOfWork.WiRoutes.SoftDelete(id);
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