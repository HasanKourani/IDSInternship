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
    public class CommentController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;

        public CommentController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public IActionResult GetComment(int id)
        {
            var comment = dbContext.Comments.Find(id);
            if(comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpGet("GetComments")]
        public IActionResult GetComments()
        {

            var allComments = dbContext.Comments.ToList();

            return Ok(allComments);
        }

        [HttpPost("Add")]
        public IActionResult AddComment([FromBody] CommentDTO comment)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = dbContext.Posts.FirstOrDefault(p => p.Id == comment.PostId);
            var user = dbContext.Users.FirstOrDefault(u => u.Id == comment.UserId);

            if (post == null)
            {
                return NotFound();
            }
            if(user == null)
            {
                return NotFound();
            }

            dbContext.Comments.Add(new Comment
            {
                Context = comment.Context,
                PostId = comment.PostId,
                UserId = comment.UserId
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
