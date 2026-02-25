import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Layout() {
    return(
        <div className="max-h-full g-gradient-to-br from-gray-100 to-gray-200 flex-1 justify-items-center items-start pt-10">
            <div className="w-full max-w-5xl h-[600px] bg-white rounded-2xl shadow-2xl p-5 flex overflow-hidden">
                <div className="flex">
                    <Sidebar/>
                </div>
                <div className="flex-1 p-8 bg-gray-50">
                    <Outlet/>
                </div>      
            </div>
            <footer className="flex-1 justify-items-center">
                    <h5>Projetado por: Gabriel Lima Bertoldo</h5>
                    <h5>Host Gratuito Render, o servidor por estar dormente fazendo com que certas ações demorem mais tempo que o normal</h5>
            </footer> 
        </div>
    )
}