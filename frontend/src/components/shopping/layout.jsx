import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "../common/footer/footer";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default ShoppingLayout;