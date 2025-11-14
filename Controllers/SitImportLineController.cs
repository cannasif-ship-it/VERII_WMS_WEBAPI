using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SitImportLineController : ControllerBase
    {
        private readonly ISitImportLineService _service;
        private readonly ILocalizationService _localizationService;

        public SitImportLineController(ISitImportLineService service, ILocalizationService localizationService)
        {
            _service = service;
            _localizationService = localizationService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<SitImportLineDto>>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<SitImportLineDto>>> GetById(long id)
        {
            var result = await _service.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("line/{lineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SitImportLineDto>>>> GetByLineId(long lineId)
        {
            var result = await _service.GetByLineIdAsync(lineId);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("route/{routeId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SitImportLineDto>>>> GetByRouteId(long routeId)
        {
            var result = await _service.GetByRouteIdAsync(routeId);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("stock/{stockCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SitImportLineDto>>>> GetByStockCode(string stockCode)
        {
            var result = await _service.GetByStockCodeAsync(stockCode);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("erpOrder/{erpOrderNo}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SitImportLineDto>>>> GetByErpOrderNo(string erpOrderNo)
        {
            var result = await _service.GetByErpOrderNoAsync(erpOrderNo);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<SitImportLineDto>>>> GetActive()
        {
            var result = await _service.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<SitImportLineDto>>> Create([FromBody] CreateSitImportLineDto createDto)
        {
            var result = await _service.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<SitImportLineDto>>> Update(long id, [FromBody] UpdateSitImportLineDto updateDto)
        {
            var result = await _service.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> SoftDelete(long id)
        {
            var result = await _service.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }
    }
}