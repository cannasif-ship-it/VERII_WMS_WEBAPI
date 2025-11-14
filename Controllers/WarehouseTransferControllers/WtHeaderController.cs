using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WtHeaderController : ControllerBase
    {
        private readonly IWtHeaderService _wtHeaderService;

        public WtHeaderController(IWtHeaderService wtHeaderService)
        {
            _wtHeaderService = wtHeaderService;
        }

        [HttpPost("inter-warehouse/bulk-create")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<int>>> BulkCreateInterWarehouse([FromBody] BulkCreateWtRequestDto request)
        {
            var result = await _wtHeaderService.BulkCreateInterWarehouseTransferAsync(request);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("by-document/{documentNo}")]
        [AllowAnonymous]
        public async Task<ActionResult<ApiResponse<IEnumerable<WtHeaderDto>>>> GetByDocumentNo(string documentNo)
        {
            var result = await _wtHeaderService.GetByDocumentNoAsync(documentNo);
            return StatusCode(result.StatusCode, result);
        }
    }
}