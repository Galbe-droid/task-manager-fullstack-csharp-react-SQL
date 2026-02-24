using Microsoft.EntityFrameworkCore;
using TaskManager.Model;

namespace TaskManager.Data
{
    public class ToDoDBContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ToDo>()
                .HasQueryFilter(t => !t.IsDeleted);
        }
        public ToDoDBContext(DbContextOptions<ToDoDBContext> options): base(options)
        {
            
        }

        public DbSet<ToDo> ToDos { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
