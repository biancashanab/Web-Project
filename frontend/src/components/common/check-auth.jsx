import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startTransition } from "../../store/auth";

function CheckAuth({ isAuthenticated, user, children }) 
{
  const location = useLocation();
  const dispatch = useDispatch();

  const navigateWithTransition = (path) => {
    dispatch(startTransition());
    return <Navigate to={path} />;
  };

  const currentUser = isAuthenticated ? user : { role: "guest" };

  if (location.pathname === "/") {
    return navigateWithTransition("/");
  }

  if (isAuthenticated && (location.pathname.includes("/auth"))) 
  {
    if (user?.role === "admin") {
      return navigateWithTransition("/admin/dashboard");
    } else {
      return navigateWithTransition("/shop/home");
    }
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) 
  {
    return navigateWithTransition("/unauth-page");
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) 
  {
    return navigateWithTransition("/admin/dashboard");
  }

  return <>{children}</>;
}

export default CheckAuth;