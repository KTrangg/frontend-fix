import { RouterProvider } from "react-router";
import { router } from "@/app/routes/index";
import { AuthProvider } from "@/app/providers/AuthProvider";
import { NotificationProvider } from "@/app/providers/NotificationProvider";

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  );
}
