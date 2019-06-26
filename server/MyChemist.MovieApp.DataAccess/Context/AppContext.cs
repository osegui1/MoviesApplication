using Microsoft.EntityFrameworkCore;
using MyChemist.MovieApp.Entities;

namespace MyChemist.MovieApp.DataAccess.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<Movie>().HasIndex(movie => movie.Slug).IsUnique();
            builder.Entity<Movie>().HasIndex(movie => movie.CodeName).IsUnique();
        }

    }
}
