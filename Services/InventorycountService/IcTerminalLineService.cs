using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class IcTerminalLineService : IIcTerminalLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public IcTerminalLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<IcTerminalLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.IcTerminalLines.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<IcTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<IcTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<IcTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IcTerminalLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.IcTerminalLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<IcTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                var dto = _mapper.Map<IcTerminalLineDto>(entity);
                return ApiResponse<IcTerminalLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IcTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<IcTerminalLineDto>>> GetByHeaderIdAsync(long headerId)
        {
            try
            {
                var entities = await _unitOfWork.IcTerminalLines.FindAsync(x => x.HeaderId == headerId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<IcTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<IcTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<IcTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<IcTerminalLineDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.IcTerminalLines.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<IcTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<IcTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<IcTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IcTerminalLineDto>> CreateAsync(CreateIcTerminalLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<IcTerminalLine>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _unitOfWork.IcTerminalLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<IcTerminalLineDto>(entity);
                return ApiResponse<IcTerminalLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IcTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IcTerminalLineDto>> UpdateAsync(long id, UpdateIcTerminalLineDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.IcTerminalLines.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<IcTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;
                _unitOfWork.IcTerminalLines.Update(entity);
                await _unitOfWork.SaveChangesAsync();
                var dto = _mapper.Map<IcTerminalLineDto>(entity);
                return ApiResponse<IcTerminalLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IcTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.IcTerminalLines.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }
                await _unitOfWork.IcTerminalLines.SoftDelete(id);
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