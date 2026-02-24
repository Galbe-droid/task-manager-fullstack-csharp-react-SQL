import type {CreateToDo} from "../models/ToDo";
import type { CreateToDoForm } from "../models/ToDo";
import { ToDoStatus } from "../enum/Stats";

export function mapFormToCreateToDo(
  form: CreateToDoForm
): CreateToDo {
  return {
    title: form.title.trim(),
    description: form.description.trim(),
    stats: Number(form.stats),
    dateLimit: form.dateLimit ? new Date(form.dateLimit).toISOString() : null
  };
}

export function mapFormatDate(dateIso?: string | null) {
    if(!dateIso) return "-";

    return new Date(dateIso).toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
} 

export function mapStatsKey(value: number) {
  const entry = Object.entries(ToDoStatus).find(([,v]) => Number(v) === value);
  return entry ? entry[0] : "Desconhecido";
}