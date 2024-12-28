using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IDSProject.Repository.Models;

[Table("Post")]
public partial class Post
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public int UserId { get; set; }

    [Column("description")]
    public string Description { get; set; } = null!;

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("image")]
    public string? Image { get; set; }

    [Column("tag")]
    [StringLength(255)]
    public string? Tag { get; set; }

    [Column("categoryId")]
    public int CategoryId { get; set; }

    [Column("datePosted", TypeName = "datetime")]
    public DateTime DatePosted { get; set; }

    [Column("dateUpdated", TypeName = "datetime")]
    public DateTime? DateUpdated { get; set; }

    [ForeignKey("CategoryId")]
    [InverseProperty("Posts")]
    public virtual Category Category { get; set; } = null!;

    [InverseProperty("Post")]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    [ForeignKey("UserId")]
    [InverseProperty("Posts")]
    public virtual User User { get; set; } = null!;

    [InverseProperty("Post")]
    public virtual ICollection<Vote> Votes { get; set; } = new List<Vote>();
}
