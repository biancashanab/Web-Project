import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import Address from "../../components/shopping/address";
import UserCartItemsContent from "../../components/shopping/cart-items-content";
import CommonForm from "../../components/common/form";
import { submitAdoptionApplication } from "../../store/shop/order";
import { clearCart, clearCartFromDatabase } from "../../store/shop/cart";
import { adoptionFormControls } from "../../config";
import { Loader2 } from "lucide-react";

const ADOPTION_FEE_PER_PET = 15;

const initialAdoptionFormData = {
  livingSituation: "",
  hasFence: "",
  petExperience: "",
  vetNamePhone: "",
  reasonForAdoption: "",
};

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading: isSubmitting } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [adoptionFormData, setAdoptionFormData] = useState(initialAdoptionFormData);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAdoptionFee =
    cartItems?.items?.length > 0
      ? cartItems.items.length * ADOPTION_FEE_PER_PET
      : 0;

  function isAdoptionFormValid() {
     return adoptionFormControls.every((control) => {
      if (control.required) {
        return (adoptionFormData[control.name]?.trim() ?? "") !== "";
      }
      return true;
    });
  }

  async function handleSubmitAdoption() {
    const userId = user?.id;
    console.log("User ID:", userId);

    if (!userId) {
      toast.error("Please log in to submit an adoption application");
      return;
    }
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast.error("Your cart is empty. Please add pets to adopt");
      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Please select a delivery address");
      return;
    }
    if (!isAdoptionFormValid()) {
      const missingFields = adoptionFormControls
        .filter(control => control.required && !(adoptionFormData[control.name]?.trim()))
        .map(control => control.label)
        .join(", ");
      toast.error(`Please fill in all required fields: ${missingFields}`);
      return;
    }

    setIsProcessing(true);

    const adoptionApplicationData = {
      userId: userId,
      pets: cartItems.items.map((petItem) => ({
        PetId: petItem?.PetId,
        name: petItem?.name || petItem?.title,
        image: petItem?.image,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      applicationDetails: { ...adoptionFormData },
      totalAmount: totalAdoptionFee,
      paymentMethod: 'cash_on_pickup',
    };

    console.log("Submitting Adoption Application:", adoptionApplicationData);

    try {
      const submitAction = await dispatch(submitAdoptionApplication(adoptionApplicationData)).unwrap();

      if (submitAction?.success) {
        toast.success("Adoption application submitted successfully!");
        console.log("Application submitted, proceeding to clear cart for user:", userId);

        try {
          const clearAction = await dispatch(clearCartFromDatabase(userId)).unwrap();

          if (clearAction?.success) {
            dispatch(clearCart());
            console.log("Cart cleared successfully on backend and frontend.");

            navigate('/shop/account');

          } else {
             toast.error(`Application submitted, but failed to clear cart: ${clearAction?.message}`);
             console.error("Failed to clear cart from database:", clearAction);
             navigate('/shop/account');
          }
        } catch (clearError) {
           toast.error("Application submitted, but an error occurred while clearing your cart.");
           console.error("Error during clearCartFromDatabase dispatch:", clearError);
           navigate('/shop/account');
        }
      } else {
         toast.error(`Error submitting application: ${submitAction?.message || 'Unknown error'}`);
      }
    } catch (submitError) {
      toast.error(`Error submitting application: ${submitError?.message || 'Please try again.'}`);
      console.error("Error during submitAdoptionApplication dispatch:", submitError);
    } finally {
       setIsProcessing(false);
    }
  }

  return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Address
              selectedId={currentSelectedAddress?._id}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Adoption Application Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={adoptionFormControls}
                  formData={adoptionFormData}
                  setFormData={setAdoptionFormData}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Adoption Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
                   {cartItems?.items?.length > 0 ? (
                     cartItems.items.map((item) => (
                       <UserCartItemsContent key={item.PetId} cartItem={item} />
                     ))
                   ) : (
                     <p className="text-muted-foreground text-center py-4">Cart is empty.</p>
                   )}
                 </div>
                 {cartItems?.items?.length > 0 && (
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-base font-medium">
                      <span>Adoption Fee ({cartItems.items.length} pets)</span>
                      <span>${totalAdoptionFee.toFixed(2)}</span>
                    </div>
                     <p className="text-xs text-muted-foreground">
                       The adoption fee helps cover care costs.
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  <Button
                    onClick={handleSubmitAdoption}
                    className="w-full"
                    size="lg"
                    disabled={isProcessing || isSubmitting || !cartItems?.items || cartItems.items.length === 0 || !currentSelectedAddress || !isAdoptionFormValid()}
                  >
                     {(isProcessing || isSubmitting) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {(isProcessing || isSubmitting) ? "Processing..." : "Submit Adoption Application"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  );
}

export default ShoppingCheckout;