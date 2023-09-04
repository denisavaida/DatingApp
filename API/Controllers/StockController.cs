using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class StockController : BaseApiController
    {
        private DataContext _context;

        public StockController(DataContext context){
            _context = context;
        }
        [HttpPost("add")] //POST: api/stock/add?name=ciorapi&quantity=2
        public async Task<ActionResult<Product>> AddProducts(Product product){
            if (await ProductExists(product.Name)) return BadRequest("Product name already exists !");

            var newProduct = new Product
            {
                Name = product.Name.ToLower(),
                Description = product.Description.ToLower(),
                Quantity = product.Quantity,
                Category = product.Category.ToLower(),
                OldPrice = product.OldPrice,
                Price = product.Price
                
            };
            var newCategory = new ProductCategory
            {
                name = product.Category.ToLower(),
            };
            
            newProduct.Categories.Add(newCategory);

            if (await CategoryExists(product.Category)) 
            {
                Console.WriteLine("Category already exists !");
            }
            else{
                _context.ProductCategory.Add(newCategory);
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return newProduct;
        }
      
        private async Task<bool> ProductExists(string name)
        {
            return await _context.Products.AnyAsync(x => x.Name == name);
        }

        private async Task<bool> CategoryExists(string name)
        {
            return await _context.ProductCategory.AnyAsync(x => x.name == name.ToLower());
        }
    }
}