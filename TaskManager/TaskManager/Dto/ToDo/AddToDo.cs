using System.ComponentModel.DataAnnotations;
using TaskManager.Middleware.Enums;

namespace TaskManager.Dto.ToDo
{
    public class AddToDo
    {
        [Required]
        [MinLength(3, ErrorMessage = "Title has to be minimum of three characters")]
        [MaxLength(30, ErrorMessage = "Title has to be maximum of thirty characters")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MaxLength(250, ErrorMessage = "Title has to be maximum of thirty characters")]
        public string Description { get; set; } = string.Empty;
        public DateTimeOffset? DateLimit { get; set; }
        [Required]
        public Stats Stats { get; set; }
    }
}
