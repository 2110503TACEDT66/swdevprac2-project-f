'use client'
import React, { useRef, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import useWindowListener from '../hooks/useWindowListener';

export default function PromoteCard() {
    const [isPlaying,setPlaying] = useState(true)
    useWindowListener("contextmenu",(e)=>{e.preventDefault()})

    return (
        <div className="flex items-center bg-gray-100 p-6 rounded-lg shadow-lg width-[80%] bg-gray-200 mx-[10%] my-10">
            <div className="mr-4">
                <VideoPlayer isPlaying={isPlaying} vdoSrc="vdo\getvaccine.mp4"/>
            </div>
            <div className="flex flex-col">
                <div className='text-black font-bold text-xl mb-4'>Get your Vaccine today</div>
                <button className='block rounded-lg bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white shadow-sm'
                 onClick={() => {
                    setPlaying(!isPlaying);}}>
                    {isPlaying? 'Pause':'Play'}
                </button>
            </div>
        </div>
    );
}


