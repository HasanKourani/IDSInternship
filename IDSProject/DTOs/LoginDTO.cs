using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IDSProject.DTOs
{
    public class LoginDTO
    {
        [Column("email")]
        [StringLength(255)]
        [Unicode(false)]
        public string Email { get; set; } = null!;

        [Column("password")]
        [StringLength(225)]
        [Unicode(false)]
        public string Password { get; set; } = null!;
    }
}
