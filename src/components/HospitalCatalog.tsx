import Link from "next/link";
import Card from "./Card";


export default  async function HospitalCatalog({hospitalsJson}:{hospitalsJson:any}){
    const hospitalReady = await hospitalsJson 
    return(
        <>
        <div className="text-black">Just kidding... We only have {hospitalReady.count} restaurant.</div>
        <div className="text-black">You can view the menu by clicking restaurant card .</div>
        <div style={{margin:"20px", display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around",alignContent:"space-around"}}>
        {
            hospitalReady.data.map((hospitalItem:any)=>(
                <Link href={`/hospital/${hospitalItem._id}`} className="w-1/5">
                <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.image}/>
                 </Link>
            ))
        }
      </div>
        </>
    )
}