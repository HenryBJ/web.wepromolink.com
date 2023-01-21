import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";

export const ProtectedRoute = () => {
    const { user } = useAuth();

    return !user? <Navigate to="/"/>:<Outlet/>
}