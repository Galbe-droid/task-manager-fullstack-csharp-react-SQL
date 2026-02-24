using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Dto.User;
using TaskManager.Service.Interface;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser register)
        {
            await _authService.RegisterAsync(register);

            return Ok();
        }
            
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser login)
        {
            var token = await _authService.LoginAsync(login);

            if (token == null)
            {
                return Unauthorized();
            }   

            return Ok(new { token });
        }
    }
}
