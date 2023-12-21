using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            CreateMap<AppUser, MemberDto>();
            CreateMap<Product,ProductDto>()
            .ForMember(P=>P.Quantity, opt => opt.Equals(1))
            .ForMember(P=>P.Image, opt => opt.MapFrom(src=>src.Images.FirstOrDefault(x=>x.IsMain).Url));
            CreateMap<ProductCategory,CategoryDto>()
                .ForMember(p=>p.Id,opt=>opt.MapFrom(src=>src.ProductId));
        }
        
    }
}