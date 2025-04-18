import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import { toast } from "sonner";
import { setPetDetails } from "../../store/shop/pets";
import { Separator } from "../../components/ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

function PetDetailsDialog({ open, setOpen, PetDetails }) 
{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.shopCart.cartItems);
  const cartItemsList = cartData?.items || []; 

  const adoptionFee = 15; 

  function handleAddToCart(getCurrentPetId) {
    if (!user?.id) {
      navigate("/auth");
      return;
    }

    const existingItem = cartItemsList.find(
      (item) => item.PetId === getCurrentPetId
    );
    if (existingItem) {
      toast.info("This pet is already in your cart.");
      return;
    }

    console.log("Dispatching addToCart with:", { userId: user.id, PetId: getCurrentPetId });

    dispatch(addToCart({ userId: user.id, PetId: getCurrentPetId }))
      .then((action) => {
          if (action.payload?.success) {
             if(action.payload.message === "Pet is already in cart") {
                 toast.info("This pet is already in your cart.");
             } else {
                 toast.success("Pet has been added to cart!");
             }
          } else {
             const errorMessage = action.payload?.message || action.error?.message || "Unknown error";
             console.error("Error adding to cart:", errorMessage, action);
             toast.error(`Could not add pet: ${errorMessage}`);
          }
      }).catch(error => {
          console.error("Unexpected error adding to cart:", error);
          toast.error("An unexpected error occurred.");
      });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setPetDetails(null)); 
  }

  if (!PetDetails) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 md:p-12 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[75vw] xl:max-w-[60vw]">
        <VisuallyHidden>
          <DialogTitle>Pet Details</DialogTitle>
          <DialogDescription> Details about: {PetDetails?.name || PetDetails?.title}. </DialogDescription>
        </VisuallyHidden>

        <div className="relative overflow-hidden rounded-lg">
          <img
            src={PetDetails?.image || "/placeholder.svg"}
            alt={PetDetails?.name || PetDetails?.title || "Pet"}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-extrabold mb-3">{PetDetails?.name || PetDetails?.title || "Name not available"}</h1>
          <Separator className="my-2" />
          <div className="space-y-2 text-base text-muted-foreground mb-4">
             {PetDetails?.species && (
              <p><strong className="font-semibold text-foreground">Species:</strong> {PetDetails.species}</p>
             )}
             {PetDetails?.breed && (
               <p><strong className="font-semibold text-foreground">Breed:</strong> {PetDetails.breed}</p>
             )}
             {PetDetails?.age && (
                <p><strong className="font-semibold text-foreground">Age:</strong> {PetDetails.age}</p>
             )}
             {PetDetails?.color && (
                <p><strong className="font-semibold text-foreground">Color:</strong> {PetDetails.color}</p>
             )}
             {PetDetails?.gender && (
                <p><strong className="font-semibold text-foreground">Gender:</strong> {PetDetails.gender}</p>
             )}
          </div>
          {PetDetails?.description && (
             <p className="text-muted-foreground text-lg mb-5 mt-2">
               {PetDetails.description}
            </p>
           )}
           <div className="flex items-center justify-between mt-auto pt-4">
               <p className="text-2xl font-bold text-muted-foreground">
               Adoption fee: ${adoptionFee.toFixed(2)}
               </p>
           </div>
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              size="lg"
              onClick={() => handleAddToCart(PetDetails?._id)}
              disabled={!PetDetails?._id || cartItemsList.some(item => item.PetId === PetDetails?._id)}
            >
              {cartItemsList.some(item => item.PetId === PetDetails?._id)
                ? 'Already in Cart'
                : 'Adopt Now'
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PetDetailsDialog;