using TaskManager.Dto.User;
using TaskManager.Model;

namespace TaskManager.Service.Interface
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterUser register);
        Task<string?> LoginAsync(LoginUser login);
    }
}
