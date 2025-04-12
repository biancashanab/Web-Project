import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import { fetchPetDetails } from "../../store/shop/pets";
import { getSearchResults } from "../../store/shop/search";
import PetDetailsDialog from "../../components/shopping/pets-details";
import ShoppingPetTile from "../../components/shopping/pets-tile";

function SearchPets() 
{
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);
  const { petDetails } = useSelector((state) => state.shopPets);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  function handleSearch() 
  {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 2) 
    {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(getSearchResults(keyword));
    } 
    else {
      toast.error("Please enter at least 3 characters to search");
    }
  }

  useEffect(() => {
    console.log("Search Results:", searchResults);
    console.log("Search Results Length:", searchResults?.length);
    console.log("Is Loading:", isLoading);
  }, [searchResults, isLoading]);

  function handleAddPetToAdoption(petId) 
  {
    let adoptionList = cartItems?.items || [];

    if (adoptionList.length) 
    {
      const existingPet = adoptionList.findIndex(
        (item) => item.petId === petId
      );
      if (existingPet > -1) {
        toast.error("This pet is already in your adoption list");
        return;
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        petId: petId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Pet added to your adoption list");
      }
    });
  }

  function handleGetPetDetails(petId) {
    dispatch(fetchPetDetails(petId));
  }

  useEffect(() => {
    if (petDetails !== null) setOpenDetailsDialog(true);
  }, [petDetails]);

  return (
    <div className="mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full max-w-2xl flex gap-2">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
            className="py-6 text-lg"
            placeholder="Search pets by name, breed, or species..."
          />
          <Button 
            onClick={handleSearch}
            className="px-8"
            disabled={isLoading}
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Searching...</h1>
        </div>
      ) : !searchResults?.length ? (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No pets found!</h1>
          <p className="text-gray-600">Try searching with different keywords</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((pet) => (
            <ShoppingPetTile
              key={pet._id}
              pet={pet}
              handleAddtoCart={handleAddPetToAdoption}
              handleGetPetDetails={handleGetPetDetails}
            />
          ))}
        </div>
      )}
      <PetDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={petDetails}
      />
    </div>
  );
}

export default SearchPets;