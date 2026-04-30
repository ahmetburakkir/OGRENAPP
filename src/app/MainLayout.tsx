import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Button } from "@/shared/ui/Button";

export const MainLayout = () => {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8 items-center">
              <span className="font-bold text-xl text-blue-600">OgrenApp</span>
              <nav className="hidden md:flex space-x-4">
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
                <Link to="/tests" className="text-gray-600 hover:text-gray-900 font-medium">Tests</Link>
              </nav>
            </div>
            <div>
              <Button variant="ghost" onClick={logout}>Logout</Button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
