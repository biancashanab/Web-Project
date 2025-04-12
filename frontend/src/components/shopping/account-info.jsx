import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { updateUser } from "../../store/auth";
import CommonForm from "../common/form";
import { accountFormControls } from "../../config";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function AccountInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // Initialize form data with all fields
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: user?.email || "",
    fullName: user?.fullName || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
    phoneNumber: user?.phoneNumber || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only validate passwords if user is trying to change password
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        toast.error("Current password is required to change password");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New passwords do not match");
        return;
      }
    }

    try {
      // Dispatch update user info action
      const result = await dispatch(updateUser({
        userId: user.id,
        userName: formData.userName,
        email: formData.email,
        fullName: formData.fullName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        currentPassword: formData.currentPassword || undefined,
        newPassword: formData.newPassword || undefined
      })).unwrap();
      
      if (result.success) {
        toast.success("Account information updated successfully");
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
      } else {
        toast.error(result.message || "Failed to update account information");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error(error.message || "Failed to update account information");
    }
  };

  // Function to render a category of form fields
  const renderCategory = (category) => {
    return (
      <Card key={category.category} className="mb-6 shadow-md w-full">
        <CardHeader className="bg-gray-50 px-6 py-4">
          <CardTitle className="text-xl font-bold">{category.category}</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <CommonForm
            formControls={category.fields}
            formData={formData}
            setFormData={setFormData}
            buttonText={null} // No button for each category
            onSubmit={null} // No submit for each category
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Account Information</h2>
      <p className="text-gray-500 mb-6">Update your account details</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="grid grid-cols-1 gap-6 w-full">
          {accountFormControls.map(category => renderCategory(category))}
        </div>
        
        <Button type="submit" className="w-full mt-4">
          Update Information
        </Button>
      </form>
    </div>
  );
}

export default AccountInfo;