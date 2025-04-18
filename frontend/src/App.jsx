import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth";
import { useEffect, useState } from "react";
import LoadingCat from "./components/common/loadingCat/loadingCat";
import "./App.css";

// Import components correctly based on your file structure
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin/dashboard/dashboard";
import AdminPets from "./pages/admin/pets";
import AdminAdoptionOrders from "./components/admin/adoption_orders";
import ShoppingLayout from "./components/shopping/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAbout from "./pages/shopping-view/about";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/start/start";
import SearchPets from "./pages/shopping-view/search";
import UserManagement from "./pages/admin/users";
import AboutManagement from "./pages/admin/about-management";
import ContactPage from "./pages/contact/contact";
import ContactMessages from "./pages/admin/contact-messages";
import AdminStats from "./pages/admin/stats";

function App() 
{
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [forcedLoading, setForcedLoading] = useState(true);
  const MINIMUM_LOADING_TIME = 1500;

  useEffect(() => {
    dispatch(checkAuth());

    const timer = setTimeout(() => {
      setForcedLoading(false);
    }, MINIMUM_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (isLoading || forcedLoading) {
    console.log("Showing loading screen:", {
      isLoading,
      forcedLoading,
    });
    return <LoadingCat />;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <Routes>
        {/* Add root route that redirects to a default page */}
        <Route path="/" element={<HomePage />} />

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
          <Route path="about" element={<AboutManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="messages" element={<ContactMessages />} />
          <Route path="stats" element={<AdminStats />} />
        </Route>

        {/* Shopping routes */}
        <Route path="/shop" element={<ShoppingLayout />} >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="about" element={<ShoppingAbout />} />
          <Route path="search" element={<SearchPets />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Contact route */}
        <Route path="/contact" element={<ContactPage />} />

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
