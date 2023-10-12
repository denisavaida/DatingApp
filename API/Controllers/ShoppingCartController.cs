using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShoppingCartController : BaseApiController
    {
        private IProductRepository _productRepository;
        private ShoppingCart shoppingCart;
        
        public ShoppingCartController(IProductRepository productRepository){
            _productRepository = productRepository;
            // shoppingCartProducts = GetShoppingCartProducts();
        }
        
        [HttpGet("{id}")]
        public async Task<ShoppingCart> GetShoppingCart(int id)
        {
            var shoppingCart = await _productRepository.GetShoppingCartByIdAsync(id);
            
            return shoppingCart;
        }

        [HttpGet]
        public async Task<IEnumerable<ShoppingCart>> GetAllShoppingCart(){
            var shoppingCartList = await _productRepository.GetAllShoppingCart();
            return shoppingCartList;
        }

        [HttpPost("add")]
        public async Task<ActionResult<ShoppingCart>> AddShoppingCart(ShoppingCart cart){

            var cartExists = await _productRepository.ShoppingCartExists(cart.Id);
            
            //shoppingCart = await GetShoppingCart(cart.Id);
            Console.WriteLine(cart.Product);
            if(cartExists){
                for (int i = 0; i < cart.Product.Count; i++){
                        for (int j = 0; j < shoppingCart.Product.Count; j++){
                            
                            if (await _productRepository.ProductExistsInShoppingCart(cart.Product[i].Id)) {
                                    shoppingCart.Product[j].Quantity++;
                                    shoppingCart.Product[j].Subtotal = shoppingCart.Product[j].Price * shoppingCart.Product[j].Quantity;
                                    shoppingCart.Total = shoppingCart.Total+ shoppingCart.Product[j].Subtotal;
                            }else{
                                cart.Product[i].Quantity++;
                                shoppingCart.Product.Add(cart.Product[i]);
                                shoppingCart.Product[j].Subtotal = shoppingCart.Product[j].Price * shoppingCart.Product[j].Quantity;
                                shoppingCart.Total = shoppingCart.Total+ shoppingCart.Product[j].Subtotal;  
                            }
                    }
                }
                    
            }
            shoppingCart = new ShoppingCart{
                Product = cart.Product,
                Total = cart.Total,
                AppUserId = cart.AppUserId
            };


            // Console.WriteLine(shoppingCart);
            
            // for (int i = 0; i < cart.Product.Count; i++){
            //     shoppingCart.Product.Add(cart.Product[i]);
            //     shoppingCart.Product[i].Subtotal = shoppingCart.Product[i].Price * shoppingCart.Product[i].Quantity;
            //     shoppingCart.Total = shoppingCart.Total + shoppingCart.Product[i].Subtotal;
            // }
                    
            
            Console.WriteLine(shoppingCart);
            await _productRepository.AddShoppingCartAsync(shoppingCart);
            await _productRepository.SaveAllAsync();

            return shoppingCart;
        
        }

    }
}