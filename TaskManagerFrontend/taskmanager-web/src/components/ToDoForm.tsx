import React, {useState} from "react";
import type { CreateToDoForm } from "../models/ToDo";
import { ToDoStatus, type ToDoStatusKey, type ToDoStatusValue } from "../enum/Stats";

interface ToDoFormProps {
    initialData: CreateToDoForm;
    onSubmit: (data: CreateToDoForm) => Promise<void>;
}

const ToDoCreationForm: React.FC<ToDoFormProps> = ({initialData, onSubmit}: ToDoFormProps) => {
    const [formData, setFormData] = useState<CreateToDoForm>(initialData);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkingSubmit();

        await onSubmit(formData);
    }

    const checkingSubmit = () => {
        const checkForm = {...formData}
        if(formData.stats == 0){
            checkForm.stats = 2
            setFormData(checkForm)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex-1 mt-3 mb-3">
            <div className="flex mt-3 mb-3">
                <label htmlFor="title">Titulo:</label>
                <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required className="ml-2 bg-white w-full"/>
            </div>
            <div className="flex mt-3 mb-3">
                <label htmlFor="description">Descrição:</label>
                <textarea name="description" id="description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="ml-2 bg-white w-full"/>
            </div>
            <div>
                <label htmlFor="Data Limite">Data Limite:</label>
                <input type="datetime-local" name="dateLimit" id="dateLimit" value={formData.dateLimit.toString()} onChange={handleInputChange} className="ml-2 bg-white "/>
            </div>
            <div>
                <label htmlFor="stats">Estado: </label>            
                {(Object.entries(ToDoStatus) as [ToDoStatusKey, ToDoStatusValue][]).map(([label, value]) => (
                    <div key={value}>                    
                        <input type="radio" name="stats" id={label} value={value}  onChange={handleInputChange}/>
                        <label htmlFor={label}>{label}</label>
                    </div>
                ))}  
            </div>   
            <button type="submit" className="bg-gray-800 w-[85px] h-[40px] text-center mr-4 text-white content-center hover:bg-sky-700 mt-5">Adicionar</button>       
        </form>
    )
}

export default ToDoCreationForm;