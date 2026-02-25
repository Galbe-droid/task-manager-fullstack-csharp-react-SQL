import { useNavigate } from "react-router-dom";
import type { RegisterUser } from "../models/User";
import { useState } from "react";
import { register } from "../api/AuthApi";

export default function RegisterUserPage() {
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState<RegisterUser>({
            email: "",
            password: "",
            name: ""
        });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try
        {
            await register(registerForm);
            navigate("/login")
        } 
        catch
        {
            setError("Failed to Register")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setRegisterForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div className="bg-gray-200 flex-1 p-5 items-center">
                <h2 className="text-center text-xl font-bold">Registro</h2>
                <div className="flex mt-3 mb-3">
                    <p>Email: </p>
                    <input type="email" placeholder="Email" name="email" id="email" value={registerForm.email} onChange={handleInputChange} required className="ml-2 bg-white w-full"/>
                </div>

                <div className="flex mt-3 mb-3">
                    <p>Nome: </p>
                    <input type="text" placeholder="Nome" name="name" id="name" value={registerForm.name} onChange={handleInputChange} required className="ml-2 bg-white w-full"/>
                </div>

                <div className="flex mt-3 mb-3">
                    <p>Password: </p>
                    <input type="password" name="password" id="password" value={registerForm.password} onChange={handleInputChange} required className="ml-2 bg-white w-full"/>
                </div>

                <div className="flex m-5 items-center place-self-center">
                    <div className="bg-gray-800 w-[85px] h-[40px] text-center mr-4 text-white content-center hover:bg-sky-700">
                        <button type="submit">Registar</button>
                    </div>
                </div>
                

                {error && <p className="text-center">{error}</p>}
            </div>           
        </form>
    )
}