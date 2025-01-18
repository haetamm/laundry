import { configureStore } from "@reduxjs/toolkit";
import sliceLoginReducer from "./sliceLogin";
import sliceUserReducer from "./sliceUser";
import modalReducer from "./sliceModal";
import transactionReducer from "./sliceTransaction";
import productReducer from "./sliceProduct";
import customerReducer from "./sliceCustomer";
import adminReducer from "./sliceAdmin";

export const store = configureStore({
  reducer: {
    login: sliceLoginReducer,
    user: sliceUserReducer,
    modal: modalReducer,
    transaction: transactionReducer,
    product: productReducer,
    customer: customerReducer,
    admin: adminReducer,
  },
});
