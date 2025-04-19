import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: JSON.parse(localStorage.getItem("products")) || [],
        cart: JSON.parse(localStorage.getItem("cart")) || []
    },
    reducers: {
        setProducts: (state, action) => {
            localStorage.setItem("products", JSON.stringify(action.payload))
            state.products = action.payload
        },
        storeCart: (state, action) => {
            localStorage.setItem("cart", JSON.stringify(action.payload))
            state.cart = [...state.cart, ...action.payload]
        },
        updateCart: (state, action) => {
            localStorage.setItem("cart", JSON.stringify(action.payload))
            state.cart = action.payload
        },

    }
})

export const { setProducts, storeCart, updateCart } = productSlice.actions

export default productSlice.reducer