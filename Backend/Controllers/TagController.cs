using Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IDSProject.Controllers
{
    [Route("api/tags")]
    [ApiController]
    public class TagController : ControllerBase
    {

        private readonly IDSProjectDbContext dbContext;

        public TagController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTags()
        {
            var tags = dbContext.Tags.ToList();

            return Ok(tags);
        }

        [HttpGet("{id}")]
        public IActionResult GetTag(int id)
        {
            var tag = dbContext.Tags.Find(id);
            if(tag == null)
            {
                return NotFound();
            }

            return Ok(tag);
        }
    }
}
