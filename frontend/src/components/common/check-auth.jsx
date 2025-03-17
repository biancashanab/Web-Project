import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startTransition } from "../../store/auth";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log("CheckAuth:", location.pathname, isAuthenticated);

  const navigateWithTransition = (path) => {
    dispatch(startTransition());
    return <Navigate to={path} />;
  };

  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return navigateWithTransition("/auth/login");
    } else {
      if (user?.role === "admin") {
        return navigateWithTransition("/admin/dashboard");
      } else {
        return navigateWithTransition("/shop/home");
      }
    }
  }

  if (!isAuthenticated && location.pathname !== "/auth") {
    return navigateWithTransition("/auth");
  }

  if (isAuthenticated && 
      (location.pathname.includes("/auth"))) {
    if (user?.role === "admin") {
      return navigateWithTransition("/admin/dashboard");
    } else {
      return navigateWithTransition("/shop/home");
    }
  }

  if (isAuthenticated && 
      user?.role !== "admin" &&
      location.pathname.includes("admin")) {
    return navigateWithTransition("/unauth-page");
  }

  if (isAuthenticated && 
      user?.role === "admin" &&
      location.pathname.includes("shop")) {
    return navigateWithTransition("/admin/dashboard");
  }

  return <>{children}</>;
}

export default CheckAuth;