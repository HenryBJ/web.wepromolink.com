import { Navigate, Outlet } from "react-router-dom";
import DashBoardNavBar from "../../components/DashBoardNavBar";
import { AuthProvider, useAuth } from "../../hooks/Auth";
import { ProtectedRoute } from "../../router/ProtectedRoute";


export default function AuthLayout() {

    return (
        <><AuthProvider>
            <DashBoardNavBar />
            <main className="bg-gray-100">
                <Outlet />
            </main>
        </AuthProvider>
        </>
    )
}