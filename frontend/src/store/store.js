import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import AdminPetsSlice from "./admin/pets";
import AdminOrderSlice from "./admin/adoption_order";
import adminStatsReducer from "./admin/stats";
import adminUsersReducer from "./admin/users";

import shopPetsSlice from "./shop/pets";
import shopCartSlice from "./shop/cart";
import shopAddressSlice from "./shop/address";
import shopOrderSlice from "./shop/order";
import shopSearchSlice from "./shop/search";
import shopReviewSlice from "./shop/review";
import commonFeatureSlice from "./common";

const store = configureStore({
    reducer: {
      auth: authReducer,

      adminPets: AdminPetsSlice,
      adminAdoptionOrder: AdminOrderSlice,
      adminStats: adminStatsReducer,
      adminUsers: adminUsersReducer,

      shopPets: shopPetsSlice,
      shopCart: shopCartSlice,
      shopAddress: shopAddressSlice,
      shopOrder: shopOrderSlice,
      shopSearch: shopSearchSlice,
      shopReview: shopReviewSlice,
  
      commonFeature: commonFeatureSlice,
    },
  });
  
  export default store;
