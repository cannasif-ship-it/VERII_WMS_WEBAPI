using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class SrtImportLineService : ISrtImportLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public SrtImportLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<SrtImportLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.SrtImportLines.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<SrtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<SrtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SrtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<SrtImportLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.SrtImportLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<SrtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                var dto = _mapper.Map<SrtImportLineDto>(entity);
                return ApiResponse<SrtImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<SrtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<SrtImportLineDto>>> GetByHeaderIdAsync(long headerId)
        {
            try
            {
                var entities = await _unitOfWork.SrtImportLines.FindAsync(x => x.HeaderId == headerId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<SrtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<SrtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SrtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<SrtImportLineDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.SrtImportLines.FindAsync(x => x.LineId == lineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<SrtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<SrtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SrtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<SrtImportLineDto>>> GetByRouteIdAsync(long routeId)
        {
            try
            {
                var entities = await _unitOfWork.SrtImportLines.FindAsync(x => x.RouteId == routeId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<SrtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<SrtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SrtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<SrtImportLineDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.SrtImportLines.FindAsync(x => x.StockCode == stockCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<SrtImportLineDto>>(entities);
                return ApiResponse<IEnumerable<SrtImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<SrtImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }


        public async Task<ApiResponse<SrtImportLineDto>> CreateAsync(CreateSrtImportLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<SrtImportLine>(createDto);
                await _unitOfWork.SrtImportLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<SrtImportLineDto>(entity);
                return ApiResponse<SrtImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<SrtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<SrtImportLineDto>> UpdateAsync(long id, UpdateSrtImportLineDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.SrtImportLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<SrtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                _mapper.Map(updateDto, entity);
                _unitOfWork.SrtImportLines.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<SrtImportLineDto>(entity);
                return ApiResponse<SrtImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<SrtImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                await _unitOfWork.SrtImportLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("RecordDeletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }
    }
}