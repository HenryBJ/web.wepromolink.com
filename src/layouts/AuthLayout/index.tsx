import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../../hooks/Auth";
import { ProtectedRoute } from "../../router/ProtectedRoute";


export default function AuthLayout() {

    return (
        <div>
            <main>
                <AuthProvider>
                        <Outlet />
                </AuthProvider>
            </main>
        </div>
    )
}