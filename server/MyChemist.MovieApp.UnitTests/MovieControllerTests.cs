using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using MovieServices.Controllers;
using MyChemist.MovieApp.DataAccess.Interfaces;
using MyChemist.MovieApp.Entities;

namespace MyChemist.MovieApp.UnitTests
{
    [TestClass]
    public class MovieControllerTests
    {
        [TestMethod]
        public void GetByIdReturnsMovieDoesNotExistResponse()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id= 1, CodeName= "test", Gender= "test", Name= "test", Slug= "test" };
            var message = "The movie does not exist";
            movieRepositoryMock.Setup(repo => repo.Get(movie.Id)).Returns(movie);

            // Act
            var result = (ObjectResult)controller.Get(2);

            // Assert
            Assert.AreEqual(message, result.Value, "Get movie by id is not validating non existing movie");
        }

        [TestMethod]
        public void GetByIdReturnsMovie()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id = 1, CodeName = "test", Gender = "test", Name = "test", Slug = "test" };
            movieRepositoryMock.Setup(repo => repo.Get(movie.Id)).Returns(movie);

            // Act
            var result = (ObjectResult)controller.Get(1);
            
            // Assert
            Assert.IsInstanceOfType(result, typeof(OkObjectResult), "Get movie by id is not returning movie");
            Assert.AreEqual(movie, result.Value, "Get movie by id is not returning movie");
        }

        [TestMethod]
        public void CreateMovieReturnsMovieNeedsValueMessage()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var message = "Movie should have a value";

            // Act
            var result = (ObjectResult)controller.Post(null);

            // Assert
            Assert.AreEqual(message, result.Value, "Create movie is not validating null values");
        }

        [TestMethod]
        public void CreateMovieReturnsMovieWCodeNameAlreadyExists()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id = 1, CodeName = "test", Gender = "test", Name = "test", Slug = "test" };
            var movie2 = new Movie() { Id = 2, CodeName = "test", Gender = "test2", Name = "test2", Slug = "test2" };
            var message = "There is already a movie with the same code name";
            movieRepositoryMock.Setup(repo => repo.GetByCodeName(movie.Name)).Returns(movie2);

            // Act
            var result = (ObjectResult)controller.Post(movie);

            // Assert
            Assert.AreEqual(message, result.Value, "Create movie is not validating existing movies with same code name");
        }

        [TestMethod]
        public void CreateMovieReturnsMovieWSlugAlreadyExists()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id = 1, CodeName = "test", Gender = "test", Name = "test", Slug = "test" };
            var movie2 = new Movie() { Id = 2, CodeName = "test2", Gender = "test2", Name = "test2", Slug = "test" };
            var message = "There is already a movie with the same slug";
            movieRepositoryMock.Setup(repo => repo.GetBySlug(movie.Name)).Returns(movie2);

            // Act
            var result = (ObjectResult)controller.Post(movie);

            // Assert
            Assert.AreEqual(message, result.Value, "Create movie is not validating existing movies with same slug");
        }

        [TestMethod]
        public void UpdateMovieReturnsMovieNeedsValueMessage()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var message = "Movie should have a value";

            // Act
            var result = (ObjectResult)controller.Put(1, null);

            // Assert
            Assert.AreEqual(message, result.Value, "Update movie is not validating null values");
        }

        [TestMethod]
        public void UpdateMovieReturnsMovieWCodeNameAlreadyExists()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id = 1, CodeName = "test", Gender = "test", Name = "test", Slug = "test" };
            var movie2 = new Movie() { Id = 2, CodeName = "test", Gender = "test2", Name = "test2", Slug = "test2" };
            var message = "There is already a movie with the same code name";
            movieRepositoryMock.Setup(repo => repo.Get(movie.Id)).Returns(movie);
            movieRepositoryMock.Setup(repo => repo.GetByCodeName(movie.Name)).Returns(movie2);

            // Act
            var result = (ObjectResult)controller.Put(movie.Id, movie);

            // Assert
            Assert.AreEqual(message, result.Value, "Update movie is not validating existing movies with same code name");
        }

        [TestMethod]
        public void UpdateMovieReturnsMovieWSlugAlreadyExists()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id = 1, CodeName = "test", Gender = "test", Name = "test", Slug = "test" };
            var movie2 = new Movie() { Id = 2, CodeName = "test2", Gender = "test2", Name = "test2", Slug = "test" };
            var message = "There is already a movie with the same slug";
            movieRepositoryMock.Setup(repo => repo.Get(movie.Id)).Returns(movie);
            movieRepositoryMock.Setup(repo => repo.GetBySlug(movie.Name)).Returns(movie2);

            // Act
            var result = (ObjectResult)controller.Put(movie.Id, movie);

            // Assert
            Assert.AreEqual(message, result.Value, "Create movie is not validating existing movies with same slug");
        }

        [TestMethod]
        public void DeleteReturnsMovieDoesNotExistResponse()
        {
            // Arrange
            var movieRepositoryMock = new Mock<IMovieRepository>();
            var controller = new MoviesController(movieRepositoryMock.Object);
            var movie = new Movie() { Id = 1, CodeName = "test", Gender = "test", Name = "test", Slug = "test" };
            var message = "The movie does not exist";
            movieRepositoryMock.Setup(repo => repo.Get(movie.Id)).Returns(movie);

            // Act
            var result = (ObjectResult)controller.Delete(2);

            // Assert
            Assert.AreEqual(message, result.Value, "Delete movie is not validating non existing movie");
        }
    }
}
