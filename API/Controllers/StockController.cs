using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ObjectPool;

namespace API.Controllers
{
    public class StockController : BaseApiController
    {
        private IProductRepository _productRepository;
        private IUserRepository _userRepository;
        private IMapper _mapper;
        public StockController(IProductRepository productRepository, IMapper mapper, IUserRepository userRepository){

            _productRepository = productRepository;
            _userRepository = userRepository;
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
                Category = product.Category.ToLower(),
                OldPrice = product.OldPrice,
                Price = product.GetPrice(product.OldPrice, product.Discount),
                Discount = product.Discount,
                Image = product.Image,
                Categories = new List<ProductCategory>{ new ProductCategory(){name = product.Category.ToLower()}},
                Images = new(),
                ShoppingCartId = product.ShoppingCartId,
                Subtotal = product.Subtotal

            };
            var productDTO =  _mapper.Map<ProductDto>(newProduct);
            var photo = new Photo
            {
                IsMain = true,
                Url = product.Image,
                ProductId = productDTO.Id,
            };
            newProduct.Images.Add(photo);


            if (await _productRepository.CategoryExists(newProduct.Category.ToString())) 
            {
                Console.WriteLine("Category already exists !");
            }
            else{
                // var prodCateg = await _productRepository.GetProductCategoryAsync();
                // foreach(var c in prodCateg){
                //     if(c.ProductId == newProduct.Id){
                //        newProduct.Categories.FirstOrDefault(p=>p.id == c.id);


                //     }
                // }
                // var categ = newProduct.Categories.FirstOrDefault(p=>p.id == prodCateg.);
                //     if(categ != null){
                        
                //     }
                
                // var categDto = _mapper.Map<ProductCategory>(newProduct.Categories.FirstOrDefault());
                await _productRepository.AddProductCategory(newProduct.Categories.FirstOrDefault());
                
            }
            await _productRepository.AddProductAsync(newProduct);
            await _productRepository.SaveAllAsync();

            return newProduct;
        }

    }
}