using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DeliveryController : BaseApiController
    {
        private IMapper _mapper;
        private IDeliveryRepository _deliveryRepository;
        public DeliveryController(IDeliveryRepository deliveryRepository, IMapper mapper)
        {
            _deliveryRepository = deliveryRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Delivery>>> GetDeliveryOptions()
        {
            var deliveries = await _deliveryRepository.GetDeliveryAsync();
            return Ok(deliveries);
           
        }
                
        [HttpGet("{id}")] // /api/delivery/2
        public async Task<ActionResult<Delivery>> GetDeliveryById(int id)
        {
             return await _deliveryRepository.GetDeliveryByIdAsync(id);
        }
        [HttpPost("add")] //POST: api/delivery/add?name=fancourier...
        public async Task<ActionResult<Delivery>> AddDelivery(Delivery delivery){
            if (await _deliveryRepository.DeliveryExists(delivery.Description)) return BadRequest("Delivery description already exists !");

            var newDelivery = new Delivery
            {
                CompanyUrl = delivery.CompanyUrl,
                Description = delivery.Description,
                Duration = delivery.Duration,
                Cost = delivery.Cost
            };

            await _deliveryRepository.AddDeliveryAsync(newDelivery);
            await _deliveryRepository.SaveAllAsync();

            return newDelivery;
        }

       [HttpPut("update")]
         public void UpdateDelivery(Delivery delivery){
              _deliveryRepository.Update(delivery);
              _deliveryRepository.SaveAllAsync();
        }
        
        [HttpDelete("delete/{id}")] // /products/delete/2
        public  ActionResult DeleteDelivery(int id){
            try{
                _deliveryRepository.DeleteDelivery(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }
    }
}