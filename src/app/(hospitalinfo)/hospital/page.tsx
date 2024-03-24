import CardPanel from '@/components/CardPanel'
import HospitalCatalog from '@/components/HospitalCatalog'
import getHospitals from '@/libs/getHospitals'
import { LinearProgress } from '@mui/material'
import { Suspense } from 'react'

export default async function Hospital(){

    const hospitals = await getHospitals()

    return(
        <main className="text-center p-5">
            <h1 className="text-xl font-medium text-black">Select your Restaurant</h1>
                <HospitalCatalog hospitalsJson={hospitals}/>
        </main>
    )
}