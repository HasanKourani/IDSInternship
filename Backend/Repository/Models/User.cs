using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.Models;

[Table("User")]
[Index("Email", Name = "UQ__User__AB6E6164E9B411EA", IsUnique = true)]
[Index("Username", Name = "UQ__User__F3DBC572CEFB9EC2", IsUnique = true)]
public partial class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("email")]
    [StringLength(255)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("username")]
    [StringLength(255)]
    [Unicode(false)]
    public string Username { get; set; } = null!;

    [Column("password")]
    [StringLength(255)]
    [Unicode(false)]
    public string Password { get; set; } = null!;

    [Column("role")]
    [StringLength(255)]
    [Unicode(false)]
    public string? Role { get; set; }

    [Column("dateCreated", TypeName = "datetime")]
    public DateTime? DateCreated { get; set; }

    [Column("points")]
    public long? Points { get; set; }

    [Column("bio")]
    public string? Bio { get; set; }

    [Column("profilePicture", TypeName = "text")]
    public string? ProfilePicture { get; set; }

    [InverseProperty("User")]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    [InverseProperty("User")]
    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
}
