import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthPage } from "@/features/auth/pages/AuthPage";
import { TestListPage } from "@/features/testing/pages/TestListPage";
import { TestExecutionPage } from "@/features/testing/pages/TestExecutionPage";
import { UserDashboardPage } from "@/features/dashboard/pages/UserDashboardPage";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { MainLayout } from "./MainLayout";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicOnlyRoute>
        <AuthPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <UserDashboardPage />,
      },
      {
        path: "tests",
        element: <TestListPage />,
      },
      {
        path: "test/:testId",
        element: <TestExecutionPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
