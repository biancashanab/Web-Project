import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    breed: String,
    species: String,
    age: Number,
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
export default Pet;