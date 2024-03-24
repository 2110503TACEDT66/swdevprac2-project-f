
export default async function getHospitals(){

    const response = await fetch("http://localhost:5000/api/v1/restaurants")
    if(!response.ok){
            throw new Error("Failed to fetch hospital")
    }
    return await response.json()
}