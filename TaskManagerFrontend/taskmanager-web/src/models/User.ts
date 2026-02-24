import type { ToDo } from "./ToDo";

export interface User{
    id:string,
    email:string,
    password:string,
    createAt:string,
    name:string,
    toDos: ToDo[]
}

export interface RegisterUser{
    email:string,
    password:string,
    name:string
}

export interface LoginUser{
    email:string,
    password:string
}