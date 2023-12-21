using System.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    public class FavouritesController : BaseApiController
    {
        private IFavouritesRepository _favouritesRepository;
        private Favourites favourites;

        public FavouritesController(IFavouritesRepository favouritesRepository){
            _favouritesRepository = favouritesRepository;
        }
        [HttpGet]
        public async Task<IEnumerable<Favourites>> GetAllFavourites(){
            var favList = await _favouritesRepository.GetAllFavouritesAsync();
            return favList;
        }
       [HttpGet("{id}")]
        public async Task<IEnumerable<Favourites>> GetFavouritesById(int id)
        {
            var favs = await _favouritesRepository.GetUserFavourites(id);
            
            return favs;
        }

        [HttpPost("add")]
         public async Task<ActionResult<Favourites>> AddFavourites(Favourites fav){
            var favList = await _favouritesRepository.GetAllFavouritesAsync();
            if(! favList.IsNullOrEmpty()){
                var favExists = await _favouritesRepository.FavouritesExists(fav.ProductId);
                if(!favExists){
                favourites = new Favourites{
                    ProductId = fav.ProductId,
                    AppUserId = fav.AppUserId,
                    Product = fav.Product
                };
                await _favouritesRepository.AddFavouritesAsync(favourites);
                await _favouritesRepository.SaveAllAsync();
                }
                
            }else{
                favourites = new Favourites{
                        ProductId = fav.ProductId,
                        AppUserId = fav.AppUserId,
                        Product = fav.Product
                };
                await _favouritesRepository.AddFavouritesAsync(favourites);
                await _favouritesRepository.SaveAllAsync();
            
            }
            return favourites;
         }

        [HttpDelete("delete/{id}")] // /favourites/delete/3
        public  ActionResult DeleteProduct(int id){
            try{
                _favouritesRepository.Delete(id);
            }catch{
                return StatusCode(500);
            }
            return Ok();
        }
    }
}