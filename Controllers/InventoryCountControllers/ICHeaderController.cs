using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ICHeaderController : ControllerBase
    {
        private readonly IICHeaderService _service;
        private readonly ILocalizationService _localizationService;

        public ICHeaderController(IICHeaderService service, ILocalizationService localizationService)
        {
            _service = service;
            _localizationService = localizationService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<ICHeaderDto>>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ICHeaderDto>>> GetById(long id)
        {
            var result = await _service.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<ICHeaderDto>>>> GetActive()
        {
            var result = await _service.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<ICHeaderDto>>> Create([FromBody] CreateICHeaderDto createDto)
        {
            var result = await _service.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<ICHeaderDto>>> Update(long id, [FromBody] UpdateICHeaderDto updateDto)
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