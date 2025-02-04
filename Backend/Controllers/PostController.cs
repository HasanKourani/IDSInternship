using Backend.Repository;
using Backend.Repository.Models;
using IDSProject.DTOs;
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
            var allPosts = dbContext.Posts
                .Include(p => p.User)
                .Include(p => p.Tag)
                .Select(p => new
            {
                p.Id,
                p.Title,
                p.Description,
                p.Category,
                p.DatePosted,
                p.UserId,
                p.Link,
                p.Code,
                Username = p.User.Username,
                TagName = p.Tag.Name
            }).ToList();

            return Ok(allPosts);
        }

        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = dbContext.Posts
                .Include(p => p.User)
                .Include(p => p.Tag)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Description,
                    p.Category,
                    p.DatePosted,
                    p.UserId,
                    p.Link,
                    p.Code,
                    Username = p.User.Username,
                    TagName = p.Tag.Name
                }).FirstOrDefault();
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetPostByUserId(int userId)
        {
            var posts = dbContext.Posts.Where(x => x.UserId == userId).
                Include(p => p.User).
                Include(p => p.Tag).
                Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Description,
                    p.Category,
                    p.DatePosted,
                    p.UserId,
                    p.Link,
                    p.Code,
                    Username = p.User.Username,
                    TagName = p.Tag.Name
                }).
                ToList();

            if(posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        [HttpGet("search")]
        public IActionResult Search(string searchTerm)
        {
            var posts = dbContext.Posts.Where(p => p.Tag.Name.Contains(searchTerm)
            || p.Category.Contains(searchTerm)
            || p.User.Username.Contains(searchTerm)).
                Include(p => p.User).
                Include(p => p.Tag).
                Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Description,
                    p.Category,
                    p.DatePosted,
                    p.UserId,
                    p.Link,
                    p.Code,
                    Username = p.User.Username,
                    TagName = p.Tag.Name
                }).
                ToList();

            if(!posts.Any())
            {
                NotFound();
            }

            return Ok(posts);
            
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
                TagId = newTag.Id,
                Link = commonDTO.Post.Link,
                Code = commonDTO.Post.Code
            };

            dbContext.Posts.Add(newPost);
            dbContext.SaveChanges();

            return Ok(commonDTO);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult EditPost(int id, [FromBody] PostAndTagDTO common)
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
            var tag = dbContext.Tags.Find(selectedPost.TagId);
            if (tag != null)
            {
                tag.Name = common.Tag.Name;
            } else
            {
                var newTag = new Tag
                {
                    Name = common.Tag.Name
                };
                dbContext.Tags.Add(newTag);
                dbContext.SaveChanges();
                selectedPost.TagId = newTag.Id;
            }


            selectedPost.Title = common.Post.Title;
            selectedPost.Description = common.Post.Description;
            selectedPost.Category = common.Post.Category;
            selectedPost.Image = common.Post.Image;
            selectedPost.Link = common.Post.Link;
            selectedPost.Code = common.Post.Code;
            dbContext.SaveChanges();

            return Ok(common);
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