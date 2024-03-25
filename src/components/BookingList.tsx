'use client'
import { useSession } from 'next-auth/react';
import { Suspense, useEffect, useState } from 'react';
import  getReservations  from '@/libs/getReservations';
import deleteReservation from '@/libs/deleteReservation';
import LinearProgress from '@mui/material/LinearProgress';

export default function BookingList({profile}:{profile:any}) {

    const { data: session, status } = useSession();
    const [allReservation, setAllReservation] = useState<any>(null);

    useEffect(() => {
        if (status === 'authenticated' && session) {
            fetchData(session);
        }
    }, [status, session]);

    async function fetchData(session: any) {
        try {
            const reservations = await getReservations(session.user.token);
            setAllReservation(reservations.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function formatDate(time: Date | number): string {
        const months: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ];
        const dateObj: Date = new Date(time);
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
                    <table className="w-full divide-y divide-gray-200 rounded-lg overflow-hidden text-black flex">
                        <tbody className="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">
                            <tr>
                                <td>Restaurant:</td>
                                <td>{item.restaurant.name}</td>
                            </tr>
                            <tr>
                                <td>Reservation Date:</td>
                                <td>{formatDate(item.apptDate)}</td>
                            </tr>
                            <tr>
                                <td>Food Order.</td>
                                <td>{item.foodOrder}</td>
                            </tr>
                            <tr>
                                <td>Restaurant telephone:</td>
                                <td>{item.restaurant.tel}</td>
                            </tr>
                            <tr>
                                <td>Make reservation at:</td>
                                <td>{formatDate(item.createdAt)}</td>
                            </tr>
                            <tr>
                            <button
                                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
                                onClick={async () => {
                                    await deleteReservation(item._id, session?.user.token || '');
                                    window.location.reload();
                                }}>
                                cancel reservation
                            </button>
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
