using System.ComponentModel.DataAnnotations.Schema;

namespace IDSProject.DTOs
{
    public class VoteDTO
    {
        [Column("voteType")]
        public bool VoteType { get; set; }
    }
}
