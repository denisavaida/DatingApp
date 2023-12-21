using API.Controllers;
using API.DTOs;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllerss
{
    public class PromotionsController: BaseApiController
    {
        private IMapper _mapper;
        private IPromotionsRepository _promotionsRepository;
        public PromotionsController(IPromotionsRepository promotionsRepository, IMapper mapper)
        {
            _promotionsRepository = promotionsRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProductDto>>> GetPromoProducts([FromQuery]ProductParams productParams)
        {
            var query = await _promotionsRepository.GetPromoProductsAsync(productParams);
            Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(query);
        }
    }
}