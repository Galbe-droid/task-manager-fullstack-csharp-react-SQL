import axios from 'axios'
import type PagedResult from '../models/PagedResult';
import type { TodoSimple, ToDo, CreateToDo } from '../models/ToDo';
import api from './api';

export const getToDos = async() :  Promise<ToDo[]> => {
  const response = await api.get("/ToDo");
  return response.data
}

export const getReducedToDo = async(
  page: number,
  status?: number,
  search?: string
) :   Promise<PagedResult<TodoSimple>> => {
  return await api.get("/ToDo/simple", {
    params: {
      pageNumber: page,
      pageSize: 5,
      status,
      search
    }
  }).then(res => res.data);
}

export const getToDoById = async(id: string) : Promise<ToDo> => {
  const response = await api.get<ToDo>(`/ToDo/${id}`);
  return response.data 
}

export const createToDos = async(addToDo: CreateToDo) : Promise<CreateToDo | null> => {
  try {
      const response = await api.post<CreateToDo>("/ToDo/create", addToDo, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      return null;
    }
  }
  return null;
}

export const updateToDo = async(id: string, updateForm: CreateToDo) : Promise<CreateToDo | null> => {
  try {
      const response = await api.put(`/ToDo/update/${id}`, updateForm, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      return null;
    }
  }
  return null;
}

export const deleteToDo = async(id: string) => {
  await api.delete(`/ToDo/delete/${id}`)
}