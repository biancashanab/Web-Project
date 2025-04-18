import {
  BadgeCheck,
  ShieldUser,
  LayoutDashboard,
  Cat,
  Users,
  FileText,
  MessageSquare,
  BarChart,
} from "lucide-react";
import { Fragment, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../../ui/sheet";
import { Badge } from "../../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from "../../../store/admin/adoption_order";
import { fetchMessages } from "../../../store/contact";
import './sidebar.css';

const adminSidebarMenuItems = [
  {
      id: "dashboard",
      label: "Dashboard", 
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
  },
  {
    id: "orders",
    label: "Adoption Orders",
    path: "/admin/adoption_orders",
    icon: <BadgeCheck />,
    notificationId: 'pendingApplications'
},
  {
      id: "pets",
      label: "Pets",
      path: "/admin/pets",
      icon: <Cat />,
  },
  {
      id: "users",
      label: "Users",
      path: "/admin/users",
      icon: <Users />,
  },
  {
      id: "messages",
      label: "Contact Messages",
      path: "/admin/messages",
      icon: <MessageSquare />,
      notificationId: 'pendingMessages'
  },
  {
      id: "stats",
      label: "Statistics",
      path: "/admin/stats",
      icon: <BarChart />,
  },
  {
      id: "about",
      label: "About Page",
      path: "/admin/about",
      icon: <FileText />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderList } = useSelector((state) => state.adminAdoptionOrder);
  const { messages } = useSelector((state) => state.contactMessages);

  const pendingCount = orderList?.filter(
      order => order.adoptionStatus === 'pending_review' || order.adoptionStatus === 'pending'
  ).length || 0;

  const pendingMessagesCount = messages?.filter(
      message => message.status === 'pending'
  ).length || 0;

  const getNotificationCount = (id) => {
      if (id === 'pendingApplications') {
          return pendingCount;
      }
      if (id === 'pendingMessages') {
          return pendingMessagesCount;
      }
      return 0;
  };

  return (
      <nav className="mt-8 flex-col flex gap-3">
          {adminSidebarMenuItems.map((menuItem) => {
              const notificationCount = getNotificationCount(menuItem.notificationId);
              const isActive = location.pathname === menuItem.path;

              return (
                  <div
                      key={menuItem.id}
                      onClick={() => {
                          navigate(menuItem.path);
                          if (setOpen) {
                              setOpen(false);
                          }
                      }}
                      className={`admin-sidebar menu-item flex cursor-pointer items-center justify-between gap-2 rounded-lg px-4 py-3 ${
                          isActive ? 'active' : ''
                      }`}
                  >
                      <div className="flex items-center gap-3">
                          <div className="icon">
                              {menuItem.icon}
                          </div>
                          <span className="font-medium">{menuItem.label}</span>
                      </div>
                      {notificationCount > 0 && (
                          <Badge
                              className="admin-sidebar badge h-6 w-6 p-0 flex items-center justify-center rounded-full text-xs font-semibold"
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
      dispatch(fetchMessages());
  }, [dispatch]);

  return (
      <Fragment>
          <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent side="left" className="admin-sidebar w-72 p-0 pt-4 flex flex-col bg-background/95 backdrop-blur-sm" aria-describedby={undefined}>
                  <SheetHeader className="admin-sidebar header border-b px-6 pb-4">
                       <SheetTitle
                          onClick={() => { navigate("/admin/dashboard"); if(setOpen) setOpen(false); }}
                          className="admin-sidebar header-title flex cursor-pointer items-center gap-3 text-foreground transition-colors"
                       >
                         <ShieldUser size={28} className="icon" />
                         <span className="text-xl font-bold">Admin Panel</span>
                       </SheetTitle>
                  </SheetHeader>
                  <div className="flex-grow p-6 overflow-y-auto">
                      <MenuItems setOpen={setOpen} />
                  </div>
              </SheetContent>
          </Sheet>

          <aside className="admin-sidebar hidden w-72 flex-col border-r bg-background/95 backdrop-blur-sm lg:flex">
              <div className="admin-sidebar header border-b p-6">
                  <div
                      onClick={() => navigate("/admin/dashboard")}
                      className="admin-sidebar header-title flex cursor-pointer items-center gap-3 text-foreground transition-colors"
                  >
                      <ShieldUser size={28} className="icon" />
                      <span className="text-xl font-bold">Admin Panel</span>
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