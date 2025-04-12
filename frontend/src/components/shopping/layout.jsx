import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "../common/footer/footer";

function ShoppingLayout() 
{
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        {/* common header */}
        <ShoppingHeader />
        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ShoppingLayout;