using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.DTOs
{
    public class UserBioDTO
    {


        [Column("username")]
        [StringLength(255)]
        [Unicode(false)]
        public string Username { get; set; } = null!;


        [Column("bio")]
        public string? Bio { get; set; }
    }
}
