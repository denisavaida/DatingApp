using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class ShoppingCartController : BaseApiController
    {
        private IShoppingCartRepository _shoppingCartRepository;
        private ShoppingCart shoppingCart;
        
        public ShoppingCartController(IShoppingCartRepository shoppingCartRepository){
            _shoppingCartRepository = shoppingCartRepository;
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
                    var cartItem = await _shoppingCartRepository.GetShoppingCartByProductIdAsync(cart.ProductId);
                    
                    if(cartItem == null){
                        shoppingCart = new ShoppingCart{
                                Quantity = cart.Quantity,
                                ProductId = cart.ProductId,
                                Product = cart.Product,
                                AppUserId = cart.AppUserId,
                                Subtotal = cart.Subtotal
                            };
                            await _shoppingCartRepository.AddShoppingCartAsync(shoppingCart);
                            await _shoppingCartRepository.SaveAllAsync();
                    }else{
                        var cartExists = await _shoppingCartRepository.ShoppingCartExists(cartItem.Id);
                        if(cartExists){
                            cartItem.Quantity = cartItem.Quantity + cart.Quantity;
                            cartItem.Subtotal = cartItem.Quantity * cart.Product.Price;
                            this.shoppingCart = cartItem;
                            _shoppingCartRepository.Update(cartItem);  
                            await _shoppingCartRepository.SaveAllAsync();                      
                        } else{
                            shoppingCart = new ShoppingCart{
                                Quantity = cart.Quantity,
                                ProductId = cart.ProductId,
                                Product = cart.Product,
                                AppUserId = cart.AppUserId,
                                Subtotal = cart.Subtotal
                            };
                            await _shoppingCartRepository.AddShoppingCartAsync(shoppingCart);
                            await _shoppingCartRepository.SaveAllAsync();
                        }
                    }
                }else{
                    // var product = new Product{
                    //     Name = cart.Product.Name,
                    //     Description= cart.Product.Description,
                    //     Quantity = cart.Product.Quantity,
                    //     Stock = cart.Product.Stock,
                    //     Categories  = cart.Product.Categories,
                    //     Category = cart.Product.Category,
                    //     OldPrice = cart.Product.OldPrice,
                    //     Price = cart.Product.Price,
                    //     Image = cart.Product.Image,
                    //     Images = cart.Product.Images,
                    //     SoftDeleted = cart.Product.SoftDeleted,
                    //     Discount = cart.Product.Discount
                    // };
                    shoppingCart = new ShoppingCart{
                        Quantity = cart.Quantity,
                        ProductId = cart.ProductId,
                        Product = cart.Product,
                        AppUserId = cart.AppUserId,
                        Subtotal = cart.Subtotal
                    };
                    await _shoppingCartRepository.AddShoppingCartAsync(shoppingCart);
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