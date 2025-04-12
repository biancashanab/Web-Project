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
import ShoppingOrderDetailsView from "./adoption_order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "../../store/shop/order";
import { Badge } from "../ui/badge";


function AdoptionOrders() 
{
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
   }
 }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order ID</TableHead>
              <TableHead className="text-left">Order Date</TableHead>
              <TableHead className="text-left">Order Status</TableHead>
              <TableHead className="text-left">Order Price</TableHead>
              <TableHead className="text-left">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell className="font-medium truncate max-w-[150px] text-left">{orderItem?._id}</TableCell>
                  <TableCell className="text-left">{orderItem?.adoptionDate?.split("T")[0]}</TableCell>
                  <TableCell className="text-left">
                    <Badge
                      variant={
                         orderItem?.adoptionStatus === "approved" ? "success" :
                         orderItem?.adoptionStatus === "rejected" ? "destructive" :
                         orderItem?.adoptionStatus === "completed" ? "info" :
                         "secondary"
                       }
                    >
                      {orderItem?.adoptionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left">${(orderItem?.adoptionFee || 0).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                     <Dialog
                        open={openDetailsDialog && orderDetails?._id === orderItem._id}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                             setOpenDetailsDialog(false);
                             dispatch(resetOrderDetails());
                          }
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          Details
                        </Button>
                        {orderDetails?._id === orderItem._id && (
                             <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        )}
                      </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
               <TableRow>
                   <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                       You don't have any adoption applications registered.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdoptionOrders;