import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

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
import NotFound from './pages/not-found';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingCheckout from './pages/shopping-view/checkout';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';

function App() 
{
  console.log("App component rendering"); // Debugging log
  const isAuthenticated = false;
  const user = {
    name: "John Doe",
    role: "admin"
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <h1>Header component</h1>
      <Routes>
        {/* Add root route that redirects to a default page */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/auth" element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}>
              <AuthLayout />
            </CheckAuth>
          } >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        
        {/* Admin routes */}
        <Route path="/admin" element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}>
              <AdminLayout />
            </CheckAuth>
          } >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pets" element={<AdminPets />} />
          <Route path="adoption_orders" element={<AdminAdoptionOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        
        {/* Shopping routes - commented out until component is available */}
        <Route path="/shop" element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}>
              <ShoppingLayout />
            </CheckAuth>
          } >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>
          
          {/* Not found route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={UnauthPage} />
      </Routes>
    </div>
  )
}

export default App