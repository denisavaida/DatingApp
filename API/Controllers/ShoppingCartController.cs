using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ShoppingCartController : BaseApiController
    {
        private DataContext _context;
        private ShoppingCart shoppingCart;
        public ShoppingCartController(DataContext context){
            _context = context;
            // shoppingCartProducts = GetShoppingCartProducts();
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCartProducts()
        {

            var shoppingCartProducts = await _context.ShoppingCart.FindAsync();

            return shoppingCartProducts;
        }

        [HttpPost("add")]
        public async Task<ActionResult<ShoppingCart>> AddToShoppingCart(Product product){
            if (await ProductExistsInShoppingCart(product.Id)) 
            {
                for (int i = 0; i < shoppingCart.Products.Count; i++){
                    shoppingCart.Products[i].Quantity++;
                    shoppingCart.Products[i].Price = shoppingCart.Products[i].Price * shoppingCart.Products[i].Quantity;
                }
            }

            var newProduct= new Product
            {
                Id = product.Id,
                Name = product.Name,
                Quantity = product.Quantity,
                Price = product.Price
                
            };
            shoppingCart.Products.Add(newProduct);
            for (int i = 0; i < shoppingCart.Products.Count; i++){
                shoppingCart.Products[i].Price = shoppingCart.Products[i].Price * shoppingCart.Products[i].Quantity;
                shoppingCart.Total = shoppingCart.Total + shoppingCart.Products[i].Price;
            }

            _context.ShoppingCart.Add(shoppingCart);
            await _context.SaveChangesAsync();

            return shoppingCart;
        }
        private async Task<bool> ProductExistsInShoppingCart(int id)
        {
            return await _context.ShoppingCart.AnyAsync(x => x.Id == id);
        }

    }
}