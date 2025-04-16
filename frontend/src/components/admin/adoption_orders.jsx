import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminAdoptionApplicationDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "../../store/admin/adoption_order";
import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";

const filterStatuses = ['all', 'pending_review', 'approved', 'rejected', 'completed', 'cancelled'];
const statusLabels = {
    all: 'All',
    pending_review: 'Pending',
    pending: 'Pending',
    approved: 'Approved', 
    rejected: 'Rejected',
    completed: 'Completed',
    cancelled: 'Cancelled'
};

function AdminAdoptionOrders() 
{
  const [openDialogId, setOpenDialogId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const { orderList, orderDetails, isLoading, error } = useSelector((state) => state.adminAdoptionOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) 
  {
     if (!getId) 
      return;
     setOpenDialogId(getId);
     dispatch(getOrderDetailsForAdmin(getId));
  }

  function handleCloseDialog() 
  {
      setOpenDialogId(null);
      dispatch(resetOrderDetails());
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const filteredList = orderList?.filter(order => {
      if (activeTab === 'all') return true;
      if (activeTab === 'pending_review') {
          return order.adoptionStatus === 'pending_review' || order.adoptionStatus === 'pending';
      }
      return order.adoptionStatus === activeTab;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adoption Applications</CardTitle>
      </CardHeader>
      <CardContent>
         <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mb-4"
         >
             <TabsList className="flex justify-center flex-wrap gap-2">
                {filterStatuses.map(status => (
                     <TabsTrigger key={status} value={status}>
                        {statusLabels[status] || status}
                     </TabsTrigger>
                ))}
             </TabsList>
         </Tabs>

         {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}

         <div className="max-h-[550px] overflow-y-auto relative">
           <Table>
             <TableHeader className="sticky top-0 bg-background z-10">
               <TableRow>
                 <TableHead className="text-center">Application ID</TableHead>
                 <TableHead className="text-center">Application Date</TableHead>
                 <TableHead className="text-center">Applicant</TableHead>
                 <TableHead className="text-center">Application Status</TableHead>
                 <TableHead className="text-center">Adoption Fee</TableHead>
                 <TableHead className="text-center">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {isLoading && (
                   <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                         <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                      </TableCell>
                   </TableRow>
               )}
               {!isLoading && filteredList.length === 0 && !error && (
                   <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                         {orderList.length === 0 ? "No applications found." : `No applications found for status: "${statusLabels[activeTab] || activeTab}".`}
                      </TableCell>
                   </TableRow>
               )}
               {!isLoading && filteredList?.map((orderItem) => (
                 <TableRow key={orderItem._id}>
                    <TableCell className="font-medium truncate max-w-[150px]">{orderItem?._id}</TableCell>
                    <TableCell>{new Date(orderItem?.adoptionDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                        {orderItem?.userId?.userName || 'N/A'} <br/>
                        <span className="text-xs text-muted-foreground">{orderItem?.userId?.email || ''}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                          className={
                             orderItem?.adoptionStatus === "approved" ? "bg-green-500 hover:bg-green-600" :
                             orderItem?.adoptionStatus === "rejected" ? "bg-red-500 hover:bg-red-600" :
                             orderItem?.adoptionStatus === "completed" ? "bg-blue-500 hover:bg-blue-600" :
                             orderItem?.adoptionStatus === "pending_review" || orderItem?.adoptionStatus === "pending" ? "bg-yellow-500 hover:bg-yellow-600" :
                             orderItem?.adoptionStatus === "cancelled" ? "bg-gray-500 hover:bg-gray-600" :
                             "bg-secondary hover:bg-secondary/80"
                          }
                      >
                        {statusLabels[orderItem?.adoptionStatus] || orderItem?.adoptionStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${(orderItem?.adoptionFee || 0).toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Dialog
                        open={openDialogId === orderItem._id}
                        onOpenChange={(isOpen) => { if (!isOpen) handleCloseDialog(); }}
                      >
                        <Button
                         
                           variant="outline"
                           size="sm"
                           onClick={() => handleFetchOrderDetails(orderItem?._id)}
                           disabled={isLoading && openDialogId === orderItem._id}
                        >
                          Details
                        </Button>
                        {openDialogId === orderItem._id && (
                            <AdminAdoptionApplicationDetailsView
                                orderDetails={orderDetails?._id === orderItem._id ? orderDetails : null}
                                onClose={handleCloseDialog}
                            />
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
             </TableBody>
           </Table>
         </div>
      </CardContent>
    </Card>
  );
}

export default AdminAdoptionOrders;