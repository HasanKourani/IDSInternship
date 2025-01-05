using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IDSProject.Repository.Models;

[Table("Vote")]
public partial class Vote
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public int? UserId { get; set; }

    [Column("postId")]
    public int? PostId { get; set; }

    [Column("commentId")]
    public int? CommentId { get; set; }

    [Column("voteType")]
    public bool VoteType { get; set; }

    [ForeignKey("CommentId")]
    [InverseProperty("Votes")]
    public virtual Comment? Comment { get; set; }

    [ForeignKey("PostId")]
    [InverseProperty("Votes")]
    public virtual Post? Post { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Votes")]
    public virtual User? User { get; set; }
}
