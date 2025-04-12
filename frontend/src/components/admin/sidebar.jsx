import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  Cat,
} from "lucide-react";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from "../../store/admin/adoption_order";

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
      notificationId: 'pendingApplications'
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const { orderList } = useSelector((state) => state.adminAdoptionOrder);

  const pendingCount = orderList?.filter(
      order => order.adoptionStatus === 'pending_review' || order.adoptionStatus === 'pending'
  ).length || 0;

  const getNotificationCount = (id) => {
      if (id === 'pendingApplications') {
          return pendingCount;
      }
      return 0;
  };

  return (
      <nav className="mt-8 flex-col flex gap-2">
          {adminSidebarMenuItems.map((menuItem) => {
              const notificationCount = getNotificationCount(menuItem.notificationId);

              return (
                  <div
                      key={menuItem.id}
                      onClick={() => {
                          navigate(menuItem.path);
                          if (setOpen) {
                              setOpen(false);
                          }
                      }}
                      className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                      <div className="flex items-center gap-2">
                          {menuItem.icon}
                          <span>{menuItem.label}</span>
                      </div>
                      {notificationCount > 0 && (
                          <Badge
                              variant="destructive"
                              className="h-6 w-6 p-0 flex items-center justify-center rounded-full text-xs"
                          >
                              {notificationCount}
                          </Badge>
                      )}
                  </div>
              );
           })}
      </nav>
  );
}

function AdminSideBar({ open, setOpen })
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  return (
      <Fragment>
          <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent side="left" className="w-64 p-0 pt-4 flex flex-col" aria-describedby={undefined}>
                  <SheetHeader className="border-b px-6 pb-4">
                       <SheetTitle
                          onClick={() => { navigate("/admin/dashboard"); if(setOpen) setOpen(false); }}
                          className="flex cursor-pointer items-center gap-2"
                       >
                         <ChartNoAxesCombined size={26} />
                         <span className="text-xl font-extrabold">Admin Panel</span>
                       </SheetTitle>
                  </SheetHeader>
                  <div className="flex-grow p-6 overflow-y-auto">
                      <MenuItems setOpen={setOpen} />
                  </div>
              </SheetContent>
          </Sheet>

          <aside className="hidden w-64 flex-col border-r bg-background lg:flex">
              <div className="border-b p-6">
                  <div
                      onClick={() => navigate("/admin/dashboard")}
                      className="flex cursor-pointer items-center gap-2"
                  >
                      <ChartNoAxesCombined size={26} />
                      <span className="text-xl font-extrabold">Admin Panel</span>
                  </div>
              </div>
               <div className="flex-grow p-6 overflow-y-auto">
                  <MenuItems setOpen={null} />
               </div>
          </aside>
      </Fragment>
  );
}

export default AdminSideBar;