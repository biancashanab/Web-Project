import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle, DialogDescription, DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails })
{
    const { user } = useSelector((state) => state.auth);
    const userName = user?.userName || 'N/A';

    const formatDate = (dateString) => {
        if (!dateString || typeof dateString !== 'string') {
            return 'N/A';
        }
        try {
            return new Date(dateString).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", dateString, error);
            return 'Invalid Date';
        }
    };

    if (!orderDetails) {
        return (
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                     <DialogTitle>Order Details</DialogTitle>
                 </DialogHeader>
                <p className="py-10 text-center text-muted-foreground">Loading order details...</p>
            </DialogContent>
        );
    }

    const displayFee = orderDetails?.adoptionFee !== undefined ? orderDetails.adoptionFee : orderDetails?.totalAmount;


    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>Adoption Application Details</DialogTitle>
                <DialogDescription>
                    Application ID: {orderDetails._id}
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p className="font-medium text-muted-foreground text-right">Application ID:</p>
                    <p className="truncate">{orderDetails._id || 'N/A'}</p>

                    <p className="font-medium text-muted-foreground text-right">Application Date:</p>
                    <p>{formatDate(orderDetails.adoptionDate)}</p>

                    {displayFee !== undefined && (
                        <>
                            <p className="font-medium text-muted-foreground text-right">Adoption Fee:</p>
                            <p>${displayFee.toFixed(2)}</p>
                        </>
                    )}
                    <p className="font-medium text-muted-foreground text-right">Payment Method:</p>
                    <p>{orderDetails.paymentMethod || '-'}</p>

                    <p className="font-medium text-muted-foreground text-right">Payment Status:</p>
                    <p>{orderDetails.paymentStatus || '-'}</p>

                    <p className="font-medium text-muted-foreground text-right">Application Status:</p>
                    <p>
                        <Badge
                            variant={
                                orderDetails.adoptionStatus === "approved" ? "success" :
                                orderDetails.adoptionStatus === "rejected" ? "destructive" :
                                orderDetails.adoptionStatus === "completed" ? "info" :
                                "secondary"
                            }
                        >
                            {orderDetails.adoptionStatus || 'N/A'}
                        </Badge>
                    </p>
                </div>

                <Separator />

                <div className="grid gap-2">
                    <div className="font-medium text-base">Pet(s) Applied For</div>
                    {orderDetails.pets && orderDetails.pets.length > 0 ? (
                        <ul className="grid gap-3 pl-2">
                            {orderDetails.pets.map((pet) => (
                                <li key={pet.PetId?._id || pet.PetId || pet.name} className="flex items-center gap-3 text-sm">
                                    <img src={pet.image || '/placeholder.svg'} alt={pet.name} className="w-10 h-10 rounded object-cover border" />
                                    <span className="font-medium">{pet.name || "N/A"}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground pl-2">- No pet details available.</p>
                    )}
                </div>

                <Separator />

                <div className="grid gap-2">
                    <div className="font-medium text-base">Adopter Information</div>
                    <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pl-2 text-sm text-muted-foreground">
                        <p className="font-medium justify-self-end">Name:</p>
                        <p>{orderDetails.adopterInfo?.fullName || userName}</p>

                        <p className="font-medium justify-self-end">Address:</p>
                        <p>{orderDetails.adopterInfo?.address || '-'}</p>

                        <p className="font-medium justify-self-end">City:</p>
                        <p>{orderDetails.adopterInfo?.city || '-'}</p>

                        <p className="font-medium justify-self-end">Pincode:</p>
                        <p>{orderDetails.adopterInfo?.pincode || '-'}</p>

                        <p className="font-medium justify-self-end">Phone:</p>
                        <p>{orderDetails.adopterInfo?.phone || '-'}</p>

                        {orderDetails.adopterInfo?.notes && (
                             <>
                                <p className="font-medium justify-self-end">Notes:</p>
                                <p>{orderDetails.adopterInfo.notes}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default ShoppingOrderDetailsView;