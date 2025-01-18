import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  modalType: "",
  url: "",
  actionType: "",
  id: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalLogout: (state) => {
      state.isOpen = true;
      state.modalType = "kecil";
      state.actionType = "logout";
    },
    modalDelete: (state, action) => {
      state.isOpen = true;
      state.modalType = "kecil";
      state.url = action.payload.url;
      state.actionType = "delete";
      state.id = action.payload.id;
    },
    modalCreate: (state, action) => {
      state.isOpen = true;
      state.modalType = "besar";
      state.url = action.payload.url;
      state.actionType = "create";
    },
    modalUpdate: (state, action) => {
      state.isOpen = true;
      state.modalType = "besar";
      state.url = action.payload.url;
      state.actionType = "update";
      state.id = action.payload.id;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.url = "";
      state.modalType = "";
      state.id = "";
      state.modalType = "";
    },
  },
});

export const {
  modalLogout,
  modalDelete,
  modalCreate,
  modalUpdate,
  setFetch,
  closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
