using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IDSProject.Repository.Models;

[Table("Notification")]
public partial class Notification
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    public int? UserId { get; set; }

    [Column("context")]
    [StringLength(50)]
    [Unicode(false)]
    public string Context { get; set; } = null!;

    [Column("dateSent", TypeName = "datetime")]
    public DateTime? DateSent { get; set; } = DateTime.Now;

    [Column("isRead")]
    public bool IsRead { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("Notifications")]
    public virtual User? User { get; set; }
}
