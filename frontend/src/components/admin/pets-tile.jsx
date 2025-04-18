import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { History } from "lucide-react";

function AdminPetTile({
  pet,
  setFormData,
  setOpenCreatePetsDialog,
  setCurrentEditedId,
  handleDelete,
  onViewHistory,
}) {
  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      <div>
        <div className="relative">
          <img
            src={pet?.image}
            alt={pet?.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {pet?.status === 'adopted' && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Adopted
            </div>
          )}
        </div>
        <CardContent>
          <h3 className="text-lg font-semibold">{pet?.title}</h3>
          <h2 className="text-xl font-bold mb-2 mt-2">{pet?.name}</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">{pet?.breed}</p>
            <p className="text-gray-600">Age: {pet?.age} years</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-600">Gender: {pet?.gender || 'Unknown'}</p>
            <p className="text-gray-600">{pet?.species}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setOpenCreatePetsDialog(true);
                setCurrentEditedId(pet?._id);
                setFormData(pet);
              }}
              className="w-20">
              Edit
            </Button>
            {pet?.status === 'adopted' && (
              <Button 
                variant="outline"
                onClick={() => onViewHistory(pet?._id)}
                className="flex items-center gap-1 w-24"
              >
                <History className="h-4 w-4" />
                History
              </Button>
            )}
          </div>
          <Button 
            variant="destructive"
            onClick={() => handleDelete(pet?._id)}
            className="w-20"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminPetTile;