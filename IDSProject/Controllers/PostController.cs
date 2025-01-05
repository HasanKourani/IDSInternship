using IDSProject.DTOs;
using IDSProject.Repository;
using IDSProject.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IDSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;

        public PostController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("GetPosts")]
        public IActionResult GetAllPosts()
        {
            var allPosts = dbContext.Posts.ToList();

            return Ok(allPosts);
        }

        [HttpGet("GetPost/{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = dbContext.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost("Create")]
        public IActionResult CheckNewPost([FromBody] PostDTO post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Posts.Add(new Post
            {
                Description = post.Description,
                Title = post.Title,
                Category = post.Category,
                Image = post.Image,
                TagId = post.TagId

            });
            dbContext.SaveChanges();

            return Ok(post);
        }

        [HttpPut("Edit/{id}")]
        public IActionResult EditPost(int id, [FromBody] Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var selectedPost = dbContext.Posts.Find(id);
            if (selectedPost == null)
            {
                return NotFound();
            }

            selectedPost.Title = post.Title;
            selectedPost.Description = post.Description;
            selectedPost.TagId = post.TagId;
            selectedPost.Category = post.Category;
            selectedPost.DateUpdated = DateTime.UtcNow;

            dbContext.SaveChanges();

            return Ok(selectedPost);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeletePost(int id)
        {
            var post = dbContext.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }
            dbContext.Posts.Remove(post);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}