import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle} from "@radix-ui/react-dialog";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { navigationHeaderMenuItems } from "../../config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "../../store/auth/index.js";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "../../store/shop/cart";
import { Label } from "../ui/label";


function MenuItems() 
{
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
  
    function handleNavigate(getCurrentMenuItem) 
    {
      sessionStorage.removeItem("filters");
      const currentFilter =
        getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "pets" &&
        getCurrentMenuItem.id !== "search" &&
        getCurrentMenuItem.id !== "contact" &&
        getCurrentMenuItem.id !== "about"
          ? {
              category: [getCurrentMenuItem.id],
            }
          : null;
  
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
  
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
          )
        : navigate(getCurrentMenuItem.path);
    }
  
    return (
        <div>shipping view header</div>
    );
}

export default ShoppingHeader;