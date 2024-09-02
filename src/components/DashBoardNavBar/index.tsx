"use client";
// import { AuthProvider } from "src/hooks/Auth";
import dynamic from "next/dynamic";

const NotificationProvider = dynamic(() => import('src/hooks/NotificationProvider'), { ssr: false })
const ProfileMenu = dynamic(() => import('../ProfileMenu'), { ssr: false })
const TextLogo = dynamic(() => import('../TextLogo'), { ssr: false })
const ToolBar = dynamic(() => import('../ToolBar'), { ssr: false })
const AuthProvider = dynamic(() => import('src/hooks/Auth'), { ssr: false })

export default function DashBoardNavBar() {
  return (
    <nav
      className="sticky top-0 w-full h-min border border-b-2 z-50  bg-white md:px-1"
      style={{ zIndex: 100 }}
    >
      <div className="w-full h-9">
        <div className="flex flex-row py-1 items-center h-full">
          <div>
            <a href="https://wepromolink.com">
              <TextLogo scale={0.8} fillcolor="#f97316" />
            </a>
          </div>
          <div className="w-full h-full  flex flex-row justify-center items-center">
            <div className="hidden md:block">
              <ToolBar />
            </div>
          </div>
          <div className="h-full flex flex-row justify-end pr-2 items-center">
            <AuthProvider>
              <NotificationProvider>
                <ProfileMenu />
              </NotificationProvider>
            </AuthProvider>
          </div>
        </div>
      </div>
      <div className="bg-orange-500-500 w-full flex items-center justify-center">
        <div className="md:hidden my-1">
          <ToolBar />
        </div>
      </div>
    </nav>
  );
}
