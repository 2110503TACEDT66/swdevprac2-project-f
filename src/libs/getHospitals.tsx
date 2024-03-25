
export default async function getHospitals(){

    const response = await fetch("https://presentation-day-1-f.vercel.app/api/v1/restaurants")
    if(!response.ok){
        throw new Error("Failed to fetch hospital")
    }
    return await response.json()
}