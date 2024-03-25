
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth/next"

export default async function BookingList() {
    const months: string[] = [
        "January", "February", "March", "April", "May", "June", "July", 
        "August", "September", "October", "November", "December"
    ];
    
    const session = await getServerSession(authOptions)
    if(!session||!session.user.token) return null
  
    const profile = await getUserProfile(session.user.token)
    const time = profile.data.createdAt
    const dateObj: Date = new Date(time);
    const day: string = ("0" + dateObj.getDate()).slice(-2);
    const monthIndex: number = dateObj.getMonth();
    const month: string = months[monthIndex];
    const year: number = dateObj.getFullYear();
    
    const formattedDate: string = `${day} ${month} ${year}`;

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
                            <td>{formattedDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                <div className="bg-slate-200 rounded-px mx-5 py-2 my-2 text-xl text-black">No Reservation</div>
            }
            
        </>
    );
}
