import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "../../store/shop/cart";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) 
{
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const adoptionFeePerPet = 15;

  if (!user?.id) {
    console.warn("UserCartItemsContent: User not fully loaded, skipping render.");
    return null;
  }

  function handleCartItemDelete() 
  {
    console.log("handleCartItemDelete called.");
    console.log("Current User State:", JSON.stringify(user));
    console.log("Cart Item to Delete:", JSON.stringify(cartItem));

    const currentUserId = user?.id;
    const currentPetId = cartItem?.PetId;

    console.log("Values for Check: UserID=", currentUserId, "PetID=", currentPetId);

    if (!currentUserId || !currentPetId) 
    {
      toast.error("Invalid data for deletion (User or Pet missing).");
      console.error("DELETE ABORTED: Invalid data. UserID:", currentUserId, "PetID:", currentPetId);
      return;
    }

    console.log("Dispatching deleteCartItem with:", { userId: currentUserId, PetId: currentPetId });
    
    dispatch(
      deleteCartItem({ userId: currentUserId, PetId: currentPetId })
    ).then((action) => {
      if (action.payload?.success) {
        toast.success("Pet removed from cart");
      } else {
        const errorMessage = action.payload?.message || action.error?.message || 'Unknown deletion error';
        toast.error(`${errorMessage}`);
        console.error("Delete failed:", action);
      }
    }).catch(error => {
      console.error("Error dispatching deleteCartItem:", error);
      toast.error("An unexpected error occurred during deletion.");
    });
  }

  if (!cartItem) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 py-2 border-b last:border-b-0">
      <img
        src={cartItem.image || "/placeholder.svg"}
        alt={cartItem.title || "Pet"}
        className="w-16 h-16 rounded object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{cartItem.title || "Name not available"}</h3>
        <p className="text-sm text-muted-foreground">Adoption fee: ${adoptionFeePerPet.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <Trash
          onClick={handleCartItemDelete}
          className="cursor-pointer text-destructive hover:text-destructive/80"
          size={18}
          aria-label={`Delete ${cartItem.title || 'pet'} from cart`}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;