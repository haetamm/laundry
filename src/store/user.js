import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

const token = Cookies.get('token')
let decodedToken = {}

if (token) {
    try {
        decodedToken = jwtDecode(token);
    } catch (e) {
        console.error('Invalid token', e);
    }
}

const DEFAULT_STATE = {
  userId: decodedToken.userId || "",
  role: decodedToken.role || "",
  token: token || ""
};

export const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, userId: action.payload.userId, role: action.payload.role, token: action.payload.token }
        case "LOGOUT":
            return { ...state, userId: "", role: "", token: "" }
        default:
            return state
    }
}