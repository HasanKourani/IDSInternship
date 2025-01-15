using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IDSProject.DTOs;
using IDSProject.Repository;
using IDSProject.Repository.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace IDSProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDSProjectDbContext dbContext;
        private readonly IConfiguration configuration;
        public UserController(IDSProjectDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }

        [HttpGet("GetUser/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = dbContext.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("GetUsers")]
        public IActionResult GetAllUsers()
        {
            var users = dbContext.Users.ToList();

            return Ok(users);
        }

        [HttpPost("register")]
        public IActionResult Registration([FromBody] UserDTO newUserDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = dbContext.Users.FirstOrDefault(x => x.Email == newUserDTO.Email);

            if (existingUser != null)
            {
                return BadRequest("A user with this email already exists");
            }

            var password = newUserDTO.Password;
            var hashedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(password);
            dbContext.Users.Add(new User
            {
                Email = newUserDTO.Email,
                Username = newUserDTO.Username,
                Password = hashedPassword,
            });
            dbContext.SaveChanges();
            return Ok(newUserDTO);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var checkUser = dbContext.Users.FirstOrDefault(x => x.Email == user.Email);

            if (checkUser == null)
            {
                return BadRequest("Email or Password is incorrect");
            }

            if(!BCrypt.Net.BCrypt.EnhancedVerify(user.Password, checkUser.Password))
            {
                return BadRequest("Password is Wrong!");
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, "SocialAppToken"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("Email", user.Email.ToString()),
                new Claim("Id", checkUser.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(120),
                signingCredentials: signIn
                );

            string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new 
            { 
                Token = tokenValue,
                UserEmail = user.Email,
                Username = checkUser.Username,
                id = checkUser.Id,
                IsAdmin = checkUser.IsAdmin
            });
        }

        [Authorize]
        [HttpPut("EditUser/{id}")]
        public IActionResult EditProfile(int id, [FromBody] UserDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var selectedUser = dbContext.Users.Find(id);
            if (selectedUser == null)
            {
                return NotFound();
            }

            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            if(selectedUser.Id != userId)
            {
                return BadRequest("Can't edit others profiles");
            }

            selectedUser.Username = user.Username;
            selectedUser.Password = user.Password;

            dbContext.SaveChanges();

            return Ok(selectedUser);
        }

        [Authorize]
        [HttpDelete("DeleteUser/{id}")]
        public IActionResult DeleteAccount(int id)
        {


            var selectedUser = dbContext.Users.Find(id);
            if (selectedUser == null)
            {
                return NotFound();
            }

            var userIdClaim = User.FindFirst("Id")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("No userId in token");
            }

            if (selectedUser.Id != userId)
            {
                return BadRequest("Can't delete others profiles");
            }

            dbContext.Users.Remove(selectedUser);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}