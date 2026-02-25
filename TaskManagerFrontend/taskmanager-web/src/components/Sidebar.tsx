import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/AuthService";
import { logout } from "../api/AuthApi";
import "./Sidebar.css"

const linkStyle = ({isActive} : {isActive: boolean}) => ({
    padding: "0.75rem 1rem",
    display: "block",
    textDecoration: "none",
    color: isActive ? "#fff" : "#ccc",
    background: isActive ? "#0e328173" : "transparent",
});

export default function Sidebar(){
    const navigate = useNavigate();

    return(
        <aside className="w-64 bg-gray-800 text-white">
            <h3 className="textSeparator">Usuario</h3>
            {!isAuthenticated() && (
                <>
                    <div className="hover:bg-sky-700">
                        <NavLink className="button" to="/login" style={linkStyle}>
                            Login
                        </NavLink>
                    </div>
                    <div className="hover:bg-sky-700">
                        <NavLink className="button" to="/register" style={linkStyle}>
                            Register
                        </NavLink>
                    </div>
                </>
            )}

            {isAuthenticated() && (
                <>
                    <div className="button pt-5 pb-5 hover:bg-sky-700">
                        <button type="button"  onClick={() => {logout();
                                                              navigate("/");
                                                             }}>Logout</button>
                    </div>
                </>
            )}
            

            <div>
                <h3 className="textSeparator">Task Manager</h3>
                <nav>
                    <div className="button">
                        <NavLink to="/" style={linkStyle}>
                        Dashboard
                        </NavLink>
                    </div>

                    <div className="button">
                        <NavLink to="/todos/add" style={linkStyle}>
                        Nova Task
                        </NavLink> 
                    </div>                
                </nav>
            </div>
            
        </aside>
    )
}