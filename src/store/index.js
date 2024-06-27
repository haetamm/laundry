import { combineReducers } from "redux";
import { userReducer } from "./user";
import { modalReducer } from "./modal";
import { navbarGuestReducer } from "./navbarGuest";

export const reducers = combineReducers({
    user: userReducer,
    modal: modalReducer,
    navbarGuest: navbarGuestReducer,
})