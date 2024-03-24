
import { useEffect, useReducer, useRef, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import getHospitals from "@/libs/getHospitals";

export default async function CardPanel(){

    const hospitalResponse = await getHospitals()

    if(!hospitalResponse) return (<p>Hospital is Loading</p>)

    return(
    <main>
      <div style={{margin:"20px", display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",alignContent:"space-around"}}>
        {
            hospitalResponse.data.map((hospitalItem:any)=>(
                <Link href={`/hospital/${hospitalItem._id}`} className="w-1/5">
                <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.image}/>
                 </Link>
            ))
        }
      </div>
      {/*<div className="text-xl font-medium text-black text-center pt-12 mt-6"> Hospital list: {hospitalList.size}</div>
      <div>
        {Array.from(hospitalList).map((hospitalMap, index) => {
            const [[hospitalName, rating]] = Array.from(hospitalMap.entries());
            return <div key={index} data-testid={hospitalName} className="text-black text-center mb-4" onClick={()=>dispatch({type:"remove", hospitalName:hospitalName,rating:rating})}>
                {hospitalName} Rating: {rating}
                </div>;
        })}
    </div>*/} 
    </main>
    )
} 
