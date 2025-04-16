import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetHistory, clearPetHistory } from '../../store/admin/pets';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2 } from 'lucide-react';

const PetHistory = ({ petId }) => {
  const dispatch = useDispatch();
  const { petHistory, historyLoading, historyError } = useSelector((state) => state.adminPets);

  useEffect(() => {
    if (petId) {
      dispatch(fetchPetHistory(petId));
    }
    return () => {
      dispatch(clearPetHistory());
    };
  }, [dispatch, petId]);

  if (historyLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (historyError) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading pet history: {historyError}
      </div>
    );
  }

  if (!petHistory) {
    return null;
  }

  const { pet, adoptionHistory } = petHistory;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pet History - {pet.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Pet Details */}
          <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
            {pet.image && (
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg">{pet.name}</h3>
              <p className="text-sm text-muted-foreground">
                {pet.species} • {pet.breed}
              </p>
              <p className="text-sm mt-1">
                Status: <span className={`font-medium ${pet.status === 'adopted' ? 'text-green-600' : 'text-blue-600'}`}>
                  {pet.status}
                </span>
              </p>
              {pet.adoptedBy && (
                <p className="text-sm mt-1">
                  Adopted by: {pet.adoptedBy.userName} ({pet.adoptedBy.email})
                </p>
              )}
              {pet.adoptionDate && (
                <p className="text-sm mt-1">
                  Adoption Date: {new Date(pet.adoptionDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Adoption History */}
          <div>
            <h3 className="font-semibold mb-3">Adoption History</h3>
            {adoptionHistory.length > 0 ? (
              <div className="space-y-4">
                {adoptionHistory.map((order) => (
                  <div key={order.orderId} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Order #{order.orderId.slice(-6)}</p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className={`font-medium ${
                            order.status === 'completed' ? 'text-green-600' : 
                            order.status === 'pending_review' ? 'text-yellow-600' : 
                            'text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>Created: {new Date(order.adoptionDate).toLocaleDateString()}</p>
                        <p>Last Updated: {new Date(order.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {order.adopterInfo && (
                      <div className="mt-2 text-sm">
                        <p>Adopter: {order.adopterInfo.fullName}</p>
                        <p>Contact: {order.adopterInfo.email} • {order.adopterInfo.phone}</p>
                        <p>Address: {order.adopterInfo.address}, {order.adopterInfo.city}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No adoption history found for this pet.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PetHistory; 