using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private IMapper _mapper;
        private IProductRepository _productRepository;
        public ProductsController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _productRepository.GetProductsAsync();

            var producsToReturn = _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(producsToReturn);
        }

        [HttpGet("{id}")] // /api/products/2
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
             var product = await _productRepository.GetProductByIdAsync(id);
             return _mapper.Map<ProductDto>(product);
        }

        [HttpGet("edit/{id}")] // /products/edit/1
        public async Task<ActionResult<ProductDto>> EditProduct(int id){
             var product = await _productRepository.GetProductByIdAsync(id);
             return _mapper.Map<ProductDto>(product);
        }
        [HttpPut("update")]
         public void UpdateProduct(Product product){
              _productRepository.Update(product);
              _productRepository.SaveAllAsync();
        }

        [HttpDelete("delete/{id}")] // /products/delete/2
        public  ActionResult DeleteProduct(int id){
            try{
                // _productRepository.DeletePhoto(id);
                // _productRepository.DeleteProductCategory(id);
                _productRepository.DeleteProduct(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
            // _productRepository.SaveAllAsyncs();
        }

    }
}