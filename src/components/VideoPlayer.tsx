'use client'
import React, { useRef, useEffect } from 'react';

export default function Video({ isPlaying,vdoSrc }: {isPlaying:boolean,vdoSrc:string}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if (isPlaying) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    })
        
    return (
        <video className='w=[40%]'src={vdoSrc} ref={videoRef} controls loop muted/>
    );
}

