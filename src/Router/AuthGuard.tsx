import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard({ isPrivate }: { isPrivate: boolean }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
