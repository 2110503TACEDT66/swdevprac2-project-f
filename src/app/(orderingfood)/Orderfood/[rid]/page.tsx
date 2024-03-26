'use client'
import getRestaurant from '@/libs/getRestaurant';
import getMenu from '@/libs/getMenu';
import Image from 'next/image';
import getReservation from '@/libs/getReservation';
import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import orderFood from '@/libs/orderFood';


export default function Foodorder({params}:{params:{rid:string}}){
    const { data: session, status } = useSession();
    const [RestaurantDetail, setRestaurantDetail] = useState<any>(null);
    const [MenuResponse, setMenuResponse] = useState<any>(null);
    const [reservation, setreservation] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
        console.log("finding");
        if (session) {
            const reservation = await getReservation(params.rid,session.user.token)
            setreservation(reservation)
            const restaurantID = reservation.data.restaurant
            const restaurant = await getRestaurant(restaurantID._id)
            setRestaurantDetail(restaurant)
            const menu= await getMenu(restaurant.data._id)
            setMenuResponse(menu)
        } else {
            return  <p className='text-black text-xl text-center'>Please go back and login ... <LinearProgress /></p>;
        }
      };
      fetchData();
    }, []);

    const handleOnClick = (item:any) => {
        const res = orderFood(reservation.data._id,session?session.user.token:"",item._id)
        res.then(result => {
            if(result.success) {
                alert("order successfully")
            } else {
                alert("order failed")
            }
        })
    }

    
    if(!MenuResponse||!RestaurantDetail) return (<p className='text-black text-xl text-center'>Menu is Loading ... <LinearProgress /></p>)

    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{RestaurantDetail.data.name}</h1>
            <div className="grid grid-cols-3 gap-4">
                {
                MenuResponse.data.map((item:any, index:number)=>(
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="aspect-w-16 aspect-h-9 mb-4 content-center flex justify-center">
                        <Image src={item.image} alt="Product Picture" width={300} height={300} className="object-cover rounded-lg"/>
                    </div>
                    <div className="text-center">
                    <h3 className="text-lg font-semibold">{item.name} : {item.price} ฿</h3>
                    <button className="rounded-md bg-orange-600 hover:bg-yellow-300 px-3 py-1 text-white shadow-sm" 
                    onClick={()=>handleOnClick(item)}>
                        Click here to add order
                    </button>
                    </div>
                    </div>
                ))
                }
            </div>
        </main>
    )
}