import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import AdminPetsSlice from "./admin/pets";
import AdminOrderSlice from "./admin/adoption_order";
import adminStatsReducer from "./admin/stats";
import adminUsersReducer from "./admin/users";
import adminContactMessagesReducer from "./admin/contact-messages";

import shopPetsSlice from "./shop/pets";
import shopCartSlice from "./shop/cart";
import shopAddressSlice from "./shop/address";
import shopOrderSlice from "./shop/order";
import shopSearchSlice from "./shop/search";
import shopReviewSlice from "./shop/review";
import shopAboutSlice from "./shop/about";
import commonFeatureSlice from "./common";
import contactSlice from "./common/contact-slice";
import contactMessagesReducer from "./contact";

const store = configureStore({
    reducer: {
      auth: authReducer,

      adminPets: AdminPetsSlice,
      adminAdoptionOrder: AdminOrderSlice,
      adminStats: adminStatsReducer,
      adminUsers: adminUsersReducer,
      adminContactMessages: adminContactMessagesReducer,

      shopPets: shopPetsSlice,
      shopCart: shopCartSlice,
      shopAddress: shopAddressSlice,
      shopOrder: shopOrderSlice,
      shopSearch: shopSearchSlice,
      shopReview: shopReviewSlice,
      shopAbout: shopAboutSlice,
  
      commonFeature: commonFeatureSlice,
      contact: contactSlice,
      contactMessages: contactMessagesReducer,
    },
  });
  
  export default store;
