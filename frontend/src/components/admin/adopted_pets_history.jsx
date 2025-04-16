import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Loader2 } from "lucide-react";
import { fetchAdoptedPetsHistory } from "../../store/admin/adopted_pets_history";

function AdoptedPetsHistory() {
  const dispatch = useDispatch();
  const { adoptedPets, isLoading, error } = useSelector((state) => state.adoptedPetsHistory);

  useEffect(() => {
    dispatch(fetchAdoptedPetsHistory());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adopted Pets History</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}

        <div className="max-h-[550px] overflow-y-auto relative">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="text-center">Pet Name</TableHead>
                <TableHead className="text-center">Species</TableHead>
                <TableHead className="text-center">Breed</TableHead>
                <TableHead className="text-center">Adopted By</TableHead>
                <TableHead className="text-center">Adoption Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && adoptedPets.length === 0 && !error && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                    No adopted pets history found.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && adoptedPets.map((pet) => (
                <TableRow key={pet._id}>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {pet.image && (
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span>{pet.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{pet.species}</TableCell>
                  <TableCell className="text-center">{pet.breed}</TableCell>
                  <TableCell className="text-center">
                    {pet.adoptedBy ? (
                      <div>
                        <div>{pet.adoptedBy.userName}</div>
                        <div className="text-xs text-muted-foreground">{pet.adoptedBy.email}</div>
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {pet.adoptionDate ? new Date(pet.adoptionDate).toLocaleDateString() : 'N/A'}
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

export default AdoptedPetsHistory; 