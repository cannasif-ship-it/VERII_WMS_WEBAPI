using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface IWiImportLineService
    {
        Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetAllAsync();
        Task<ApiResponse<WiImportLineDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetByLineIdAsync(long lineId);
        Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetByRouteIdAsync(long routeId);
        Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetByStockCodeAsync(string stockCode);
        Task<ApiResponse<IEnumerable<WiImportLineDto>>> GetActiveAsync();
        Task<ApiResponse<WiImportLineDto>> CreateAsync(CreateWiImportLineDto createDto);
        Task<ApiResponse<WiImportLineDto>> UpdateAsync(long id, UpdateWiImportLineDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}