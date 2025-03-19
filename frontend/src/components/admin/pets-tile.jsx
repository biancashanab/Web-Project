import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminPetTile({
  pet,
  setFormData,
  setOpenCreatePetsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={pet?.image}
            alt={pet?.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{pet?.name}</h2>
          <p className="text-gray-600">{pet?.breed}</p>
          <p className="text-gray-600">Age: {pet?.age} years</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreatePetsDialog(true);
              setCurrentEditedId(pet?._id);
              setFormData(pet);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(pet?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminPetTile;