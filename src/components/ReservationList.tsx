'use client'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import  getReservations  from '@/libs/getReservations';
import deleteReservation from '@/libs/deleteReservation';
import LinearProgress from '@mui/material/LinearProgress';
import updateReservation from '@/libs/updateReservation';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import getRestaurants from '@/libs/getRestaurants';
import DateReserve from './DateReserve';
import  Dayjs  from 'dayjs';
import { useRouter } from 'next/navigation';
import getMenu from '@/libs/getMenu';
import { setEmitFlags } from 'typescript';

export default function BookingList({profile}:{profile:any}) {

    const router = useRouter()

    const { data: session, status } = useSession();
    const [allReservation, setAllReservation] = useState<any>(null);

    const [RestaurantResponse, setRestaurantResponse] = useState<any>(null);
    

    useEffect(() => {
        const fetchData = async () => {
        console.log("finding");
        const Restaurants = await getRestaurants();
        setRestaurantResponse(Restaurants);
        const reservations = await getReservations(session?.user.token || "");
        setAllReservation(reservations.data);
      };
      fetchData();
    }, []);
  
    const [bookingDate, setBookingDate] = useState(Dayjs);
    const [location, setLocation] = useState('');

    function formatDate(time: Date | number): string {
        const months: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        let dateObj: Date = new Date(time);
        dateObj.setHours(dateObj.getHours() - 7);
    

        const day: string = ('0' + dateObj.getDate()).slice(-2);
        const monthIndex: number = dateObj.getMonth();
        const month: string = months[monthIndex];
        const year: number = dateObj.getFullYear();
        const hour: string = ('0' + dateObj.getHours()).slice(-2);
        const minute: string = ('0' + dateObj.getMinutes()).slice(-2);
        return `${day} ${month} ${year} ${hour}:${minute}`;
    }    

    if(!allReservation){return <p>Loading ... <LinearProgress/></p>}

    return (
        <>
            {profile && (
                <div className="bg-slate-200 rounded mx-5 py-2 my-2 text-black" key={profile.data.id}>
                    <table className='table-auto border-separate border-spacing-2 bg-gray-100 rounded'>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{profile.data.name}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{profile.data.email}</td>
                            </tr>
                            <tr>
                                <td>Tel.</td>
                                <td>{profile.data.telephone}</td>
                            </tr>
                            <tr>
                                <td>Member since:</td>
                                <td>{formatDate(profile.data.createdAt)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {allReservation.length > 0 ? (
                allReservation.map((item: any) => (
                    <table className="w-full divide-y divide-gray-200 rounded-lg overflow-hidden text-black">
                        <tbody className="divide-y divide-gray-200">
                            <tr className="text-left text-sm font-medium text-gray-600">
                                <td className="px-6 py-3">Restaurant:</td>
                                <td className="px-6 py-3">{item.restaurant.name}</td>
                            </tr>
                            <tr className="text-left text-sm font-medium text-gray-600">
                                <td className="px-6 py-3">Reservation Date:</td>
                                <td className="px-6 py-3">{formatDate(item.apptDate)}</td>
                            </tr>
                            <tr className="text-left text-sm font-medium text-gray-600">
                                <td className="px-6 py-3">Food Order:</td>
                                <td className="px-6 py-3">{item.foodOrder}</td>
                                <td className="px-6 py-3">
                                    <button className="rounded-md bg-orange-600 hover:bg-yellow-300 px-3 py-1 text-white shadow-sm" 
                                    onClick={()=>{router.push(`/Orderfood/${item._id}`)}}>
                                        Order food
                                    </button>
                                </td>
                            </tr>
                            <tr className="text-left text-sm font-medium text-gray-600">
                                <td className="px-6 py-3">Change reservation to:</td>
                                <td className="px-6 py-3"><DateReserve onDateChange={(value:any) => { setBookingDate(value) }} /></td>
                            </tr>
                            <tr className="text-left text-sm font-medium text-gray-600">
                                <td className="px-6 py-3">Change Restaurant to:</td>
                                <td className="px-6 py-3">
                                    <Select variant="standard" name="location" className="h-[em] w-[200px]" value={location} onChange={(e)=>{setLocation(e.target.value);}}>
                                        {RestaurantResponse?.data.map((RestaurantItem:any)=>(
                                        <MenuItem value={RestaurantItem._id}>{RestaurantItem.name}</MenuItem>
                                        ))}
                                    </Select>
                                </td>
                            </tr>
                            <tr className="text-left text-sm font-medium text-gray-600">
                                <td className="px-6 py-3">Make reservation at:</td>
                                <td className="px-6 py-3">{formatDate(item.createdAt)}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3">
                                    <button className="block rounded-md bg-red-600 hover:bg-orange-600 px-3 py-1 text-white shadow-sm" onClick={async () => {
                                    await deleteReservation(item._id, session?.user.token || "");
                                    window.location.reload();
                                    }}>
                                    Cancel Reservation
                                    </button>
                                </td>
                                <td className="px-6 py-3">
                                    <button className="block rounded-md bg-green-600 hover:bg-green-800 px-3 py-1 text-white shadow-sm" onClick={async () => {
                                    await updateReservation(item._id, session?.user.token || "", bookingDate, location);
                                    window.location.reload();
                                    }}>
                                        Update Reservation
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))
            ) : (
                <div className="bg-slate-200 rounded-px mx-5 py-2 my-2 text-xl text-black">No Reservation</div>
            )}
        </>
    );
}
