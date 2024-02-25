import { Navigate, Outlet } from "react-router-dom";
import DashBoardNavBar from "../../components/DashBoardNavBar";
import { AuthProvider, useAuth } from "../../hooks/Auth";
import NotificationProvider from "../../hooks/NotificationProvider";
import { ProtectedRoute } from "../../router/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AuthLayout() {
    return (
        <>
            <NotificationProvider>
                <AuthProvider>
                    <DashBoardNavBar />
                    <main className="bg-gray-100 min-h-[calc(100vh-83px)] md:min-h-[calc(100vh-47px)] h-full">
                    <div className="bg-blue-500 w-full text-white flex item-center justify-center">This platform is on  <b>TESTING MODE</b>, no real money is use</div>
                        <ToastContainer position="bottom-right"/>
                        <Outlet />
                    </main>
                </AuthProvider>
            </NotificationProvider>
        </>
    )
}