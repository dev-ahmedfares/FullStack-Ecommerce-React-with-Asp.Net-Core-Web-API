import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }:{children:React.ReactNode}) {
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) {
    return <Navigate to={"/login?message=login_required"} />;
  }

  return <>{children}</>;
}
