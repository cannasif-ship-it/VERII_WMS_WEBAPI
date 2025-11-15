using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface IICHeaderService
    {
        Task<ApiResponse<IEnumerable<ICHeaderDto>>> GetAllAsync();
        Task<ApiResponse<ICHeaderDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<ICHeaderDto>>> GetActiveAsync();
        Task<ApiResponse<ICHeaderDto>> CreateAsync(CreateICHeaderDto createDto);
        Task<ApiResponse<ICHeaderDto>> UpdateAsync(long id, UpdateICHeaderDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}