import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, endTransition } from "./store/auth";
import { useEffect, useState } from "react";
import LoadingCat from "./components/common/loadingCat/loadingCat";
import "./App.css";

// Import components correctly based on your file structure
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
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

function App() {
  const { user, isAuthenticated, isLoading, isTransitioning } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  // Add a forced loading state that will always be true for at least MINIMUM_LOADING_TIME
  const [forcedLoading, setForcedLoading] = useState(true);
  
  // Set the minimum loading time in milliseconds (e.g., 1500ms = 1.5 seconds)
  const MINIMUM_LOADING_TIME = 1500;
  // Set the transition time in milliseconds (e.g., 1500ms = 1.5 seconds)
  const TRANSITION_TIME = 1500;

  useEffect(() => {
    // Start the auth check
    dispatch(checkAuth());
    
    // Set a timer to ensure minimum loading time
    const timer = setTimeout(() => {
      setForcedLoading(false);
    }, MINIMUM_LOADING_TIME);
    
    // Clear the timer if component unmounts
    return () => clearTimeout(timer);
  }, [dispatch]);
  
  // Handle transition state
  useEffect(() => {
    if (isTransitioning) {
      // End transition after delay
      const transitionTimer = setTimeout(() => {
        dispatch(endTransition());
      }, TRANSITION_TIME);
      
      return () => clearTimeout(transitionTimer);
    }
  }, [isTransitioning, dispatch]);

  // Show loading animation if either:
  // 1. The app is still loading data
  // 2. We're in the forced loading period
  // 3. We're transitioning between pages after auth actions
  if (isLoading || forcedLoading || isTransitioning) {
    console.log("Showing loading screen:", { isLoading, forcedLoading, isTransitioning });
    return <LoadingCat />;
  }

  console.log("App rendering:", { isLoading, isAuthenticated, user });

  return (
    <div className="min-h-screen w-full bg-white">
      <Routes>
        {/* Add root route that redirects to a default page */}
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>} />
        
        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
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