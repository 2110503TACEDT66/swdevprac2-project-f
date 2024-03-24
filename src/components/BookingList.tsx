"use client"

import { removeBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"

export default function BookingList() {
    const bookingItem = useAppSelector((state) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            {bookingItem.length > 0 ? (
                bookingItem.map((item) => (
                    <div className="bg-slate-200 rounded-px mx-5 py-2 my-2 text-black" key={item.id}>
                        <table className='table-auto border-separate border-spacing-2 bg-gray-100'>
                            <tbody>
                                <tr>
                                    <td>FirstName</td>
                                    <td>{item.name}</td>
                                </tr>
                                <tr>
                                    <td>LastName</td>
                                    <td>{item.surname}</td>
                                </tr>
                                <tr>
                                    <td>Citizen-ID</td>
                                    <td>{item.id}</td>
                                </tr>
                                <tr>
                                    <td>Hospital</td>
                                    <td>{item.hospital}</td>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>{item.bookDate}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                    <button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-400"
                                        onClick={() => { dispatch(removeBooking(item.id)) }} name='remove'>
                                        remove
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                ))
            ) : (
                <div className="bg-slate-200 rounded-px mx-5 py-2 my-2 text-xl text-black">No Vaccine Booking</div>
            )}
        </>
    );
}
