using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SummaryController : BaseApiController
    {
        private ISummaryRepository _summaryRepository;
        private Summary summary;
        
        public SummaryController(ISummaryRepository summaryRepository){
            _summaryRepository = summaryRepository;
        }
                
        [HttpGet("{id}")]
        public async Task<Summary> GetSummaryByUserId(int id)
        {
            this.summary = await _summaryRepository.GetUserSummary(id);
            
            return this.summary;
        }

        [HttpPost("add")]
        public async Task<ActionResult<Summary>> AddSummary(Summary summary){

        
            this.summary = new Summary{
                AppUserId = summary.AppUserId,
                ProductCost = summary.ProductCost,
                Total = summary.Total,
                VoucherId = summary.VoucherId
                    
                };
                await _summaryRepository.AddSummaryAsync(this.summary);
                await _summaryRepository.SaveAllAsync();
                  
            return this.summary;
        
        }
    }
}