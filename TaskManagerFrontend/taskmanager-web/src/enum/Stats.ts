export const ToDoStatus = {"Pronto": 0, "Em Andamento": 1, "Pendente": 2, "Pausado": 3,} as const;

export type ToDoStatus = typeof ToDoStatus;
export type ToDoStatusKey = keyof typeof ToDoStatus;
export type ToDoStatusValue = typeof ToDoStatus[ToDoStatusKey];