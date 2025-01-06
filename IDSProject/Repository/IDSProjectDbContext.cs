using System;
using System.Collections.Generic;
using IDSProject.Repository.Models;
using Microsoft.EntityFrameworkCore;

namespace IDSProject.Repository;

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

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Tag> Tags { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Vote> Votes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=hasanz-pc\\SQLEXPRESS;Initial Catalog=IDSProjectDatabase;Integrated Security=True;Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Comment__3213E83F899C4E12");

            entity.Property(e => e.DateCommented).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Post).WithMany(p => p.Comments).HasConstraintName("FK__Comment__postId__5812160E");

            entity.HasOne(d => d.User).WithMany(p => p.Comments).HasConstraintName("FK__Comment__userId__59063A47");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Notifica__3213E83F0EFA75D0");

            entity.Property(e => e.DateSent).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.User).WithMany(p => p.Notifications).HasConstraintName("FK__Notificat__userI__534D60F1");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Post__3213E83F9ADC996D");

            entity.Property(e => e.DatePosted).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Tag).WithMany(p => p.Posts).HasConstraintName("FK__Post__tagId__4F7CD00D");

            entity.HasOne(d => d.User).WithMany(p => p.Posts).HasConstraintName("FK__Post__userId__4E88ABD4");
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tag__3213E83FDC802443");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3213E83FE49298F9");
        });

        modelBuilder.Entity<Vote>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Vote__3213E83F32F6D551");

            entity.HasOne(d => d.Post).WithMany(p => p.Votes).HasConstraintName("FK__Vote__postId__5DCAEF64");

            entity.HasOne(d => d.User).WithMany(p => p.Votes).HasConstraintName("FK__Vote__userId__5CD6CB2B");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
