using IDSProject.DTOs;
using IDSProject.Repository;
using IDSProject.Repository.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IDSProject.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;

        public PostController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            var allPosts = dbContext.Posts.
                Include(p => p.User)
                .Include(p => p.Tag)
                .Select(p => new
            {
                p.Id,
                p.Title,
                p.Description,
                p.Category,
                p.DatePosted,
                Username = p.User.Username,
                TagName = p.Tag.Name
            }).ToList();

            return Ok(allPosts);
        }

        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = dbContext.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public IActionResult CheckNewPost([FromBody] PostAndTagDTO commonDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userIdClaim = User.FindFirst("Id")?.Value;

            if(string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            var newTag = new Tag
            {
                Name = commonDTO.Tag.Name
            };

            dbContext.Tags.Add(newTag);
            dbContext.SaveChanges();

            var newPost = new Post
            {
                Description = commonDTO.Post.Description,
                Title = commonDTO.Post.Title,
                Category = commonDTO.Post.Category,
                Image = commonDTO.Post.Image,
                UserId = userId,
                TagId = newTag.Id
            };

            dbContext.Posts.Add(newPost);
            dbContext.SaveChanges();

            return Ok(commonDTO);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult EditPost(int id, [FromBody] Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            var selectedPost = dbContext.Posts.Find(id);
            if (selectedPost == null)
            {
                return NotFound();
            }

            if (selectedPost.UserId != userId)
            {
                return BadRequest("Can't edit others' posts");
            }

            selectedPost.Title = post.Title;
            selectedPost.Description = post.Description;
            selectedPost.TagId = post.TagId;
            selectedPost.Category = post.Category;
            selectedPost.DateUpdated = DateTime.Now;
            dbContext.SaveChanges();

            return Ok(selectedPost);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            var post = dbContext.Posts.Find(id);

            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            if (post == null)
            {
                return NotFound();
            }

            if (post.UserId != userId)
            {
                return BadRequest("Can't delete others' posts");
            }

            dbContext.Posts.Remove(post);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}