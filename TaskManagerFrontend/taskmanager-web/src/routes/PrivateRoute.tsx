import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../auth/AuthService";
import type { JSX } from "react";
import type React from "react";

interface Props {
    children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    if(!isAuthenticated()) {
        return <Navigate to="/"/>
    }

    return children;    
}


export default PrivateRoute;