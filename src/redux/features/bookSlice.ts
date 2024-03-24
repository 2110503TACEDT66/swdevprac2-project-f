import { configureStore, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BookingItem} from "../../../interface.js";

type BookState = {
    bookItems:BookingItem[]
}

const initialState:BookState={bookItems:[]}

export const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers:{
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            console.log("Add success");
            const { id } = action.payload;
            const existingBookingIndex = state.bookItems.findIndex(item => item.id === id);
            if (existingBookingIndex !== -1) {
                state.bookItems[existingBookingIndex] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        }
        ,
        removeBooking: (state,action:PayloadAction<string>)=>{
            const remainItem = state.bookItems.filter(obj =>{
                return ((obj.id!=action.payload))
            })
            state.bookItems = remainItem
        }
}
})

export const {addBooking,removeBooking} = bookSlice.actions
export default bookSlice.reducer
