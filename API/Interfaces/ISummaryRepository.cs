using API.Entities;

namespace API.Interfaces
{
    public interface ISummaryRepository
    {
        Task<Summary> GetUserSummary(int id);
        Task<Summary> AddSummaryAsync(Summary summary);
        Task<bool> SaveAllAsync();
    }
}