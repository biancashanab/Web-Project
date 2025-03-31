import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import accVideo from "../../assets/account.mp4";
import Address from "../../components/shopping/address";
import ShoppingOrders from "../../components/shopping/adoption_orders";
import Footer from "../../components/common/footer/footer";

function ShoppingAccount() 
{
  return (
    <div className="flex flex-col">
      <div className="relative h-[435px] w-full overflow-hidden">
      <video
          src={accVideo}
          className="h-full w-full object-cover object-top"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Adoption Orders</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <ShoppingOrders />
          </TabsContent>
          <TabsContent value="address">
            <Address />
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <Footer />
      </div>
    </div>
    
  );
}

export default ShoppingAccount;
