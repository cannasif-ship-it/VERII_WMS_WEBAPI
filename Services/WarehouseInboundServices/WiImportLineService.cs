using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class WiImportLineService : IWiImportLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public WiImportLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.WiImportLines.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<WiImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WiImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiImportLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.WiImportLines.GetByIdAsync(id);
                if (entity == null) return ApiResponse<WiImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var dto = _mapper.Map<WiImportLineDto>(entity);
                return ApiResponse<WiImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.WiImportLines.FindAsync(x => x.LineId == lineId);
                var dtos = _mapper.Map<IEnumerable<WiImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WiImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }


        public async Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.WiImportLines.FindAsync(x => x.StockCode == stockCode);
                var dtos = _mapper.Map<IEnumerable<WiImportLineDto>>(entities);
                return ApiResponse<IEnumerable<WiImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<WiImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }



        public async Task<ApiResponse<WiImportLineDto>> CreateAsync(CreateWiImportLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<WiImportLine>(createDto);
                var created = await _unitOfWork.WiImportLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WiImportLineDto>(created);
                return ApiResponse<WiImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Created"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<WiImportLineDto>> UpdateAsync(long id, UpdateWiImportLineDto updateDto)
        {
            try
            {
                var existing = await _unitOfWork.WiImportLines.GetByIdAsync(id);
                if (existing == null) return ApiResponse<WiImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("NotFound"), _localizationService.GetLocalizedString("NotFound"), 404);
                var entity = _mapper.Map(updateDto, existing);
                _unitOfWork.WiImportLines.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<WiImportLineDto>(entity);
                return ApiResponse<WiImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Updated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<WiImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                await _unitOfWork.WiImportLines.SoftDelete(id);
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