import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart";
import { toast } from "sonner";
import { setPetDetails } from "../../store/shop/pets";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "../../store/shop/review";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";


function PetDetailsDialog({ open, setOpen, PetDetails }) 
{
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const adoptionFee = 15;


  function handleRatingChange(getRating) 
  {
    console.log(getRating, "getRating");
    setRating(getRating);
  }

  function handleAddToCart(getCurrentPetId) 
  {
    if (!user?._id) {
      console.error("ID-ul utilizatorului lipsește");
      toast.error("Te rugăm să te autentifici pentru a adăuga animale în coș");
      return;
    }
  
    //  Verific daca animalul este deja in cos
    const cartItemsList = cartItems.items || [];
    const existingItem = cartItemsList.find(item => item.petId === getCurrentPetId);
    if (existingItem) {
      toast.info("Animalul este deja în coș");
      return;
    }

    console.log("Sending to addToCart:", payload);

    dispatch(
      addToCart({
        userId: user?._id,
        PetId: getCurrentPetId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Pet is added to cart");
      } else {
        console.error("Eroare la adăugarea în coș:", data?.error?.message);
        toast.error("Nu s-a putut adăuga animalul în coș");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setPetDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    if (!reviewMsg.trim()) 
      return; 

    dispatch(
      addReview({
        PetId: PetDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(PetDetails?._id));
        toast.message("Review added successfully!");
      }
    });
  }

  useEffect(() => {
    if (PetDetails !== null) dispatch(getReviews(PetDetails?._id));
  }, [PetDetails]);

 // console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
      <VisuallyHidden>
        <DialogTitle>Pet Details</DialogTitle>
        <DialogDescription>
          Detalii despre animalul de companie: {PetDetails?.title}.
        </DialogDescription>
      </VisuallyHidden>

        <div className="relative overflow-hidden rounded-lg">
          <img
            src={PetDetails?.image}
            alt={PetDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{PetDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {PetDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                adoptionFee > 0 ? "line-through" : ""
              }`}
            >
              ${adoptionFee}
            </p>
            {adoptionFee > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${adoptionFee}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    PetDetails?._id,
                  )
                }
              >
                Add to Cart
              </Button>
            }
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PetDetailsDialog;