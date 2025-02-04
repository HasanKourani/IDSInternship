using System;
using System.Collections.Generic;
using Backend.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository;

public partial class IDSProjectDbContext : DbContext
{
    public IDSProjectDbContext()
    {
    }

    public IDSProjectDbContext(DbContextOptions<IDSProjectDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=hasanz-pc\\sqlexpress;Initial Catalog=IDSDatabase;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Comment__3213E83F059806FF");

            entity.HasOne(d => d.Post).WithMany(p => p.Comments)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Comment__postId__52593CB8");

            entity.HasOne(d => d.User).WithMany(p => p.Comments).HasConstraintName("FK__Comment__userId__5165187F");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Post__3213E83FD02A4E6A");

            entity.HasOne(d => d.Tag).WithMany(p => p.Posts)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Post__tagId__412EB0B6");

            entity.HasOne(d => d.User).WithMany(p => p.Posts)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Post__userId__403A8C7D");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tag__3213E83FFFF5C2A2");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3213E83FD93576B5");

            entity.Property(e => e.Points).HasDefaultValue(0L);
            entity.Property(e => e.Role).HasDefaultValue("User");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
