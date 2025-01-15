using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace IDSProject.DTOs
{
    public class PostDTO
    {
        [Column("description")]
        public string Description { get; set; } = null!;

        [Column("title")]
        public string Title { get; set; } = null!;

        [Column("image")]
        public string? Image { get; set; }

        [Column("category")]
        public string Category { get; set; } = null!;
    }
}
