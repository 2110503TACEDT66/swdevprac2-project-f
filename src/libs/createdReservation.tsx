import { Dayjs } from "dayjs"


export default async function createdReservation(id: string, token: string, apptDate: Dayjs, user: string) {

    const response = await fetch(`http://localhost:5000/api/v1/restaurants/${id}/reservations`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            apptDate: apptDate,
            user: user
        })
    });

    if (!response.ok) {
        throw new Error("Cannot create reservation");
    }

    return await response.json();
}
