import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import type { ToDo } from "../models/ToDo";
import { deleteToDo, getToDoById } from "../api/ToDoApi";
import { mapFormatDate, mapStatsKey } from "../mappers/mapper";

export default function ViewTaskPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [task, setTask] = useState<ToDo | null>(null);

    useEffect(() => {
        async function load(){
            const data = await getToDoById(id!);
            setTask(data);
        }

        load();
    }, [id])

    const handleDelete = async() => {
        const confirmed = window.confirm(
            "Tem certeza que deseja excluir esta Task ?"
        )

        if(!confirmed) return;

        await deleteToDo(id!)
        navigate("../..", {state: {reload: true}});
    }
    
    if (!task) return <p>Carregando...</p>;

    return(
        <div className="bg-gray-200 flex-1 p-5 items-center">
            <h3 className="text-center text-xl font-bold">Task: {task?.title}</h3>
            <button onClick={() => navigate(`../..`)} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition">Voltar</button>

            <div className="mt-6">
                <p><strong>Descrição:</strong> {task?.description}</p>
                <p><strong>Status:</strong> {mapStatsKey(task?.stats)}</p>
                <p><strong>Criado em:</strong> {mapFormatDate(task.created)}</p>
                <p><strong>Atualizado em:</strong> {mapFormatDate(task.updated)}</p>
                <p><strong>Data Limite:</strong> {mapFormatDate(task.dateLimit)}</p>
            </div>

            <div className="mt-6">
                <button onClick={() => navigate(`/edit/${task.id}`)} className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 transition">Atualizar</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 hover:bg-red-800 transition ml-5">Excluir</button>
            </div>
        </div>
    )
}