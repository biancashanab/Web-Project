import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { updateOrderStatus, getOrderDetailsForAdmin, getAllOrdersForAdmin } from "../../store/admin/adoption_order";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function Section({ title, children }) {
    return (
        <div className="grid gap-2">
            <div className="font-semibold text-base">{title}</div>
            <div className="pl-2 space-y-1">{children}</div>
        </div>
    );
}

function InfoPair({ label, value, children }) {
    return (
        <div className="grid grid-cols-[auto_1fr] items-start gap-x-4 text-sm">
            <p className="font-medium text-muted-foreground justify-self-end">{label}:</p>
            <div className="min-w-0 break-words">{children || <p>{value || '-'}</p>}</div>
        </div>
    );
}

function AdminAdoptionApplicationDetailsView({ orderDetails: initialOrderDetails, onClose }) {
    const dispatch = useDispatch();
    const [orderDetails, setOrderDetails] = useState(initialOrderDetails);
    const [selectedStatus, setSelectedStatus] = useState(initialOrderDetails?.adoptionStatus || '');
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        setOrderDetails(initialOrderDetails);
        setSelectedStatus(initialOrderDetails?.adoptionStatus || '');
    }, [initialOrderDetails]);

    const handleStatusUpdate = async () => {
        if (!orderDetails?._id || !selectedStatus || selectedStatus === orderDetails.adoptionStatus) {
            toast.info("No status change or invalid application ID.");
            return;
        }

        try {
            setIsUpdating(true);
            const result = await dispatch(updateOrderStatus({ 
                id: orderDetails._id, 
                adoptionStatus: selectedStatus 
            })).unwrap();

            if (result.success) {
                toast.success("Application status has been updated!");
                await dispatch(getOrderDetailsForAdmin(orderDetails._id)).unwrap();
                await dispatch(getAllOrdersForAdmin()).unwrap();
            } else {
                toast.error(result.message || "Failed to update status");
            }
        } catch (err) {
            toast.error(`Update error: ${err?.message || 'Unknown error'}`);
            console.error("Update status error:", err);
        } finally {
            setIsUpdating(false);
        }
    };

    if (!orderDetails) {
        return (
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Adoption Application Details</DialogTitle>
                </DialogHeader>
                <div className="py-10 text-center flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            </DialogContent>
        );
    }

    const adoptionStatuses = ['pending_review', 'approved', 'rejected', 'completed', 'cancelled'];

    return (
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] flex flex-col">
            <DialogHeader>
                <DialogTitle>Adoption Application Details</DialogTitle>
                <DialogDescription>
                    Review and update application status ID: {orderDetails._id}
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4 overflow-y-auto flex-grow pr-4 -mr-2">
                <Section title="General Information">
                    <InfoPair label="Application ID" value={orderDetails._id} />
                    <InfoPair label="Application Date" value={new Date(orderDetails.adoptionDate).toLocaleDateString()} />
                    <InfoPair label="Current Status">
                        <Badge variant={
                            orderDetails.adoptionStatus === "approved" ? "success" :
                            orderDetails.adoptionStatus === "rejected" ? "destructive" :
                            orderDetails.adoptionStatus === "completed" ? "info" :
                            "secondary"
                        }>
                            {orderDetails.adoptionStatus}
                        </Badge>
                    </InfoPair>
                    <InfoPair label="Adoption Fee" value={`$${(orderDetails.adoptionFee || 0).toFixed(2)}`} />
                    <InfoPair label="Payment Status" value={orderDetails.paymentStatus} />
                    {orderDetails.paymentMethod && <InfoPair label="Payment Method" value={orderDetails.paymentMethod} />}
                    {orderDetails.paymentId && <InfoPair label="Transaction ID" value={orderDetails.paymentId} />}
                </Section>

                <Separator />

                <Section title="Requested Pets">
                    {orderDetails.pets?.length > 0 ? (
                        orderDetails.pets.map((pet) => (
                           <div key={pet.PetId?._id || pet.PetId} className="flex items-center gap-3 text-sm py-1">
                                <img src={pet.PetId?.image || pet.image || '/placeholder.svg'} alt={pet.PetId?.name || pet.name} className="w-12 h-12 rounded object-cover border" />
                                <div>
                                    <span className="font-semibold">{pet.PetId?.name || pet.name || "N/A"}</span> <br/>
                                    <span className="text-xs text-muted-foreground">{pet.PetId?.species || 'Species N/A'} - {pet.PetId?.breed || 'Breed N/A'}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                         <p className="text-sm text-muted-foreground">- No pets specified.</p>
                    )}
                </Section>

                <Separator />

                <Section title="Adopter Information">
                    <InfoPair label="Name" value={orderDetails.userId?.userName || orderDetails.adopterInfo?.fullName} />
                    <InfoPair label="Email" value={orderDetails.userId?.email || orderDetails.adopterInfo?.email} />
                    <InfoPair label="Phone" value={orderDetails.userId?.phone || orderDetails.adopterInfo?.phone} />
                    <InfoPair label="Address" value={orderDetails.adopterInfo?.address} />
                    <InfoPair label="City" value={orderDetails.adopterInfo?.city} />
                    <InfoPair label="Postal Code" value={orderDetails.adopterInfo?.pincode} />
                    {orderDetails.adopterInfo?.notes && <InfoPair label="Address Notes" value={orderDetails.adopterInfo.notes} />}
                </Section>

                <Separator />

                <Section title="Application Details">
                    <InfoPair label="Living Situation" value={orderDetails.applicationDetails?.livingSituation} />
                    <InfoPair label="Has Fence" value={orderDetails.applicationDetails?.hasFence} />
                    <InfoPair label="Previous Experience" value={orderDetails.applicationDetails?.petExperience} />
                    <InfoPair label="Veterinarian" value={orderDetails.applicationDetails?.vetNamePhone} />
                    <InfoPair label="Adoption Reason" value={orderDetails.applicationDetails?.reasonForAdoption} />
                </Section>

                <Separator />

                <Section title="Update Application Status">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="adoptionStatusSelect" className="w-[100px] text-right text-muted-foreground text-sm">New Status:</Label>
                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                        >
                            <SelectTrigger id="adoptionStatusSelect" className="flex-grow">
                                <SelectValue placeholder="Select status..." />
                            </SelectTrigger>
                            <SelectContent>
                                {adoptionStatuses.map(status => (
                                    <SelectItem key={status} value={status}>
                                        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </Section>
            </div>

            <DialogFooter className="pt-4 border-t mt-auto">
                <Button
                    onClick={handleStatusUpdate}
                    disabled={!selectedStatus || selectedStatus === orderDetails.adoptionStatus || isUpdating}
                >
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isUpdating ? "Updating..." : "Update Status"}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default AdminAdoptionApplicationDetailsView;