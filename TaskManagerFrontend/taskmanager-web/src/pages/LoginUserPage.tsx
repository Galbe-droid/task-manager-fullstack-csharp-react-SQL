import { useState } from "react";
import type { LoginUser } from "../models/User";
import { login } from "../api/AuthApi";
import { useNavigate } from "react-router-dom";

export default function LoginUserPage() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState<LoginUser>({
            email: "",
            password: ""
        });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try
        {
            await login(loginForm);
            navigate("..")
        } 
        catch
        {
            setError("Failed to Login")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setLoginForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="bg-gray-200 flex-1 p-5 items-center">
                <h2 className="text-center text-xl font-bold">Login</h2>
                <div className="flex mt-3 mb-3">
                    <p>Email: </p>
                    <input type="email" placeholder="Email" name="email" id="email" value={loginForm.email} onChange={handleInputChange} required className="ml-2 bg-white w-full"/>
                </div>

                <div className="flex mt-3 mb-3">
                    <p>Password: </p>
                    <input type="password" name="password" id="password" value={loginForm.password} onChange={handleInputChange} required className="ml-2 bg-white w-full"/>
                </div>
                <div className="flex m-5 items-center place-self-center">
                    <div className="bg-gray-800 w-[85px] h-[40px] text-center mr-4 text-white content-center hover:bg-sky-700">
                        <button type="submit">Login</button>
                    </div>
                    <div className="bg-gray-800 w-[85px] h-[40px] text-center mr-4 text-white content-center hover:bg-sky-700">
                        <button type="button" onClick={() => navigate("/register")}>Register</button>
                    </div>
                </div>
                

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center">{error}</p>}
            </div>           
        </form>
    )
}