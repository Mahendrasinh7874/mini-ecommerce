import { createSlice } from "@reduxjs/toolkit"
import { userdata } from "../users"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem("user") || null,
        users: JSON.parse(localStorage.getItem(userdata)) || []
    },
    reducers: {
        setUsers: (state, action) => {
            localStorage.setItem("users", JSON.stringify(action.payload))
            state.users = action.payload;
        },
        addUser: (state, action) => {
            localStorage.setItem("users", JSON.stringify([...state.users, action.payload]))
            state.users = [...state.users, action.payload];
        },
        editUser: (state, action) => {
            const updatedUser = state.users.map(user => user.id === action.payload.id ? action.payload : user)

            localStorage.setItem("users", JSON.stringify(updatedUser))
            state.users = updatedUser;
        },
        login: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload))
            state.user = action.payload
        }
    },
})

export const { setUsers, addUser, login, editUser } = authSlice.actions

export default authSlice.reducer