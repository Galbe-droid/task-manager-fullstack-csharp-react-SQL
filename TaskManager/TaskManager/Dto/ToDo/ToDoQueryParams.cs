using TaskManager.Middleware.Enums;

namespace TaskManager.Dto.ToDo
{
    public class ToDoQueryParams
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public Stats? Status { get; set; }
        public string? Search { get; set; }
    }
}
