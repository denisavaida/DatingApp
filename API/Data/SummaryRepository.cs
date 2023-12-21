using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SummaryRepository : ISummaryRepository
    {
        private DataContext _context;

        public SummaryRepository(DataContext context){
            _context = context;
        }
        public async Task<Summary> AddSummaryAsync(Summary summary)
        {
            await _context.Summary.AddAsync(summary);
            return summary;
        }

        public async Task<Summary> GetUserSummary(int id)
        {
            return await _context.Summary.SingleOrDefaultAsync(s=>s.AppUserId == id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}