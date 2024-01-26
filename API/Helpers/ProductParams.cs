using System.Globalization;

namespace API.Helpers
{
    public class ProductParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber{get;set;} = 1;
        private int _pageSize = 12;
        public int PageSize
        {
            get => _pageSize;
            set =>_pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public int? CategoryId{get;set;}
        public int? SubcategoryId{get;set;}
        public int? CategoryGenderId{get;set;}
        
    }
}