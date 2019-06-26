using MyChemist.MovieApp.Entities;
using System.Collections.Generic;

namespace MyChemist.MovieApp.DataAccess.Interfaces
{
    public interface IMovieRepository
    {
        void Add(Movie movie);
        void Delete(Movie movie);
        void Update(Movie movieToUpdate, Movie movie);
        IEnumerable<Movie> GetAll();
        Movie Get(int id);
        Movie GetByCodeName(string codeName);
        Movie GetBySlug(string slug);
    }
}
