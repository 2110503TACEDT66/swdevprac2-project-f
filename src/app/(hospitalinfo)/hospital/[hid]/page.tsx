import getHospital from '@/libs/getHospital';
import Image from 'next/image';


export default async function HospitalPage({params}:{params:{hid:string}}){

    const hospitalDetail = await getHospital(params.hid)

    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{hospitalDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hospitalDetail.data.image} 
                alt='restaurant logo' width={0} height={0} sizes="100vw"
                className='rounded-lg w-[30%]'/>
            <table className='table-auto border-separate border-spacing-2 bg-gray-100'>
                <tbody>
                    <tr>
                        <td>Address</td>
                        <td>{hospitalDetail.data.address.district}</td>
                    </tr>
                    <tr>
                        <td>Province</td>
                        <td>{hospitalDetail.data.address.province}</td>
                    </tr>
                    <tr>
                        <td>Region</td>
                    <td>{hospitalDetail.data.address.region}</td>
                    </tr>
                    <tr>
                        <td>Tel.</td>
                        <td>{hospitalDetail.data.tel}</td>
                    </tr>
                    <tr>
                        <td>Opening hours</td>
                        <td>{hospitalDetail.data.openingHours.open} - {hospitalDetail.data.openingHours.close}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </main>
    )
}