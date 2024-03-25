import Card from '@/components/Card';
import getHospital from '@/libs/getHospital';
import getMenu from '@/libs/getMenu';
import Image from 'next/image';


export default async function HospitalPage({params}:{params:{hid:string}}){

    const hospitalDetail = await getHospital(params.hid)
    const MenuResponse = await getMenu(params.hid)
    if(!MenuResponse) return (<p>Menu is Loading</p>)

    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{hospitalDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hospitalDetail.data.image} 
                alt='restaurant logo' width={0} height={0} sizes="100vw"
                className='rounded-lg w-[20%]'/>
            <table className='table-auto border-separate border-spacing-2 bg-gray-100'>
                <tbody>
                    <tr>
                        <td>Address:</td>
                        <td>{hospitalDetail.data.address.district}</td>
                    </tr>
                    <tr>
                        <td>Province:</td>
                        <td>{hospitalDetail.data.address.province}</td>
                    </tr>
                    <tr>
                        <td>Region:</td>
                    <td>{hospitalDetail.data.address.region}</td>
                    </tr>
                    <tr>
                        <td>Tel.</td>
                        <td>{hospitalDetail.data.tel}</td>
                    </tr>
                    <tr>
                        <td>Opening hours :</td>
                        <td>{hospitalDetail.data.openingHours.open} - {hospitalDetail.data.openingHours.close}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {MenuResponse.date.map((hospitalItem:any, index:number)=>(
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="aspect-w-16 aspect-h-9 mb-4 content-center">
                        <Image src={hospitalItem.image} alt="Product Picture" width={300} height={300} className="object-cover rounded-lg"/>
                    </div>
                    <div className="text-center">
                    <h3 className="text-lg font-semibold">{hospitalItem.name}</h3>
                    </div>
                    </div>
                ))}
            </div>
        </main>
    )
}