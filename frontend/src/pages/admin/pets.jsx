import ProductImageUpload from "../../components/admin/image-upload";
import AdminPetTile from "../../components/admin/pets-tile";
import CommonForm from "../../components/common/form";
import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { toast } from "sonner";
import { addPetFormElements } from "../../config";
import {
  addNewPet,
  deletePet,
  editPet,
  fetchAllPets,
} from "../../store/admin/pets";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle} from "@radix-ui/react-dialog";
import PetHistory from "../../components/admin/pets-history";
import {
  Dialog,
  DialogContent,
} from "../../components/ui/dialog";

const initialFormData = {
  image: null,
  title: "",
  age: "",
  description: "",
  species: "", 
  breed: "",
};

function AdminPets() 
{
  const [openCreatePetsDialog, setOpenCreatePetsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);

  const { petList } = useSelector((state) => state.adminPets);
  const dispatch = useDispatch();

  function onSubmit(event) 
  {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editPet({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) 
          {
            dispatch(fetchAllPets());
            setFormData(initialFormData);
            setOpenCreatePetsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewPet({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllPets());
            setOpenCreatePetsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success(data?.payload?.message);
          }
        });
  }

  function handleDelete(getCurrentPetId) {
    dispatch(deletePet(getCurrentPetId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllPets());
      }
    });
  }

  function isFormValid() 
  {
    return Object.keys(formData)
                 .map((key) => formData[key] !== "")
                 .every((item) => item);
  }

  useEffect(() => { dispatch(fetchAllPets()); }, [dispatch]);

  const handleViewHistory = (petId) => {
    setSelectedPetId(petId);
    setOpenHistoryDialog(true);
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-8">
        {/* Available Pets Section */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Available Pets</h2>
            <Button onClick={() => setOpenCreatePetsDialog(true)}>
              Add Pet Advertisement
            </Button>
          </div>
          <div className="h-[550px] overflow-y-auto pr-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {petList && petList.filter(pet => pet.status !== 'adopted').length > 0
                ? petList
                    .filter(pet => pet.status !== 'adopted')
                    .map((petItem) => (
                      <AdminPetTile
                        key={petItem._id} 
                        setFormData={setFormData}
                        setOpenCreatePetsDialog={setOpenCreatePetsDialog}
                        setCurrentEditedId={setCurrentEditedId}
                        pet={petItem}
                        handleDelete={handleDelete}
                        onViewHistory={() => handleViewHistory(petItem._id)}
                      />
                    ))
                : <p className="text-gray-500">No pets available</p>}
            </div>
          </div>
        </div>

        {/* Adopted Pets Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Adopted Pets</h2>
          <div className="h-[550px] overflow-y-auto pr-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
              {petList && petList.filter(pet => pet.status === 'adopted').length > 0
                ? petList
                    .filter(pet => pet.status === 'adopted')
                    .map((petItem) => (
                      <AdminPetTile
                        key={petItem._id} 
                        setFormData={setFormData}
                        setOpenCreatePetsDialog={setOpenCreatePetsDialog}
                        setCurrentEditedId={setCurrentEditedId}
                        pet={petItem}
                        handleDelete={handleDelete}
                        onViewHistory={() => handleViewHistory(petItem._id)}
                      />
                    ))
                : <p className="text-gray-500">No adopted pets</p>}
            </div>
          </div>
        </div>
      </div>

      <Sheet
        open={openCreatePetsDialog}
        onOpenChange={() => {
          setOpenCreatePetsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto scrollbar-hide">
            <VisuallyHidden>
                <DialogTitle>Menu</DialogTitle>
              </VisuallyHidden>
          <SheetHeader>
            
            <SheetTitle>
              {currentEditedId !== null ? "Edit Pet Advertisement" : "Add New Pet Advertisement"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addPetFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Pet History Dialog */}
      <Dialog open={openHistoryDialog} onOpenChange={setOpenHistoryDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedPetId && <PetHistory petId={selectedPetId} />}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AdminPets;