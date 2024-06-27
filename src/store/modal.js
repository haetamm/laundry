const DEFAULT_STATE = {
    isOpen: false,
    modalType: "",
    url: "",
    actionType: "",
    fetch: null
}

export const modalReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "MODAL_LOGOUT":
            return { ...state, isOpen: true, modalType: "kecil", actionType: "logout" }
        case "DELETE": 
            return { ...state, isOpen: true, modalType: "kecil", url: action.payload.url, actionType: "delete" }
        case "CREATE":
            return { ...state, isOpen: true, modalType: "besar", url: action.payload.url, actionType: "create" }
        case "SET_FETCH":
            return { ...state, fetch: action.payload.fetch }
        case "CLOSE":
            return { ...state, isOpen: false }
        default:
            return state
    }
}