using AutoMapper;
using TaskManager.Dto.ToDo;
using TaskManager.Dto.User;
using TaskManager.Model;

namespace TaskManager.Mapping
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //To Model
            CreateMap<AddToDo, ToDo>().ReverseMap();
            CreateMap<UpdateToDo, ToDo>().ReverseMap();

            //From Model
            CreateMap<ToDo, SimpleReturnToDo>().ReverseMap();
        }
    }
}
