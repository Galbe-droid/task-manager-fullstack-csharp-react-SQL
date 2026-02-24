import type {ToDoStatusValue} from '../enum/Stats.ts'

export interface ToDo {
    id: string,
    title: string,
    description: string,
    created: string,
    updated: string,
    dateLimit: string,
    stats: ToDoStatusValue
}

export interface TodoSimple {
    id: string,
    title: string,
    created: string,
    dateLimit: string,
    stats: ToDoStatusValue
}

export interface CreateToDo {
    title: string,
    description: string,
    dateLimit: string | null,
    stats: number
}

export interface CreateToDoForm{
    title: string;
    description: string;
    dateLimit: string;
    stats: number;
}