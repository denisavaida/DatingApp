using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
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
        public async Task<ActionResult<PagedList<ProductDto>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = await _productRepository.GetProductsAsync(productParams);
            
            // var query = ValidateInStockProducts(query1);
            Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(query);
        }

        [HttpGet("search/{searchItem}")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetSearchProducts(string searchItem)
        {
            var products = await _productRepository.GetProductsSearchAsync(searchItem);
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }
        public PagedList<Product> ValidateInStockProducts(PagedList<Product> products){
            for( var i=0; i < products.Count; i++){
                if(products[i].Stock == 0){
                    products.Add(products[i]);
                    products.Remove(products[i]);
                }
            }
            return products;
        }
        [HttpGet("category/{category}")] // /api/products/category/baby
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsBySelectedCategory(string category)
        {
            var products = await _productRepository.GetProductsBySelectedCategoryAsync(category);
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }

        [HttpGet("range/{minPrice}/{maxPrice}")] // /api/products/category/baby
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsBySelectedCategory(int minPrice, int maxPrice)
        {
            var products = await _productRepository.GetProductsByRangeAsync(minPrice, maxPrice);
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }
        [HttpGet("sort/{type}")] // /api/products/sort/ascending
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsSort(string type)
        {
            var products = await _productRepository.GetProductsBySortingTypeAsync(type);
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }
        [HttpGet("instock")] // /api/products/instock
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetInStockProducts()
        {
            var products = await _productRepository.GetInStockProductsAsync();
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }
        [HttpGet("promotions")] // /api/products/promotions
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetPromoProducts()
        {
            var products = await _productRepository.GetPromoProductsAsync();
            // Response.AddPaginationHeader(new PaginationHeader(query.CurrentPage, query.PageSize, query.TotalCount, query.TotalPages));
            return Ok(products);
        }

        [HttpGet("{id}")] // /api/products/2
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
             var product = await _productRepository.GetProductByIdAsync(id);
             return _mapper.Map<ProductDto>(product);
        }

        [HttpGet("edit/{id}")] // /products/edit/1                  // IS IT WORKING????
        public async Task<ActionResult<ProductDto>> EditProduct(int id){
             var product = await _productRepository.GetProductByIdAsync(id);
             return _mapper.Map<ProductDto>(product);
        }
        [HttpGet("photos/{id}")] // /products/photos/1
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotosByProdId(int id){
             var photos = await _productRepository.GetPhotoByProdIdAsync(id);
             return _mapper.Map<Photo[]>(photos);
        }
        [HttpPost("add-photo")] // /products/add-photo?url='...'
        public async Task<ActionResult<Photo>> AddPhotoOfProduct(Photo photo){
            var newphoto = new Photo{
                Url = photo.Url,
                IsMain = photo.IsMain,
                ProductId = photo.ProductId
            };
            await _productRepository.AddPhotoAsync(newphoto);
            await _productRepository.SaveAllAsync();
            return newphoto;
        }


        [HttpPut("update")]
         public void UpdateProduct(Product product){
              _productRepository.Update(product);
              _productRepository.SaveAllAsync();
        }

        [HttpDelete("delete/{id}")] // /products/delete/2
        public  ActionResult DeleteProduct(int id){
            try{
                _productRepository.DeleteProduct(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }

    }
}