

export default async function getHospital(id:string){
    const response = await fetch(`https://presentation-day-1-f.vercel.app/api/v1/restaurants/${id}`)
    if(!response.ok){
            throw new Error("Failed to fetch hospital")
    }
    return await response.json()
}