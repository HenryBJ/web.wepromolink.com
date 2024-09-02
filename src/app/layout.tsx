import { ToastContainer } from "react-toastify";
import "../index.css";
import DashBoardNavBar from "src/components/DashBoardNavBar";

export const dynamic = "force-dynamic";
// export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://wepromolink.com" />
      </head>
      <body>
        <div id="root">
          <DashBoardNavBar />
          {children}
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
