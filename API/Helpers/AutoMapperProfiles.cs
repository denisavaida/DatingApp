using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<AppUser, MemberDto>();
                //.ForMember(dest => dest.Adress, opt=> opt.MapFrom(src=>src.Adress));
            CreateMap<Product,ProductDto>()
            .ForMember(P=>P.Quantity, opt => opt.Equals(1))
            .ForMember(P=>P.Image, opt => opt.MapFrom(src=>src.Images.FirstOrDefault(x=>x.IsMain).Url));
            //.ForMember(P=>P.Image, opt => opt.MapFrom(src=>src.Image));
            CreateMap<ProductCategory,CategoryDto>()
                .ForMember(p=>p.id,opt=>opt.MapFrom(src=>src.ProductId));
            // CreateMap<ShoppingCart,ShoppingCartDto>();
            
        }
        
    }
}