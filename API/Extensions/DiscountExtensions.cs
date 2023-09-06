using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class DiscountExtensions
    {
        public static int CalculateDiscount( discount , oldPrice){
            int newPrice;
            if(oldPrice != null){ 
                if(discount!= null){
                    newPrice = oldPrice*discount/100;
                    return newPrice;
                }else{
                    return oldPrice;
                }
            }else{
                return oldPrice;
            }
        }
    }
}