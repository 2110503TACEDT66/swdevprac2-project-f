import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Link } from '@mui/material'

export default async function TopMenu(){

    const session = await getServerSession(authOptions)
    return(
        <div className={styles.menucontainer}>
            {
                session ? 
                <Link href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-out of {session.user?.name}</div>
                </Link> 
                : 
                <Link href="/api/auth/signin">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Sign-in</div>
                </Link>
            }
            {
                session?
                <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>
                <TopMenuItem title='My Reservation' pageRef='/myreservation'/>
                </div>
                :
                <Link href="/api/auth/register">
                    <div className='flex items-center h-full px-2 text-cyan-600 text-sm'>Register</div>
                </Link>
            }
            
            <TopMenuItem title='Reservation' pageRef='/reservation'/>
            <Link href="/">
            <Image src='/img/logo.jpg' className={styles.logoimg} alt='logo' width={0} height={0} sizes='100vh'/>
            </Link>
        </div>
    )
}
