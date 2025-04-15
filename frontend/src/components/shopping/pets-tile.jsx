import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ShoppingPetTile({ pet, handleGetPetDetails, handleAddtoCart }) 
{
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.shopCart.cartItems);
  const cartItems = cartData?.items || [];

  const navigate = useNavigate();
  const adoptionFee = 15;

  const isPetInCart = cartItems.some(item => item && item.PetId === pet?._id);

  function handleAdoptClick() 
  {
    if (!isAuthenticated) {
        toast.error("Please log in to adopt.");
        navigate("/auth");
    } else if (isPetInCart) {
        toast.info("This pet is already in your cart.");
    }
    else {
      if (pet?._id) {
         handleAddtoCart(pet._id);
      } else {
         console.error("Cannot add pet to cart: Pet ID is missing.");
         toast.error("Could not add pet: Missing ID.");
      }
    }
  }

  if (!pet) {
      return null;
  }


  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetPetDetails(pet?._id)}>
        <div className="relative">
          <img
            src={pet?.image}
            alt={pet?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">
            Adoption Fee: ${adoptionFee}
          </Badge>
        </div>
        <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{pet?.title}</h3>
          <h2 className="text-xl font-bold mb-2 mt-2">{pet?.name}</h2>
          <div className="flex items-center justify-between">
          <p className="text-gray-600">{pet?.breed}</p>
          <p className="text-gray-600">Age: {pet?.age} years</p>
          </div>
        </CardContent>
      </div>
      <CardFooter>
      <Button
            onClick={handleAdoptClick}
            className="w-full"
            disabled={isPetInCart || !isAuthenticated}
            variant={isPetInCart ? "secondary" : "default"}
        >
          {isAuthenticated ? (isPetInCart ? "Already in Cart" : "Adopt Now") : "Log In"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingPetTile;