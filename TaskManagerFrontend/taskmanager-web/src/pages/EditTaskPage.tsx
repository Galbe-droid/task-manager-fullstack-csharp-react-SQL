import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getToDoById, updateToDo } from "../api/ToDoApi";
import { mapFormToCreateToDo } from "../mappers/mapper";
import ToDoCreationForm from "../components/ToDoForm";
import type { CreateToDoForm } from "../models/ToDo";

export default function EditTaskPage(){
    const navigate = useNavigate();
    const {id} = useParams();

    const [initialData, setInitialData] = useState<CreateToDoForm>();

    useEffect(() => {
        async function load(){
            const data = await getToDoById(id!);

            setInitialData({
                title: data.title,
                description: data.description,
                dateLimit: data.dateLimit?.slice(0, 16) ?? "",
                stats: data.stats
            })
        }

        load();
    }, [id])

    const handleUpdate = async (formData:CreateToDoForm) => {
        const payload = mapFormToCreateToDo(formData);
        await updateToDo(id!, payload);
        navigate("../..", {state: {reload: true}});
    }

    if (!initialData) return <p>Carregando...</p>;

    return(
        <div className="bg-gray-200 flex-1 p-5 items-center">
            <h1 className="text-center text-xl font-bold">Editar Task</h1>
            <button type="button" onClick={() => navigate("/")} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition">Voltar</button>
            <ToDoCreationForm 
                initialData={initialData}
                onSubmit={handleUpdate}
            />
        </div>
    )
}