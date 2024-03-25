
import { useEffect, useReducer, useRef, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import getRestaurants from "@/libs/getRestaurants";

export default async function CardPanel(){

    const RestaurantResponse = await getRestaurants()

    if(!RestaurantResponse) return (<p>Restaurant is Loading</p>)

    return(
    <main>
      <div style={{margin:"20px", display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",alignContent:"space-around"}}>
        {
            RestaurantResponse.data.map((RestaurantItem:any)=>(
                <Link href={`/Restaurant/${RestaurantItem._id}`} className="w-1/5">
                <Card RestaurantName={RestaurantItem.name} imgSrc={RestaurantItem.image}/>
                 </Link>
            ))
        }
      </div>
      {/*<div className="text-xl font-medium text-black text-center pt-12 mt-6"> Restaurant list: {RestaurantList.size}</div>
      <div>
        {Array.from(RestaurantList).map((RestaurantMap, index) => {
            const [[RestaurantName, rating]] = Array.from(RestaurantMap.entries());
            return <div key={index} data-testid={RestaurantName} className="text-black text-center mb-4" onClick={()=>dispatch({type:"remove", RestaurantName:RestaurantName,rating:rating})}>
                {RestaurantName} Rating: {rating}
                </div>;
        })}
    </div>*/} 
    </main>
    )
} 
