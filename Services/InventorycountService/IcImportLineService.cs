using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class IcImportLineService : IIcImportLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public IcImportLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<IcImportLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.IcImportLines.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<IcImportLineDto>>(entities);
                return ApiResponse<IEnumerable<IcImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<IcImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IcImportLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.IcImportLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<IcImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                var dto = _mapper.Map<IcImportLineDto>(entity);
                return ApiResponse<IcImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IcImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<IcImportLineDto>>> GetByHeaderIdAsync(long headerId)
        {
            try
            {
                var entities = await _unitOfWork.IcImportLines.FindAsync(x => x.HeaderId == headerId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<IcImportLineDto>>(entities);
                return ApiResponse<IEnumerable<IcImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<IcImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<IcImportLineDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.IcImportLines.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<IcImportLineDto>>(entities);
                return ApiResponse<IEnumerable<IcImportLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<IcImportLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IcImportLineDto>> CreateAsync(CreateIcImportLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<IcImportLine>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _unitOfWork.IcImportLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<IcImportLineDto>(entity);
                return ApiResponse<IcImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IcImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IcImportLineDto>> UpdateAsync(long id, UpdateIcImportLineDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.IcImportLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<IcImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;
                _unitOfWork.IcImportLines.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<IcImportLineDto>(entity);
                return ApiResponse<IcImportLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IcImportLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.IcImportLines.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                await _unitOfWork.IcImportLines.SoftDelete(id);
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