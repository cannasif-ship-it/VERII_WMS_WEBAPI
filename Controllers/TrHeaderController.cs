using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrHeaderController : ControllerBase
    {
        private readonly ITrHeaderService _trHeaderService;

        public TrHeaderController(ITrHeaderService trHeaderService)
        {
            _trHeaderService = trHeaderService;
        }

        [HttpPost("inter-warehouse/bulk-create")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<int>>> BulkCreateInterWarehouse([FromBody] BulkCreateTrRequestDto request)
        {
            var result = await _trHeaderService.BulkCreateInterWarehouseTransferAsync(request);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("by-document/{documentNo}")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetByDocumentNo(string documentNo)
        {
            var result = await _trHeaderService.GetByDocumentNoAsync(documentNo);
            return StatusCode(result.StatusCode, result);
        }
    }
}