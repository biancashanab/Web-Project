import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import AdminPetsSlice from "./admin/pets";


const store = configureStore({
    reducer: {
      auth: authReducer,
      adminPets: AdminPetsSlice,
    },
  });
  
  export default store;
