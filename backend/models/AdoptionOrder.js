import mongoose from "mongoose";

const AdoptionOrderSchema = new mongoose.Schema({
  userId: String,
  petId: String,
  petDetails: {
    name: String,
    species: String,
    breed: String,
    age: Number,
    image: String,
  },
  adopterInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
    notes: String,
  },
  adoptionStatus: String,
  adoptionDate: Date,
  lastUpdated: Date,
});

const AdoptionOrder = mongoose.model("AdoptionOrder", AdoptionOrderSchema);
export default AdoptionOrder;

