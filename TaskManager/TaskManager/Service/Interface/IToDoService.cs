using TaskManager.Dto.ToDo;
using TaskManager.Model;

namespace TaskManager.Service.Interface
{
    public interface IToDoService
    {
        Task<List<ToDo>> GetAllAsync(Guid guid);
        Task<PagedResult<SimpleReturnToDo>> GetAllSimpleAsync(ToDoQueryParams query, Guid guid);
        Task<ToDo?> GetByIdAsync(Guid toDoGuid, Guid userGuid);
        Task<ToDo> CreateAsync(AddToDo addToDo, Guid guid);
        Task<bool> UpdateAsync(Guid toDoGuid, UpdateToDo addToDo, Guid userGuid);
        Task<bool> DeleteAsync(Guid toDoGuid, Guid userGuid);
    }
}
