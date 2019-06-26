using MyChemist.MovieApp.DataAccess.Context;
using MyChemist.MovieApp.DataAccess.Interfaces;
using MyChemist.MovieApp.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MyChemist.MovieApp.DataAccess.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        ApplicationContext context;

        public MovieRepository(ApplicationContext context) {
            this.context = context;
        }

        public void Add(Movie movie)
        {
            context.Movies.Add(movie);
            context.SaveChanges();
        }

        public IEnumerable<Movie> GetAll()
        {
            return context.Movies.ToList();
        }

        public void Delete(Movie movie)
        {
            context.Movies.Remove(movie);
            context.SaveChanges();
        }

        public void Update(Movie movieToUpdate, Movie movie)
        {
            movieToUpdate.Name = movie.Name;
            movieToUpdate.Slug = movie.Slug;
            movieToUpdate.CodeName = movie.CodeName;
            movieToUpdate.Gender = movie.Gender;
            context.SaveChanges();
        }

        public Movie Get(int id)
        {
            return context.Movies.FirstOrDefault(movie => movie.Id == id);
        }

        public Movie GetByCodeName(string codeName)
        {
            return context.Movies.FirstOrDefault(movie => movie.CodeName == codeName);
        }

        public Movie GetBySlug(string slug)
        {
            return context.Movies.FirstOrDefault(movie => movie.Slug == slug);
        }
    }
}
