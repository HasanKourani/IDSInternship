using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.Models;

[Table("Post")]
public partial class Post
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public int? UserId { get; set; }

    [Column("description")]
    public string Description { get; set; } = null!;

    [Column("title")]
    public string Title { get; set; } = null!;

    [Column("image", TypeName = "text")]
    public string? Image { get; set; }

    [Column("category")]
    [StringLength(255)]
    [Unicode(false)]
    public string Category { get; set; } = null!;

    [Column("tagId")]
    public int? TagId { get; set; }

    [Column("datePosted", TypeName = "datetime")]
    public DateTime? DatePosted { get; set; }

    [Column("dateUpdated", TypeName = "datetime")]
    public DateTime? DateUpdated { get; set; }

    [Column("link", TypeName = "text")]
    public string? Link { get; set; }

    [Column("code")]
    public string? Code { get; set; }

    [InverseProperty("Post")]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    [ForeignKey("TagId")]
    [InverseProperty("Posts")]
    public virtual Tag? Tag { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Posts")]
    public virtual User? User { get; set; }
}
