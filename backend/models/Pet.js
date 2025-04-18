import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    name: String,
    age: Number,
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    species: String,
    breed: String,
    colour: String,
    size: String,
    description: String,
    status: { 
      type: String, 
      enum: ['available', 'adopted'],
      default: 'available'
    },
    adoptionDate: {
      type: Date,
      default: null
    },
    adoptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", PetSchema);
export default Pet;