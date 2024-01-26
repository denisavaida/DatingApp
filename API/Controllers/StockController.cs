using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StockController : BaseApiController
    {
        private IProductRepository _productRepository;
        private ICategoryRepository _categoryRepository;
        private IMapper _mapper;
        public StockController(IProductRepository productRepository, IMapper mapper, ICategoryRepository categoryRepository){

            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        [HttpPost("add")] //POST: api/stock/add?name=ciorapi&quantity=2
        public async Task<ActionResult<Product>> AddProducts(Product product){
            if (await _productRepository.ProductExists(product.Name)) return BadRequest("Product name already exists !");

            var newProduct = new Product
            {
                Name = product.Name.ToLower(),
                Description = product.Description.ToLower(),
                Quantity = product.Quantity,
                Stock = product.Stock,
                OldPrice = product.OldPrice,
                Price = product.GetPrice(product.OldPrice, product.Discount),
                Discount = product.Discount,
                Image = product.Image,
                Images = new(),
                SoftDeleted = product.SoftDeleted,
                Rating = product.Rating,
                
            };
            var photo = new Photo
            {
                IsMain = true,
                Url = product.Image,
                ProductId = newProduct.Id,
            };
            newProduct.Images.Add(photo);

            await _productRepository.AddProductAsync(newProduct);
            await _productRepository.SaveAllAsync();
            newProduct.Subcategory = product.Subcategory;
            newProduct.Category = product.Category;
            newProduct.CategoryGender = product.CategoryGender;
             _productRepository.Update(newProduct);
            await _productRepository.SaveAllAsync();

            return newProduct;
        }

    }
}