using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.DTOs;
using Backend.Repository;
using Backend.Repository.Models;
using IDSProject.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace IDSProject.Controllers
{
    [Route("api/users")]
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

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = dbContext.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet]
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
            var takenUsername = dbContext.Users.FirstOrDefault(x => x.Username == newUserDTO.Username);

            if (existingUser != null)
            {
                return BadRequest(new { Error = "A user with this email already exists." });
            }
            
            if (takenUsername != null)
            {
                return BadRequest(new { Error = "Username Already Taken." });
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
                return Unauthorized("Email or Password is incorrect");
            }

            if(!BCrypt.Net.BCrypt.EnhancedVerify(user.Password, checkUser.Password))
            {
                return Unauthorized("Password is Wrong!");
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, checkUser.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, checkUser.Role),
                new Claim("Id", checkUser.Id.ToString()),
                new Claim("Username", checkUser.Username),
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
                token = tokenValue,
                userEmail = user.Email,
                username = checkUser.Username,
                id = checkUser.Id,
                role = checkUser.Role
            });
        }

        [Authorize]
        [HttpPut("addBio/{id}")]
        public IActionResult AddBio(int id, [FromBody] UserBioDTO bio)
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

            selectedUser.Bio = bio.Bio;

            dbContext.SaveChanges();

            return Ok(selectedUser);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult EditProfile(int id, [FromBody] UserBioDTO user)
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
            selectedUser.Bio = user.Bio;

            dbContext.SaveChanges();

            return Ok(selectedUser);
        }

        [Authorize]
        [HttpDelete("{id}")]
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