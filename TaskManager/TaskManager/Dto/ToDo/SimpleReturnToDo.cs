using System.ComponentModel.DataAnnotations;
using TaskManager.Middleware.Enums;

namespace TaskManager.Dto.ToDo
{
    public class SimpleReturnToDo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset? DateLimit { get; set; }
        public Stats Stats { get; set; }
    }
}
