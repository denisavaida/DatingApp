using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseApiController
    {
        private IOrderRepository _orderRepository;
        private IProductRepository _productRepository;
        private IUserRepository _userRepository;
        private IDeliveryRepository _deliveryRepository;
        private ISummaryRepository _summaryRepository;
        private IPaymentRepository _paymentRepository;
        private IShoppingCartRepository _shoppingCartRepository;
        private Order order;

        public OrderController(IOrderRepository orderRepository,IProductRepository productRepository,
                                IUserRepository userRepository, IDeliveryRepository deliveryRepository, 
                                ISummaryRepository summaryRepository, IPaymentRepository paymentRepository,
                                IShoppingCartRepository shoppingCartRepository){

            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
            _deliveryRepository = deliveryRepository;
            _summaryRepository = summaryRepository;
            _paymentRepository = paymentRepository;
            _shoppingCartRepository = shoppingCartRepository;
        }
        [HttpPost("add")] //POST: api/oder/add
        public async Task<ActionResult<Order>> AddOrder(Order order){
            this.order = new Order
            {
                Summary = order.Summary,
                Delivery= order.Delivery,
                DeliveryInfo = order.DeliveryInfo,
                PaymentMethod = order.PaymentMethod,
                AppUserId = order.AppUserId
            };
            this.order.Summary.AppUserId = this.order.AppUserId;
            this.order.DeliveryInfo.AppUserId = this.order.AppUserId;
            this.order.DeliveryInfo.Adress.AppUserId = this.order.AppUserId;
            this.order.PaymentMethod.AppUserId = this.order.AppUserId;
            // var newOrder = new Order{};
            
            await _userRepository.AddAdressAsync(this.order.DeliveryInfo.Adress);
            await _userRepository.SaveAllAsync();

            await _deliveryRepository.AddDeliveryAsync(this.order.Delivery);
            await _deliveryRepository.SaveAllAsync();

            await _summaryRepository.AddSummaryAsync(this.order.Summary);
            await _summaryRepository.SaveAllAsync();

            await _paymentRepository.AddCardAsync(this.order.PaymentMethod);
            await _paymentRepository.SaveAllAsync();

            await _orderRepository.AddOrderAsync(this.order);
            await _orderRepository.SaveAllAsync();

            var orderedProds = order.Summary.ShoppingCartItems;
            for(int i=0; i<orderedProds.Count; i++){
                var prod = new Product();
                prod = _productRepository.GetProductByIdAsync(orderedProds[i].ProductId).Result;
                prod.Stock = prod.Stock - orderedProds[i].Quantity;
                _productRepository.Update(prod);
                await _productRepository.SaveAllAsync();
            }
            // var shopCart = await _shoppingCartRepository.GetShoppingCartByUserIdAsync(this.order.AppUserId);
             _shoppingCartRepository.ClearShoppingCartByUserId(this.order.AppUserId);

            return this.order;
        }

    }
}