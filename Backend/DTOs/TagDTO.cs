using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IDSProject.DTOs
{
    public class TagDTO
    {
        [Column("name")]
        [StringLength(225)]
        [Unicode(false)]
        public string Name { get; set; } = null!;
    }
}
