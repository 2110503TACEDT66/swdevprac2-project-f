"use client"
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

export default function Card({ hospitalName, imgSrc,RatingChange }: { hospitalName: string, imgSrc: string,RatingChange?:Function }) {
    const [value, setValue] = useState<number | null>(5);
    return (
        <InteractiveCard>
            <div className='h-[300px] round-lg shadow-lg bg-white flex-auto' >
                <div className='width-full h-[70%] relative rounded-t-lg'>
                    <Image
                        src={imgSrc}
                        alt='Product Picture'
                        fill={true}
                        className='object-contain round-t-lg'
                    />
                </div>
                <div className='w-full h-[10%] p-[10px] text-black'>{hospitalName}</div>
                <div className='p-[10px] h-[20%]'>
                    {
                        RatingChange? <Rating
                        id={hospitalName + 'Rating'}
                        name={hospitalName + ' Rating'}
                        data-testid={hospitalName + ' Rating'}
                        value={value}
                        onChange={(event, newValue) => {event.stopPropagation();event.preventDefault();setValue(newValue);RatingChange(hospitalName,newValue)}}
                        onClick={(e)=>e.stopPropagation()} 
                   /> : ''
                    }
                </div>
            </div>
        </InteractiveCard>
    );
}
