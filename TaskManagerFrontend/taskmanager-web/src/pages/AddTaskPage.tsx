import { useNavigate } from "react-router-dom";
import ToDoCreationForm from "../components/ToDoForm";
import { mapFormToCreateToDo } from "../mappers/mapper";
import { createToDos } from "../api/ToDoApi";
import { ToDoStatus } from "../enum/Stats";
import type { CreateToDoForm } from "../models/ToDo";

export default function AddTaskPage(){
    const navigate = useNavigate();

    const handleCreate = async(formData: CreateToDoForm) => {
        const payload = mapFormToCreateToDo(formData);
        await createToDos(payload);
        navigate("../..", {state: {reload: true}});
        
    }

    return(
        <div className="bg-gray-200 flex-1 p-5 items-center">
            <h1 className="text-center text-xl font-bold">Nova Task</h1>
            <ToDoCreationForm 
                initialData={{
                    title: '',
                    description: '',
                    dateLimit: '',
                    stats: ToDoStatus["Em Andamento"] 
                }}
                onSubmit={handleCreate}
            />
        </div>
    )
}