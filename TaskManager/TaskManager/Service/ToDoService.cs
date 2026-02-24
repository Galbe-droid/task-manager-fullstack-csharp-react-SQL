using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Dto.ToDo;
using TaskManager.Model;
using TaskManager.Service.Interface;

namespace TaskManager.Service
{
    public class ToDoService : IToDoService
    {
        public readonly IMapper _mapper;
        private readonly ToDoDBContext _dbContext;

        public ToDoService(IMapper mapper, ToDoDBContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<List<ToDo>> GetAllAsync(Guid Guid)
        {
            var toDos = await _dbContext.ToDos.AsNoTracking().Where(x => x.IdUser == Guid).ToListAsync();

            return toDos;
        }

        public async Task<PagedResult<SimpleReturnToDo>> GetAllSimpleAsync(ToDoQueryParams query, Guid guid)
        {
            PagedResult<SimpleReturnToDo> pagedResult = new();
            var toDosSimple = _dbContext.ToDos.AsQueryable().Where(x => x.IdUser == guid);

            if (query.Status.HasValue)
            {
                toDosSimple = toDosSimple.Where(t => t.Stats == (int)query.Status.Value);
            }

            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                toDosSimple = toDosSimple.Where(t => t.Title.Contains(query.Search));
            }

            var totalCount = await toDosSimple.CountAsync();

            var items = await toDosSimple
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .ToListAsync();

            Console.WriteLine($"PageNumber: {query.PageNumber}");
            Console.WriteLine($"PageSize: {query.PageSize}");

            foreach (ToDo toDo in items)
            {
                pagedResult.Items.Add(_mapper.Map<SimpleReturnToDo>(toDo));
            }

            pagedResult.TotalCount = totalCount;

            return pagedResult;
        }

        public async Task<ToDo?> GetByIdAsync(Guid toDoGuid, Guid userGuid)
        {
            return await _dbContext.ToDos.FirstOrDefaultAsync(x => x.Id == toDoGuid && x.IdUser == userGuid);
        }      

        public async Task<ToDo> CreateAsync(AddToDo addToDo, Guid guid)
        {
            if (string.IsNullOrEmpty(addToDo.Title))
            {
                throw new ArgumentException("Title is required");
            }

            var todo = _mapper.Map<ToDo>(addToDo);

            todo.IdUser = guid;

            _dbContext.ToDos.Add(todo);
            await _dbContext.SaveChangesAsync();
            return todo;
        }

        public async Task<bool> DeleteAsync(Guid toDoGuid, Guid userGuid)
        {
            var toDo = await _dbContext.ToDos.FirstOrDefaultAsync(x => x.Id == toDoGuid && x.IdUser == userGuid);

            if (toDo == null)
            {
                return false;
            }

            toDo.IsDeleted = true;
            toDo.DeleteAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(Guid toDoGuid, UpdateToDo addToDo, Guid userGuid)
        {
            var existingToDo = await _dbContext.ToDos.FirstOrDefaultAsync(x => x.Id == toDoGuid && x.IdUser == userGuid);
            if (existingToDo == null)
            {
                return false;
            }
            _mapper.Map(addToDo, existingToDo);
            existingToDo.Updated = DateTimeOffset.UtcNow;

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
