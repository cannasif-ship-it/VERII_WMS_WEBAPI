using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrTerminalLineService
    {
        Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetAllAsync();
        Task<ApiResponse<TrTerminalLineDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByHeaderIdAsync(long headerId);
        Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByUserIdAsync(long userId);
        Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetActiveAsync();
        Task<ApiResponse<TrTerminalLineDto>> CreateAsync(CreateTrTerminalLineDto createDto);
        Task<ApiResponse<TrTerminalLineDto>> UpdateAsync(long id, UpdateTrTerminalLineDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}