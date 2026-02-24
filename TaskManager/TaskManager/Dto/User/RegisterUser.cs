using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dto.User
{
    public class RegisterUser
    {
        [Required]
        [EmailAddress]     
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        [MinLength(3, ErrorMessage = "Name has to be minimum of three characters")]
        [MaxLength(15, ErrorMessage = "Name has to be maximum of fifwteen characters")]
        public string Name { get; set; } = string.Empty; 
    }
}
