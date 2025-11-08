using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GrHeaderController : ControllerBase
    {
        private readonly IGrHeaderService _grHeaderService;
        private readonly ILocalizationService _localizationService;

        public GrHeaderController(IGrHeaderService grHeaderService, ILocalizationService localizationService)
        {
            _grHeaderService = grHeaderService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm GrHeader kayıtlarını getirir
        /// </summary>
        /// <returns>GrHeader listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrHeaderDto>>>> GetAll()
        {
            var result = await _grHeaderService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre GrHeader kaydını getirir
        /// </summary>
        /// <param name="id">GrHeader ID</param>
        /// <returns>GrHeader detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<GrHeaderDto?>>> GetById(int id)
        {
            var result = await _grHeaderService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ERP Belge Numarasına göre GrHeader kaydını getirir
        /// </summary>
        /// <param name="erpDocumentNo">ERP Belge Numarası</param>
        /// <returns>GrHeader detayı</returns>
        [HttpGet("by-erp-document/{erpDocumentNo}")]
        public async Task<ActionResult<ApiResponse<GrHeaderDto?>>> GetByERPDocumentNo(string erpDocumentNo)
        {
            var result = await _grHeaderService.GetByERPDocumentNoAsync(erpDocumentNo);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni GrHeader kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak GrHeader bilgileri</param>
        /// <returns>Oluşturulan GrHeader</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<GrHeaderDto>>> Create([FromBody] CreateGrHeaderDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ApiResponse<GrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400, default));
            }

            var result = await _grHeaderService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Mevcut GrHeader kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek GrHeader ID</param>
        /// <param name="updateDto">Güncellenecek bilgiler</param>
        /// <returns>Güncellenmiş GrHeader</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<GrHeaderDto>>> Update(int id, [FromBody] UpdateGrHeaderDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ApiResponse<GrHeaderDto>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400, default));
            }

            var result = await _grHeaderService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GrHeader kaydını soft delete yapar
        /// </summary>
        /// <param name="id">Silinecek GrHeader ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(int id)
        {
            var result = await _grHeaderService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GrHeader kaydını soft delete yapar 
        /// </summary>
        /// <param name="id">Soft delete yapılacak GrHeader ID</param>
        /// <returns>Soft delete işlemi sonucu</returns>
        [HttpDelete("{id}/soft")]
        public async Task<ActionResult<ApiResponse<bool>>> SoftDelete(int id)
        {
            var result = await _grHeaderService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GrHeader kaydını tamamlar (IsCompleted=true, CompletionDate=now, IsPendingApproval=false)
        /// </summary>
        /// <param name="id">Tamamlanacak GrHeader ID</param>
        /// <returns>İşlem sonucu</returns>
        [HttpPost("{id}/complete")]
        public async Task<ActionResult<ApiResponse<bool>>> Complete(int id)
        {
            var result = await _grHeaderService.CompleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif GrHeader kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif GrHeader listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrHeaderDto>>>> GetActive()
        {
            var result = await _grHeaderService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Şube koduna göre GrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="branchCode">Şube kodu</param>
        /// <returns>Şubeye ait GrHeader listesi</returns>
        [HttpGet("by-branch/{branchCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrHeaderDto>>>> GetByBranchCode(string branchCode)
        {
            var result = await _grHeaderService.GetByBranchCodeAsync(branchCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Müşteri koduna göre GrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="customerCode">Müşteri kodu</param>
        /// <returns>Müşteriye ait GrHeader listesi</returns>
        [HttpGet("by-customer/{customerCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrHeaderDto>>>> GetByCustomerCode(string customerCode)
        {
            var result = await _grHeaderService.GetByCustomerCodeAsync(customerCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Tarih aralığına göre GrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="startDate">Başlangıç tarihi</param>
        /// <param name="endDate">Bitiş tarihi</param>
        /// <returns>Tarih aralığındaki GrHeader listesi</returns>
        [HttpGet("by-date-range")]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrHeaderDto>>>> GetByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var result = await _grHeaderService.GetByDateRangeAsync(startDate, endDate);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Sayfalı GrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="pageNumber">Sayfa numarası</param>
        /// <param name="pageSize">Sayfa boyutu</param>
        /// <param name="sortBy">Sıralama alanı (Id, DocumentDate, ERPDocumentNo, CreatedDate)</param>
        /// <param name="sortDirection">Sıralama yönü (asc/desc)</param>
        /// <returns>Sayfalı GrHeader listesi</returns>
        [HttpGet("paged")]
        public async Task<ActionResult<ApiResponse<PagedResponse<GrHeaderDto>>>> GetPaged(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sortBy = null,
            [FromQuery] string? sortDirection = "asc")
        {
            var result = await _grHeaderService.GetPagedAsync(pageNumber, pageSize, sortBy, sortDirection);
            return StatusCode(result.StatusCode, result);
        }


        [HttpPost("bulkCreate")]
        public async Task<ActionResult<ApiResponse<int>>> BulkCreate([FromBody] BulkCreateGrRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                var error = ApiResponse<int>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400);
                return StatusCode(error.StatusCode, error);
            }

            // Özel transactional insert: tüm eklemeler tek transaction içinde yapılır.
            try
            {
                using (var scope = new System.Transactions.TransactionScope(System.Transactions.TransactionScopeAsyncFlowOption.Enabled))
                {
                    var result = await _grHeaderService.BulkCreateCorrelatedAsync(request);

                    if (result.StatusCode >= 400)
                    {
                        return StatusCode(result.StatusCode, result);
                    }

                    scope.Complete();
                    return StatusCode(result.StatusCode, result);
                }
            }
            catch (Exception ex)
            {
                var error = ApiResponse<int>.ErrorResult("İşlem sırasında hata oluştu: " + ex.Message, ex.Message, 500);
                return StatusCode(error.StatusCode, error);
            }
        }
        
    }
}