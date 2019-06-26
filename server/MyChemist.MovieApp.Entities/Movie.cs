using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyChemist.MovieApp.Entities
{
    public class Movie
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(70)]
        public string Name { get; set; }
        [Required]
        [MaxLength(20)]
        public string Gender { get; set; }
        [Required]
        [MaxLength(50)]
        public string Slug { get; set; }
        [Required]
        [MaxLength(10)]
        public string CodeName { get; set; }
    }
}
