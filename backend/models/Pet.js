import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    name: String,
    age: Number,
    species: String,
    breed: String,
    colour: String,
    size: String,
    description: String,
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
export default Pet;