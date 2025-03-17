import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, endTransition } from "./store/auth";
import { useEffect, useState } from "react";
import LoadingCat from "./components/common/loadingCat/loadingCat";
import "./App.css";

// Import components correctly based on your file structure
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./components/admin/dashboard";
import AdminPets from "./components/admin/pets";
import AdminAdoptionOrders from "./components/admin/adoption_orders";
import AdminFeatures from "./components/admin/features";
import ShoppingLayout from "./components/shopping/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import AuthPage from "./pages/auth/AuthPage";

function App() 
{
  const { user, isAuthenticated, isLoading, isTransitioning } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [forcedLoading, setForcedLoading] = useState(true);
  const MINIMUM_LOADING_TIME = 1500;
  const TRANSITION_TIME = 1500;

  useEffect(() => {
    dispatch(checkAuth());

    const timer = setTimeout(() => {
      setForcedLoading(false);
    }, MINIMUM_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (isTransitioning) {
      // End transition after delay
      const transitionTimer = setTimeout(() => {
        dispatch(endTransition());
      }, TRANSITION_TIME);

      return () => clearTimeout(transitionTimer);
    }
  }, [isTransitioning, dispatch]);

  if (isLoading || forcedLoading || isTransitioning) {
    console.log("Showing loading screen:", {
      isLoading,
      forcedLoading,
      isTransitioning,
    });
    return <LoadingCat />;
  }

  console.log("App rendering:", { isLoading, isAuthenticated, user });

  return (
    <div className="min-h-screen w-full bg-white">
      <Routes>
        {/* Add root route that redirects to a default page */}
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />

        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AuthPage />} />
          <Route path="/auth/*" element={<Navigate to="/auth" replace />} />
        </Route>


        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pets" element={<AdminPets />} />
          <Route path="adoption_orders" element={<AdminAdoptionOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
