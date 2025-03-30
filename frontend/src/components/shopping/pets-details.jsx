import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
// Input component seems unused, can be removed if not needed elsewhere after refactor
// import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import { toast } from "sonner";
import { setPetDetails } from "../../store/shop/pets";
// Label component seems unused, can be removed if not needed elsewhere after refactor
// import { Label } from "../ui/label";
import { Separator } from "../../components/ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
// SeparatorHorizontal icon seems unused, can be removed
// import { SeparatorHorizontal } from "lucide-react";

function PetDetailsDialog({ open, setOpen, PetDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const adoptionFee = 15; // Assuming a fixed adoption fee for now

  function handleAddToCart(getCurrentPetId) {
    if (!user?._id) {
      toast.error("Te rugăm să te autentifici pentru a adăuga animale în coș");
      return;
    }

    const cartItemsList = cartItems.items || [];
    const existingItem = cartItemsList.find(
      (item) => item.PetId === getCurrentPetId
    );
    if (existingItem) {
      toast.info("Animalul este deja în coș");
      return;
    }

    // Define payload here for clarity if needed, though it's simple
    const payload = { userId: user._id, PetId: getCurrentPetId };
    console.log("Sending to addToCart:", payload);

    dispatch(addToCart(payload)).then((action) => {
      // Check the structure of the returned action/payload from your thunk
      if (action.payload?.success) {
        // Ensure user.id or user._id is correct based on your user object structure
        dispatch(fetchCartItems(user._id));
        toast.success("Animalul a fost adăugat în coș"); // Translated message
      } else {
        // Log the specific error if available
        const errorMessage = action.error?.message || "Unknown error";
        console.error("Eroare la adăugarea în coș:", errorMessage, action);
        toast.error(`Nu s-a putut adăuga animalul în coș: ${errorMessage}`);
      }
    }).catch(error => {
        // Catch potential errors during dispatch/thunk execution
        console.error("Eroare neașteptată la adăugarea în coș:", error);
        toast.error("A apărut o eroare neașteptată.");
    });
  }

  function handleDialogClose() {
    setOpen(false);
    // Resetting pet details in the store when dialog closes
    dispatch(setPetDetails(null)); // Pass null or undefined to clear it
  }

  // Defensive check in case PetDetails is null/undefined when dialog tries to render
  if (!PetDetails) {
    return null; // Or return a loading state or an empty Dialog frame
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      {/* Increased max-width for better content fit */}
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 md:p-12 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[75vw] xl:max-w-[60vw]">
        <VisuallyHidden>
          <DialogTitle>Detalii Animal</DialogTitle>
          <DialogDescription>
            Detalii despre animalul de companie: {PetDetails?.name || PetDetails?.title}. {/* Use name if available */}
          </DialogDescription>
        </VisuallyHidden>

        {/* Image Column */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={PetDetails?.image || "/placeholder.svg"} // Added placeholder
            alt={PetDetails?.name || PetDetails?.title || "Animal"}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-extrabold mb-3">
            {PetDetails?.name || PetDetails?.title || "Nume indisponibil"}
          </h1>
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
                <p><strong className="font-semibold text-foreground">Culour:</strong> {PetDetails.color}</p>
             )}
          </div>

          {PetDetails?.description && (
             <p className="text-muted-foreground text-lg mb-5 mt-2">
               {PetDetails.description}
            </p>
           )}

           <div className="flex items-center justify-between mt-auto pt-4">
               <p className="text-2xl font-bold text-muted-foreground">
                 Taxă adopție: ${adoptionFee.toFixed(2)}
               </p>
           </div>

          <div className="mt-5 w-full">
            <Button
              className="w-full"
              size="lg" 
              onClick={() => handleAddToCart(PetDetails?._id)}
              disabled={!PetDetails?._id} 
            >
              Adaugă în Coș 
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PetDetailsDialog;