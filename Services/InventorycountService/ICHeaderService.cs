using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class ICHeaderService : IICHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public ICHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<ICHeaderDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.ICHeaders.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<ICHeaderDto>>(entities);
                return ApiResponse<IEnumerable<ICHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ICHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<ICHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.ICHeaders.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<ICHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                var dto = _mapper.Map<ICHeaderDto>(entity);
                return ApiResponse<ICHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ICHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<ICHeaderDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.ICHeaders.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<ICHeaderDto>>(entities);
                return ApiResponse<IEnumerable<ICHeaderDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<ICHeaderDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<ICHeaderDto>> CreateAsync(CreateICHeaderDto createDto)
        {
            try
            {
                var entity = _mapper.Map<IcHeader>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _unitOfWork.ICHeaders.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<ICHeaderDto>(entity);
                return ApiResponse<ICHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ICHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<ICHeaderDto>> UpdateAsync(long id, UpdateICHeaderDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.ICHeaders.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<ICHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;
                _unitOfWork.ICHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<ICHeaderDto>(entity);
                return ApiResponse<ICHeaderDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<ICHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.ICHeaders.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                await _unitOfWork.ICHeaders.SoftDelete(id);
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