using IDSProject.DTOs;
using IDSProject.Repository;
using IDSProject.Repository.Models;
using Microsoft.AspNetCore.Authorization;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = dbContext.Posts.FirstOrDefault(p => p.Id == vote.PostId);
            var user = dbContext.Users.FirstOrDefault(u => u.Id == vote.UserId);

            dbContext.Votes.Add(new Vote
            {
                VoteType = vote.VoteType,
                PostId = vote.PostId,
                UserId = vote.UserId
            });

            dbContext.SaveChanges();
            return Ok();
        }
    }
}
