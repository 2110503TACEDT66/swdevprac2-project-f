
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getReservations from "@/libs/getReservations";
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth/next"

export default async function BookingList() {

    const session = await getServerSession(authOptions)
    if(!session||!session.user.token) return null
  
    const profile = await getUserProfile(session.user.token)
    function formatDate(time: Date | number): string {
        const months: string[] = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
    
        const dateObj: Date = new Date(time);
        const day: string = ("0" + dateObj.getDate()).slice(-2);
        const monthIndex: number = dateObj.getMonth();
        const month: string = months[monthIndex];
        const year: number = dateObj.getFullYear();
    
        return `${day} ${month} ${year}`;
    }

    const allReservation = await getReservations(session.user.token)

    return (
        <>
            <div className="bg-slate-200 rounded-px mx-5 py-2 my-2 text-black" key={profile.data.id}>
                <table className='table-auto border-separate border-spacing-2 bg-gray-100'>
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
            {
                allReservation? allReservation.data.map((item:any)=>(
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
                    </tbody>
                </table>
                ))
                : <div className="bg-slate-200 rounded-px mx-5 py-2 my-2 text-xl text-black">No Reservation</div>
            }
        </>
    );
}
