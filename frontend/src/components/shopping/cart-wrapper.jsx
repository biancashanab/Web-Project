import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../store/shop/cart";
import { useEffect } from "react";
import { createSelector } from 'reselect';

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Presupunem că ai un slice auth cu user
  // Dacă state.shoppingCart nu este definit, extragem direct valoarea cu un fallback
  const hasOrdered = useSelector((state) => state.shoppingCart?.hasOrdered || false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrderHistory(user.id));
    }
  }, [dispatch, user?.id]);
  
  return (
    <SheetContent className="sm:max-w-md" aria-labelledby="cart-title">
      <VisuallyHidden>
        <DialogTitle>Menu</DialogTitle>
      </VisuallyHidden>
              
      <SheetHeader>
        <SheetTitle id="cart-title">Your Cart</SheetTitle>
      </SheetHeader>
      
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent key={item.id || item.PetId} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
