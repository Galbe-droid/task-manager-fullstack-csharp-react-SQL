import { useState, useEffect } from "react";
import { getReducedToDo, getToDos } from "../api/ToDoApi";
import { type ToDo, type TodoSimple } from "../models/ToDo";

export function ListTodo() {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadToDos();
    }, [])

    const loadToDos = async () => {
        try{
            const data = await getToDos();
            setTodos(data);
        } catch {
            setError("Error ao carregar as Tasks");
        } finally {
            setLoading(false);
        }
    }

    return{todos, loading, error, reload: loadToDos}
} 

export function SimpleListTodo() {
    const [simpleTodos, setSimnpleTodos] = useState<TodoSimple[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<number | undefined>(undefined);

    const pageSize = 5;

    useEffect(() => {
        console.log("useEffect disparou");
        loadToDos();
    }, [page, status, search])

    const loadToDos = async () => {
        try{
            const data = await getReducedToDo(page, status, search);
            console.log("RESULT:", data);
            console.log("totalCount:", data.totalCount);
            setSimnpleTodos(data.items ?? data);
            setTotalCount(data.totalCount);
        } catch(err) {
            console.error("ERRO:", err);
            setError("Error ao carregar as Tasks");
        } finally {
            setLoading(false);
        }
    }

    return{
        simpleTodos,
        loading,
        error,
        page,
        totalCount,
        pageSize,
        setPage,
        setSearch,
        setStatus,
        reload: loadToDos         
}
}