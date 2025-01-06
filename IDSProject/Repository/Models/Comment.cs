using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IDSProject.Repository.Models;

[Table("Comment")]
public partial class Comment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("context")]
    public string? Context { get; set; }

    [Column("postId")]
    public int? PostId { get; set; }

    [Column("userId")]
    public int? UserId { get; set; }

    [Column("dateCommented", TypeName = "datetime")]
    public DateTime? DateCommented { get; set; }

    [ForeignKey("PostId")]
    [InverseProperty("Comments")]
    public virtual Post? Post { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Comments")]
    public virtual User? User { get; set; }
}
