
import getRestaurant from '@/libs/getRestaurant';
import getMenu from '@/libs/getMenu';
import Image from 'next/image';
import InteractiveCard from '@/components/InteractiveCard';


export default async function RestaurantPage({params}:{params:{rid:string}}){

    const RestaurantDetail = await getRestaurant(params.rid)
    const MenuResponse = await getMenu(params.rid)
    if(!MenuResponse) return (<p>Menu is Loading</p>)

    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{RestaurantDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={RestaurantDetail.data.image} 
                alt='restaurant logo' width={0} height={0} sizes="100vw"
                className='rounded-lg w-[20%]'/>
            <table className='table-auto border-separate border-spacing-2 bg-gray-100'>
                <tbody>
                    <tr>
                        <td>Address:</td>
                        <td>{RestaurantDetail.data.address.district}</td>
                    </tr>
                    <tr>
                        <td>Province:</td>
                        <td>{RestaurantDetail.data.address.province}</td>
                    </tr>
                    <tr>
                        <td>Region:</td>
                    <td>{RestaurantDetail.data.address.region}</td>
                    </tr>
                    <tr>
                        <td>Tel.</td>
                        <td>{RestaurantDetail.data.tel}</td>
                    </tr>
                    <tr>
                        <td>Opening hours :</td>
                        <td>{RestaurantDetail.data.openingHours.open} - {RestaurantDetail.data.openingHours.close}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            <InteractiveCard>
            <div className="grid grid-cols-3 gap-4">
                {MenuResponse.data.map((RestaurantItem:any, index:number)=>(
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="aspect-w-16 aspect-h-9 mb-4 content-center flex justify-center">
                        <Image src={RestaurantItem.image} alt="Product Picture" width={300} height={300} className="object-cover rounded-lg"/>
                    </div>
                    <div className="text-center">
                    <h3 className="text-lg font-semibold">{RestaurantItem.name} : {RestaurantItem.price} ฿</h3>
                    </div>
                    </div>
                ))}
            </div>
            </InteractiveCard>
        </main>
    )
}