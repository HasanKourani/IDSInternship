using Backend.Repository;
using Backend.Repository.Models;
using IDSProject.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IDSProject.Controllers
{
    
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;

        public CommentController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{postId}")]
        public IActionResult GetComment(int postId)
        {
            var comments = dbContext.Comments
                .Where(x => x.PostId == postId)
                .Join(dbContext.Users,
                c => c.UserId,
                u => u.Id,
                (c, u) => new
                {
                    c.Id,
                    c.Context,
                    c.DateCommented,
                    c.UserId,
                    Username = u.Username
                }
                )
                .ToList();

            if (comments == null)
            {
                return NotFound();
            }

            return Ok(comments);
        }

        [HttpGet("GetComments")]
        public IActionResult GetComments()
        {

            var allComments = dbContext.Comments.ToList();

            return Ok(allComments);
        }

        [Authorize]
        [HttpPost("Add")]
        public IActionResult AddComment([FromBody] CommentDTO comment)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = dbContext.Posts.FirstOrDefault(p => p.Id == comment.PostId);

            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            if (post == null)
            {
                return NotFound();
            }

            dbContext.Comments.Add(new Comment
            {
                Context = comment.Context,
                PostId = comment.PostId,
                UserId = userId
            });

            dbContext.SaveChanges();

            return Ok(comment);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteComment(int id)
        {
            var comment = dbContext.Comments.Find(id);
            if(comment == null)
            {
                return NotFound();
            }

            dbContext.Comments.Remove(comment);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}
