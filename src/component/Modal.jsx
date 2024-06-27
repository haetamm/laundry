import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie";
import axiosInstance from '../utils/api';
import { toast } from 'sonner';
import UserModalForm from './auth/UserModalForm';
import ProductModalForm from './auth/ProductModalForm';
import CustomerModalForm from './auth/CustomerModalForm';
import TransactionModalForm from './auth/TransactionModalForm';

import '../styles/component/modal.scss'

const Modal = () => {

    const dispatch = useDispatch()
    const { isOpen, modalType, actionType, url, fetch } = useSelector((state) => state.modal)

    const closeModal = () => {
        dispatch({
            type: "CLOSE"
        })
    }

    const handleButton = (actionType) => {
        if (actionType === "logout") {
            dispatch({
                type: "LOGOUT",
            })
            Cookies.remove('token')
        }
        if (actionType === "delete") {
            try {
                axiosInstance.delete(url)
                closeModal()
                fetch()
                toast.success(`${url.split('/')[1]} berhasil dihapus`, {duration: 2000})
            } catch (e) {
                if (e.response.status === 404) {
                    toast.error(e.response.data.status.description)
                }
            }
        }
        closeModal()
    }

    return (
    <> {
        isOpen && (
            <div id="myModal" className="modal-custom">
                <div className={`modal-content ${modalType !== "kecil" ? 'mt-besar' : 'mt-kecil'}`}>
                    <div className={`modal-card ${modalType !== "kecil" ? 'besar-modal' : 'kecil-modal'}`}>
                    <div className="modal-card-kecil__body">
                        <div className="close-wrap flex justify-end">
                            <div onClick={closeModal} className="close">&times;</div>
                        </div>
                        { modalType === "besar" &&
                            <div className="besar-modal__wrap">
                                <div className="besar-modal__title"></div>
                                { url === "users" && <UserModalForm /> }
                                        
                                { url === "products" && <ProductModalForm /> }
                                        
                                { url === "customers" && <CustomerModalForm /> }
                                
                                { url === "transactions" && <TransactionModalForm /> }
                            </div>
                        }

                        { modalType === "kecil" &&
                            <>
                                <div>{actionType == 'logout' ? 'Logout' : 'Delete'} ??</div>
                                <div className="wrap-button flex justify-end">
                                    <button onClick={() => handleButton(actionType)} className="pointer button-custom">Yes</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
                </div>
            </div>
        )
        }
    </>
    )
}

export default Modal
