using IDSProject.DTOs;
using IDSProject.Repository;
using IDSProject.Repository.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IDSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;
        public UserController(IDSProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = dbContext.Users.Find(id);
            if(user== null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("register")]
        public IActionResult Registration([FromBody] UserDTO newUserDTO)
        {
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }

            var existingUser = dbContext.Users.FirstOrDefault(x => x.Email == newUserDTO.Email);

            if (existingUser!=null)
            {
                return BadRequest("A user with this email already exists");
            }
            dbContext.Users.Add(new User
            {
                Email = newUserDTO.Email,
                Username = newUserDTO.Username,
                Password = newUserDTO.Password
            });
            dbContext.SaveChanges();
            return Ok(newUserDTO);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var checkEmail = dbContext.Users.FirstOrDefault(x => x.Email == user.Email);
            var checkPassword = dbContext.Users.FirstOrDefault(y => y.Password== user.Password);

            if(checkEmail==null)
            {
                return BadRequest("This email doesn't exist.");
            }
            if(checkPassword==null)
            {
                return BadRequest("Password is incorrect!");
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult EditProfile(int id, [FromBody] UserDTO user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var selectedUser = dbContext.Users.Find(id);
            if(selectedUser==null)
            {
                return NotFound();
            }

            selectedUser.Username = user.Username;
            selectedUser.Password = user.Password;

            dbContext.SaveChanges();

            return Ok(selectedUser);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAccount(int id)
        {
            var selectedUser = dbContext.Users.Find(id);
            if(selectedUser==null)
            {
                return NotFound();
            }
            dbContext.Users.Remove(selectedUser);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}
