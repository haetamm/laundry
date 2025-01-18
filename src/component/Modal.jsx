import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/api";
import UserModalForm from "./auth/UserModalForm";
import ProductModalForm from "./auth/ProductModalForm";
import CustomerModalForm from "./auth/CustomerModalForm";
import TransactionModalForm from "./auth/TransactionModalForm";

import "../styles/component/modal.scss";
import { logout } from "../store/sliceUser";
import { closeModal } from "../store/sliceModal";
import { deleteAdmin } from "../store/sliceAdmin";
import { deleteCustomer } from "../store/sliceCustomer";
import { deleteProduct } from "../store/sliceProduct";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType, actionType, url, id } = useSelector(
    (state) => state.modal
  );

  const handleButton = async (actionType) => {
    if (actionType === "logout") {
      const response = await axiosInstance.delete("/auth/logout");
      if (response) {
        dispatch(logout());
        dispatch(closeModal());
      }
    }
    if (actionType === "delete") {
      if (url === "users") return dispatch(deleteAdmin({ url, id }));
      if (url === "customers") return dispatch(deleteCustomer({ url, id }));
      if (url === "products") return dispatch(deleteProduct({ url, id }));
    }
  };

  return (
    <>
      {" "}
      {isOpen && (
        <div id="myModal" className="modal-custom">
          <div
            className={`modal-content ${
              modalType !== "kecil" ? "mt-besar" : "mt-kecil"
            }`}
          >
            <div
              className={`modal-card ${
                modalType !== "kecil" ? "besar-modal" : "kecil-modal"
              }`}
            >
              <div className="modal-card-kecil__body">
                <div className="close-wrap flex justify-end">
                  <div onClick={() => dispatch(closeModal())} className="close">
                    &times;
                  </div>
                </div>
                {modalType === "besar" && (
                  <div className="besar-modal__wrap">
                    <div className="besar-modal__title"></div>
                    {url === "users" && <UserModalForm />}

                    {url === "products" && <ProductModalForm />}

                    {url === "customers" && <CustomerModalForm />}

                    {url === "transactions" && <TransactionModalForm />}
                  </div>
                )}

                {modalType === "kecil" && (
                  <>
                    <div>{actionType == "logout" ? "Logout" : "Delete"} ??</div>
                    <div className="wrap-button flex justify-end">
                      <button
                        onClick={() => handleButton(actionType)}
                        className="pointer button-custom"
                      >
                        Yes
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
