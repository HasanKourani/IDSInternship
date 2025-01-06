using System.ComponentModel.DataAnnotations.Schema;

namespace IDSProject.DTOs
{
    public class VoteDTO
    {
        [Column("voteType")]
        public bool VoteType { get; set; }

        [Column("userId")]
        public int? UserId { get; set; }

        [Column("postId")]
        public int? PostId { get; set; }
    }
}
