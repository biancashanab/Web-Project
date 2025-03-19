import {
    BadgeCheck,
    ChartNoAxesCombined,
    LayoutDashboard,
    Cat,
  } from "lucide-react";
  import { Fragment } from "react";
  import { useNavigate } from "react-router-dom";
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
  
  const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "pets",
      label: "Pets",
      path: "/admin/pets",
      icon: <Cat />,
    },
    {
      id: "orders",
      label: "Adoption Orders",
      path: "/admin/adoption_orders",
      icon: <BadgeCheck />,
    },
  ];
  
  function MenuItems({ setOpen }) {
    const navigate = useNavigate();
  
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {adminSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  }
  
  function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
  
    return (
      <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64" aria-describedby={undefined}>
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-5 mb-5">
                  <ChartNoAxesCombined size={30} />
                  <span className="text-2xl font-extrabold">Admin Panel</span>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <ChartNoAxesCombined size={30} />
            <span className="text-2xl font-extrabold">Admin Panel</span>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    );
  }
  
  export default AdminSideBar;