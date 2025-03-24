import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import AdminPetsSlice from "./admin/pets";
import AdminOrderSlice from "./admin/adoption_order";


const store = configureStore({
    reducer: {
      auth: authReducer,
      adminPets: AdminPetsSlice,
      adminAdoptionOrder: AdminOrderSlice,
    },
  });
  
  export default store;
