using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Dto.User;
using TaskManager.Model;
using TaskManager.Service.Interface;

namespace TaskManager.Service
{
    public class AuthService : IAuthService
    {
        private readonly ToDoDBContext _dbContext;
        private readonly PasswordHasher<User> _hasher;
        private readonly JwtService _jwtService;

        public AuthService(ToDoDBContext dBContext, JwtService jwtService)
        {
            _dbContext = dBContext;
            _hasher = new PasswordHasher<User>();
            _jwtService = jwtService;
        }

        public async Task<string?> LoginAsync(LoginUser login)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == login.Email);

            if (user == null)
            {
                return null;
            }

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, login.Password);

            if(result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return _jwtService.GenerateToken(user);
        }

        public async Task RegisterAsync(RegisterUser register)
        {
            var exists = await _dbContext.Users.AnyAsync(x => x.Email == register.Email);

            if (exists) 
            {
                throw new Exception("Email exists");
            }

            var user = new User
            {
                Email = register.Email,
                Name = register.Name
            };

            user.PasswordHash = _hasher.HashPassword(user, register.Password);

            _dbContext.Users.Add(user);

            await _dbContext.SaveChangesAsync();
        }
    }
}
