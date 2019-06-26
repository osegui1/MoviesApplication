using Microsoft.AspNetCore.Mvc;
using MyChemist.MovieApp.DataAccess.Interfaces;
using MyChemist.MovieApp.Entities;
using System.Collections.Generic;

namespace MovieServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository movieRepository;

        public MoviesController(IMovieRepository movieRepository)
        {
            this.movieRepository = movieRepository;
        }

        // GET api/movies
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable <Movie> movies = movieRepository.GetAll();
            return Ok(movies);
        }

        // GET api/movies/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var movie = movieRepository.Get(id);

            if (movie == null)
            {
                return NotFound("The movie does not exist");
            }

            return Ok(movie);
        }

        // POST api/movies
        [HttpPost]
        public IActionResult Post([FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (movie == null)
            {
                return BadRequest("Movie should have a value");
            }

            var result = ValidateMovie(movie);

            if (result != null)
            {
                return result;
            }

            movieRepository.Add(movie);
            return CreatedAtRoute("Get", new { movie.Id }, movie);
        }

        // PUT: api/movies/Movie/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (movie == null)
            {
                return BadRequest("Movie should have a value");
            }

            var movieToUpdate = movieRepository.Get(id);

            if (movieToUpdate == null)
            {
                return NotFound("The movie does not exist");
            }

            var result = ValidateMovie(movie, id);

            if (result != null)
            {
                return result;
            }

            movieRepository.Update(movieToUpdate, movie);
            return NoContent();
        }

        // DELETE: api/movies/Movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = movieRepository.Get(id);

            if (movie == null)
            {
                return NotFound("The movie does not exist");
            }

            movieRepository.Delete(movie);
            return NoContent();
        }

        private IActionResult ValidateMovie(Movie movie, int? id = null)
        {
            var movieTmp = movieRepository.GetByCodeName(movie.CodeName);
            var movieTmp2 = movieRepository.GetBySlug(movie.Slug);

            if (movieTmp != null && ((id == null && movieTmp.Id != movie.Id) || (id > 0 && movieTmp.Id != id)))
            {
                return BadRequest("There is already a movie with the same code name");
            }
            if (movieTmp2 != null && ((id == null && movieTmp2.Id != movie.Id) || (id > 0 && movieTmp2.Id != id)))
            {
                return BadRequest("There is already a movie with the same slug");
            }

            return null;
        }
    }
}
