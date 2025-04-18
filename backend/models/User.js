import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "user",
    },
  }, { timestamps: true });
  
  const User = mongoose.model("User", UserSchema);
  export default User;
