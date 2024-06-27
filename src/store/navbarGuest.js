const DEFAULT_STATE = {
    isOpen: false,
}

export const navbarGuestReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "CLOSE_NAVBAR_GUEST":
            return { ...state, isOpen: false }
        case "OPEN_NAVBAR_GUEST":
            return { ...state, isOpen: true }
        default:
            return state
    }
}