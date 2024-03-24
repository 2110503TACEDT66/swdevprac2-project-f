"use client"
import DateReserve from '@/components/DateReserve';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUserProfile from '@/libs/getUserProfile';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getHospitals from '@/libs/getHospitals';
import createdReservation from '@/libs/createdReservation';

export default async function BookingPage() {

  const hospitalResponse = await getHospitals()

  const session = await getServerSession(authOptions)
  if(!session||!session.user.token) return null

  const profile = await getUserProfile(session.user.token)

  const [bookingDate,setBookDate] = useState<Dayjs|null>(null)
  const [location,setLocation] = useState("")

  const makeReservation = () => {
  if  ( bookingDate && location) {
    createdReservation(profile.data._id,session.user.token,bookingDate,location);
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
                <MenuItem value = {hospitalItem._id}>{hospitalItem.name}</MenuItem>
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
              onClick={makeReservation} name='Reserve'>
              Reserve My Seat now!!!
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
