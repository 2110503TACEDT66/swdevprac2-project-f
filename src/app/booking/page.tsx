"use client"
import DateReserve from '@/components/DateReserve';
import TextField from '@mui/material/TextField';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUserProfile from '@/libs/getUserProfile';
import { useSearchParams } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {AppDispatch} from "@/redux/store"
import { ReservationItem } from '../../../interface';
import {addBooking} from '@/redux/features/bookSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getHospitals from '@/libs/getHospitals';

export default async function BookingPage() {

  const hospitalResponse = await getHospitals()

  const session = await getServerSession(authOptions)
  if(!session||!session.user.token) return null

  const profile = await getUserProfile(session.user.token)
  var createdAt = new Date(profile.data.createdAt)

  //const urlParams = useSearchParams()
  //const name = urlParams.get('Name-Lastname')
  //const id = urlParams.get('Citizen-ID')
  const [bookingDate,setBookDate] = useState<Dayjs|null>(null)
  const [location,setLocation] = useState("")
  const [id,setId] = useState("")
  const [name,setName] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const makeBooking = () => {
  if (name && id && bookingDate && location) {
    const item: ReservationItem = {
      _id : id,
      user: name,
      restaurant: id,
      foodOrder : [],
      apptDate: dayjs(bookingDate)?.format("YYYY/MM/DD")
    };
    console.log("Booking Item:", item);
    dispatch(addBooking(item));
    console.log("Booking dispatched successfully.");
  } else {
    console.error("Some required fields are missing. Booking not dispatched.");
  }
};

  return (
    <main className="flex flex-col items-center">
      <table className='table-auto border-separate border-spacing-2 bg-gray-100'>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{profile.data.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{profile.data.email}</td>
          </tr>
          <tr>
            <td>Tel.</td>
            <td>{profile.data.tel}</td>
          </tr>
          <tr>
            <td>Member Since</td>
            <td>{createdAt.toString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-xl font-medium mt-6">Restautant Reserve in the name of {profile.data.name}</div>
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Please choose the restaurant
            </label>
            <div className="mt-2">
            <Select variant="standard" name="location" id="loaction" className="h-[em] w-[200px]" value={location}
            onChange={(e)=>{setLocation(e.target.value)}}>
              {
              hospitalResponse.data.map((hospitalItem:any)=>(
                <MenuItem value = {hospitalItem.name}>{hospitalItem.name}</MenuItem>
            ))
              }
            </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Choose your reservation date
            </label>
            <div className="mt-2">
            <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}/>
            </div>
          </div>
          <div>
            <button
              type='button'
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-indigo-400"
              onClick={makeBooking} name='Book Vaccine'>
              Book Vaccine
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
