using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SQLitePCL;

namespace API.Controllers
{
    public class ShoppingCartController : BaseApiController
    {
        private IShoppingCartRepository _shoppingCartRepository;

        private IProductRepository _productRepository;
        private ShoppingCart shoppingCart;
        
        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository, IProductRepository productRepository){
            _shoppingCartRepository = shoppingCartRepository;
            _productRepository = productRepository;
        }
        
        [HttpGet("{id}")]
        public async Task<IEnumerable<ShoppingCart>> GetShoppingCartProds(int id)
        {
            var shoppingCarts = await _shoppingCartRepository.GetUserShoppingCart(id);
            
            return shoppingCarts;
        }

        [HttpGet]
        public async Task<IEnumerable<ShoppingCart>> GetAllShoppingCart(){
            var shoppingCartList = await _shoppingCartRepository.GetAllShoppingCart();
            return shoppingCartList;
        }

        [HttpPost("add")]
        public async Task<ActionResult<ShoppingCart>> AddShoppingCart(ShoppingCart cart){

                var dbcart = await GetShoppingCartProds(cart.AppUserId);
                if(! dbcart.IsNullOrEmpty()){
                    var cartItem = await _shoppingCartRepository.GetShoppingCartByProductIdAsync(cart.Product.Id);
                    // var product  = await _productRepository.GetProductByIdAsync(cart.ProductId);
                    if(cartItem == null){
                        shoppingCart = new ShoppingCart{
                                Quantity = cart.Quantity,
                                AppUserId = cart.AppUserId,
                                Subtotal = cart.Subtotal,
                            };
                            await _shoppingCartRepository.AddShoppingCartAsync(shoppingCart);
                            await _shoppingCartRepository.SaveAllAsync();
                             shoppingCart.Product = cart.Product;
                             shoppingCart.Summary = cart.Summary;
                             _shoppingCartRepository.Update(shoppingCart);
                            await _shoppingCartRepository.SaveAllAsync();

                    }else{
                        var cartExists = await _shoppingCartRepository.ShoppingCartExists(cartItem.Id);
                        if(cartExists){
                            cartItem.Quantity = cartItem.Quantity + cart.Quantity;
                            cartItem.Subtotal = cartItem.Quantity * cart.Product.Price;
                            shoppingCart = cartItem;
                            _shoppingCartRepository.Update(cartItem);  
                            await _shoppingCartRepository.SaveAllAsync();                      
                        } else{
                            shoppingCart = new ShoppingCart{
                                Quantity = cart.Quantity,
                                AppUserId = cart.AppUserId,
                                Subtotal = cart.Subtotal
                            };
                            await _shoppingCartRepository.AddShoppingCartAsync(shoppingCart);
                            await _shoppingCartRepository.SaveAllAsync();
                            shoppingCart.Product = cart.Product;
                             shoppingCart.Summary = cart.Summary;
                             _shoppingCartRepository.Update(shoppingCart);
                            await _shoppingCartRepository.SaveAllAsync();

                        }
                    }
                }else{
                    shoppingCart = new ShoppingCart{
                        Quantity = cart.Quantity,
                        AppUserId = cart.AppUserId,
                        Subtotal = cart.Subtotal
                    };
                    await _shoppingCartRepository.AddShoppingCartAsync(shoppingCart);
                    await _shoppingCartRepository.SaveAllAsync();
                    shoppingCart.Product = cart.Product;
                    shoppingCart.Summary = cart.Summary;
                    _shoppingCartRepository.Update(shoppingCart);
                    await _shoppingCartRepository.SaveAllAsync();

                }
            return shoppingCart;
        
        }
        [HttpPut("update")]
         public void UpdateShoppingCart(ShoppingCart cart){
              _shoppingCartRepository.Update(cart);
              _shoppingCartRepository.SaveAllAsync();
        }

        [HttpDelete("delete/{id}")] // /shoppingCart/delete
        public  ActionResult DeleteProduct(int id){
            try{
                _shoppingCartRepository.Delete(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }

    }
}