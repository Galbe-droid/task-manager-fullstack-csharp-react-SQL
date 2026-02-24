using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.Dto.ToDo;
using TaskManager.Middleware.Enums;
using TaskManager.Service.Interface;

namespace TaskManager.Controllers
{
    [ApiController]
    [Route("api/ToDo")]
    public class ToDoController : ControllerBase
    { 
        private readonly IToDoService _toDoService;
        public ToDoController(IToDoService toDoService) { _toDoService = toDoService; }

        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var toDoList = await _toDoService.GetAllAsync(Guid.Parse(userId!));
            return Ok(toDoList);
        }

        [Authorize]
        [HttpGet]
        [Route("simple")]
        public async Task<IActionResult> GetAllSimple([FromQuery] ToDoQueryParams query)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var simpleToDo = await _toDoService.GetAllSimpleAsync(query, Guid.Parse(userId!));
            return Ok(new PagedResult<SimpleReturnToDo> { Items = simpleToDo.Items, TotalCount = simpleToDo.TotalCount});
        }

        [Authorize]
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var todoById = await _toDoService.GetByIdAsync(id, Guid.Parse(userId!));

            if (todoById == null)
            {
                return NotFound();
            }
            return Ok(todoById);
        }

        [Authorize]
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] AddToDo addToDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(addToDo.Stats == 0)
            {
                addToDo.Stats = Stats.EmAndamento;
            }
            var toDo = await _toDoService.CreateAsync(addToDo, Guid.Parse(userId!));

            return Ok(toDo);
        }

        [Authorize]
        [HttpPut]
        [Route("update/{id:guid}")]
        public async Task<IActionResult> Update([FromBody] UpdateToDo updateToDo, Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var toDo = await _toDoService.UpdateAsync(id, updateToDo, Guid.Parse(userId!));

            if(!toDo)
            {
                return NotFound();
            }
            return Ok(toDo);
        }


        [Authorize]
        [HttpDelete]
        [Route("delete/{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var toDo = await _toDoService.DeleteAsync(id, Guid.Parse(userId!));

            if (!toDo)
            {
                return NotFound();
            }

            return Ok(toDo);
        }
    }
}
