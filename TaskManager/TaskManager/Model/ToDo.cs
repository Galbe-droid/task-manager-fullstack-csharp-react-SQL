using System.ComponentModel.DataAnnotations;

namespace TaskManager.Model
{
    public class ToDo
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTimeOffset Created { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset Updated { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? DateLimit { get; set; } 
        public int Stats { get; set; }
        public bool IsDeleted { get; set; }
        public DateTimeOffset? DeleteAt { get; set; }
        public Guid IdUser { get; set; }
    }
}
