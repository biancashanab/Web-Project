import { Button } from "../../components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Fish,
  PawPrint,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredPets, fetchPetDetails } from "../../store/shop/pets";
import ShoppingPetTile from "../../components/shopping/pets-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import { toast } from "sonner";
import PetDetailsDialog from "../../components/shopping/pets-details";
import { getFeatureImages } from "../../store/common";

const speciesWithIcon = [
  { id: "dog", label: "Dog", icon: Dog },
  { id: "cat", label: "Cat", icon: Cat },
  { id: "rabbit", label: "Rabbit", icon: Rabbit },
  { id: "bird", label: "Bird", icon: Bird },
  { id: "fish", label: "Fish", icon: Fish },
  { id: "other", label: "Other", icon: PawPrint },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { petList, petDetails } = useSelector((state) => state.shopPets);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);

  console.log("Feature Image List in Component:", featureImageList);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentSpecies, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentSpecies.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetPetDetails(getCurrentPetId) {
    dispatch(fetchPetDetails(getCurrentPetId));
  }

  function handleAddtoCart(getCurrentPetId) {
    if (!user?.id) {
      toast.error("Please log in to add to cart.");
      navigate("/auth");
      return;
    }
    if (!getCurrentPetId) {
      toast.error("Invalid pet ID.");
      return;
    }

    dispatch(
      addToCart({
        userId: user._id,
        PetId: getCurrentPetId,
      })
    )
      .then((action) => {
        if (action.payload?.success) {
          if (action.payload.message === "Pet already in cart") {
            toast.info("This pet is already in your cart.");
          } else {
            toast.success("Pet added to cart!");
          }
          dispatch(fetchCartItems(user._id));
        } else {
          const errorMessage =
            action.payload?.message || action.error?.message || "Unknown error";
          toast.error(`Could not add: ${errorMessage}`);
          console.error("addToCart failed:", action);
        }
      })
      .catch((error) => {
        console.error("Error dispatching addToCart:", error);
        toast.error("An unexpected error occurred.");
      });
  }

  useEffect(() => {
    if (petDetails?._id) {
      setOpenDetailsDialog(true);
    } else {
      setOpenDetailsDialog(false);
    }
  }, [petDetails]);

  useEffect(() => {
    if (!featureImageList || featureImageList.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredPets({
        filterParams: {},
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const numImages = featureImageList?.length || 0;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {featureImageList && featureImageList.length > 0 ? (
            featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={slide?._id || index}
                alt={`Banner image ${index + 1}`}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`}
              />
            ))
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Loading images...</p>
            </div>
          )}
          {numImages > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + numImages) % numImages)
                }
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white hover:text-white/80 rounded-full m-2 hover:bg-black/10 h-8 w-8 p-0"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % numImages)
                }
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white hover:text-white/80 rounded-full m-2 hover:bg-black/10 h-8 w-8 p-0"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        <section className="py-12 mx-4 md:mx-8 lg:mx-10">
          <h2 className="text-3xl font-bold text-center mb-8">
            Browse by Species
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {speciesWithIcon.map((speciesItem) => (
              <Card
                key={speciesItem.id}
                onClick={() =>
                  handleNavigateToListingPage(speciesItem, "species")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden rounded-lg border bg-card text-card-foreground"
              >
                <CardContent className="flex flex-col items-center justify-center p-4 aspect-[4/3]">
                  <speciesItem.icon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-primary" />
                  <span className="font-semibold text-center text-sm">
                    {speciesItem.label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Recently Available Pets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {petList && petList.length > 0 ? (
              petList
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 4)
                .map((petItem) => (
                  <div key={petItem._id} className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden rounded-xl border bg-card text-card-foreground">
                    <ShoppingPetTile
                      handleGetPetDetails={handleGetPetDetails}
                      pet={petItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  </div>
                ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No available pets found at this time.
              </p>
            )}
          </div>
        </section>

        <PetDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          PetDetails={petDetails}
        />
      </div>
    </>
  );
}

export default ShoppingHome;
