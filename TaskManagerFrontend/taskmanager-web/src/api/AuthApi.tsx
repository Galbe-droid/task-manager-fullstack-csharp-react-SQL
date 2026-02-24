import axios from 'axios'
import type { LoginUser, RegisterUser } from '../models/User'
import api from './api';

export const login = async(login: LoginUser) => {
    const response = await api.post("Auth/login", login);

    const token = response.data.token;

    localStorage.setItem("token", token);

    api.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;

    return token;
}

export const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"];
}

export const register = async(register: RegisterUser) => {
    try{
        const response = await api.post("Auth/register", register)
        return response.data;;        
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("STATUS:", error.response?.status);
          console.log("DATA:", error.response?.data);
          return null;
        }
    }    
}