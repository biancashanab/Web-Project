import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/");
    }

    if (isAuthenticated && location.pathname.includes("/auth")) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/shop/home");
      }
    }

    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
      navigate("/unauth-page");
    }

    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, user, location, navigate]);

  return <>{children}</>;
}

export default CheckAuth;
