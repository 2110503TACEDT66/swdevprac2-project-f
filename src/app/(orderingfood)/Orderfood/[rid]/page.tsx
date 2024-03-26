
import getRestaurant from '@/libs/getRestaurant';
import getMenu from '@/libs/getMenu';
import Image from 'next/image';
import getReservation from '@/libs/getReservation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LinearProgress } from '@mui/material';
import { getServerSession } from 'next-auth';


export default async function Foodorder({params}:{params:{rid:string}}){

    const session = await getServerSession(authOptions);
    let MenuResponse = null
    let RestaurantDetail = null

    if (session) {
        const ReservationDetail = await getReservation(params.rid,session.user.token)
        const restaurantID = ReservationDetail.data.restaurant
        RestaurantDetail = await getRestaurant(restaurantID._id)
        MenuResponse = await getMenu(RestaurantDetail.data._id)
    } else {
        
        return  <p className='text-black text-xl text-center'>Please go back and login ... <LinearProgress /></p>;
    }
  
    if(!MenuResponse) return (<p>Menu is Loading</p>)

    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{RestaurantDetail.data.name}</h1>
            <div className="grid grid-cols-3 gap-4">
                {MenuResponse.date.map((RestaurantItem:any, index:number)=>(
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="aspect-w-16 aspect-h-9 mb-4 content-center flex justify-center">
                        <Image src={RestaurantItem.image} alt="Product Picture" width={300} height={300} className="object-cover rounded-lg"/>
                    </div>
                    <div className="text-center">
                    <h3 className="text-lg font-semibold">{RestaurantItem.name} : {RestaurantItem.price} ฿</h3>
                    </div>
                    </div>
                ))}
            </div>
        </main>
    )
}