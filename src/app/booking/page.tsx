"use client"
import DateReserve from '@/components/DateReserve';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import getUserProfile from '@/libs/getUserProfile';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getHospitals from '@/libs/getHospitals';
import createdReservation from '@/libs/createdReservation';
import { useSession } from 'next-auth/react';

export default function BookingPage() {

  const [hospitalResponse, setHospitalResponse] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("finding");
      const hospitals = await getHospitals();
      setHospitalResponse(hospitals);
      /*const session = await getServerSession(authOptions);
      if (session && session.user.token) {*/
        const userProfile = await getUserProfile(session.user.token);
        setProfile(userProfile);
      //}*/
    };
    fetchData();
  }, []);

  const [bookingDate, setBookingDate] = useState(null);
  const [location, setLocation] = useState('');
  const {data: session, status} = useSession()

  const makeReservation = async () => {
    console.log("Making a booking...");
    console.log("Name:", profile.data._id);
    console.log("ID:", session.user.token);
    console.log("Booking Date:", bookingDate);
    console.log("Location:", location);
    if (bookingDate && location && profile) {
      try {
        await createdReservation(location, session.user.token, bookingDate,profile.data._id);
        console.log("Booking dispatched successfully.");
        alert("Reservation booking complete")
      } catch (error) {
        console.error("Failed to dispatch booking:", error);
      }
    } else {
      console.error("Some required fields are missing. Booking not dispatched.");
    }
  };

  return (
    <main className="flex flex-col items-center pt-6 pl-6 w-full">
      <div className="text-xl font-medium mt-6">{profile ? "Reserve seat in the name of "+ profile.data.name : "Please login to make reservation"}</div>
      <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Please choose the restaurant
            </label>
            <div className="mt-2">
              <Select
                variant="standard"
                name="location"
                id="location"
                className="h-[em] w-[200px]"
                value={location}
                onChange={(e)=>{setLocation(e.target.value);
                }}>
                {hospitalResponse?.data.map((hospitalItem:any)=>(
                <MenuItem value={hospitalItem._id}>{hospitalItem.name}</MenuItem>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Choose your reservation date
            </label>
            <div className="mt-2">
              <DateReserve onDateChange={(value:any) => { setBookingDate(value) }} />
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

/*<table className='table-auto border-separate border-spacing-2 bg-gray-100'>
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
      </table>*/
