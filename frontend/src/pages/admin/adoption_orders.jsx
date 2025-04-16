import AdminAdoptionOrders from "../../components/admin/adoption_orders";
import AdoptedPetsHistory from "../../components/admin/adopted_pets_history";

function AdminAdoption_Orders() {
  return (
    <div className="space-y-6">
      <AdminAdoptionOrders />
      <AdoptedPetsHistory />
    </div>
  );
}

export default AdminAdoption_Orders;