using System.Security.Claims;
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

            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            dbContext.Votes.Add(new Vote
            {
                VoteType = vote.VoteType,
                PostId = vote.PostId,
                UserId = userId
            });

            dbContext.SaveChanges();
            return Ok();
        }
    }
}
