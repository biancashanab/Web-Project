import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle, DialogContent } from "@radix-ui/react-dialog";
import { useSelector } from "react-redux"; 

function UserCartWrapper({ setOpenCartSheet }) 
{ 
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.shopCart.cartItems);
  const cartItems = cartData?.items || []; 
  const isLoading = useSelector((state) => state.shopCart.isLoading); 
  const adoptionFeePerPet = 15;
  const totalAmount = (cartItems.length * adoptionFeePerPet).toFixed(2);


  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full" aria-labelledby="cart-title">
      <VisuallyHidden>
        <DialogTitle>Shopping Cart</DialogTitle>
        <DialogContent>Content</DialogContent>
      </VisuallyHidden>

      <SheetHeader>
        <SheetTitle id="cart-title">Your Cart</SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto mt-6 mb-4 pr-4"> 
        {isLoading ? (
          <p>Loading...</p> 
        ) : cartItems && cartItems.length > 0 ? (
          <div className="space-y-3">
              {cartItems.map((item) => (
                item?.PetId ? (
                   <UserCartItemsContent key={item.PetId} cartItem={item} />
                ) : null
              ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground mt-10">Your cart is empty</p>
        )}
      </div>

      {cartItems.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-4">
            <div className="w-full space-y-4">
               <div className="flex justify-between font-semibold text-lg">
                 <span>Total</span>
                 <span>${totalAmount}</span>
               </div>
               <Button
                 onClick={() => {
                   navigate("/shop/checkout");
                   setOpenCartSheet(false);
                 }}
                 className="w-full"
                 size="lg"
                 disabled={isLoading || cartItems.length === 0}
               >
                 Continue to the adoption form
               </Button>
            </div>
          </SheetFooter>
        )}
    </SheetContent>
  );
}

export default UserCartWrapper;