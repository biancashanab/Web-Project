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

  const { petList } = useSelector((state) => state.adminPets);
  const dispatch = useDispatch();

  function onSubmit(event) 
  {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllPets());
            setFormData(initialFormData);
            setOpenCreatePetDialog(false);
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
            toast({
              title: "Pet advertisement added successfully",
            });
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

  console.log(formData, "petList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreatePetsDialog(true)}>
          Add Pet Advertisement
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {petList && petList.length > 0
          ? petList.map((petItem) => (
              <AdminPetTile
                setFormData={setFormData}
                setOpenCreatePetsDialog={setOpenCreatePetsDialog}
                setCurrentEditedId={setCurrentEditedId}
                pet={petItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreatePetsDialog}
        onOpenChange={() => {
          setOpenCreatePetsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
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
    </Fragment>
  );
}

export default AdminPets;