using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace IDSProject.DTOs
{
    public class CommentDTO
    {
        [Column("context")]
        [Unicode(false)]
        public string Context { get; set; } = null!;

        [Column("postId")]
        public int? PostId { get; set; }

        [Column("userId")]
        public int? UserId { get; set; }
    }
}
