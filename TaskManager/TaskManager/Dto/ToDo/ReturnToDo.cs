using TaskManager.Middleware.Enums;

namespace TaskManager.Dto.ToDo
{
    public class ReturnToDo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset Updated { get; set; } 
        public DateTimeOffset? DateLimit { get; set; }
        public Stats Stats { get; set; }
    }
}
