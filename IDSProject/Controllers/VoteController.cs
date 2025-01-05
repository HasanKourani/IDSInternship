using IDSProject.DTOs;
using IDSProject.Repository;
using IDSProject.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IDSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;

        public VoteController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost]
        public IActionResult AddVote([FromBody] VoteDTO vote)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Votes.Add(new Vote
            {
                VoteType = vote.VoteType
            });

            dbContext.SaveChanges();
            return Ok();
        }
    }
}
