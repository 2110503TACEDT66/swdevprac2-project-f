'use client'

import {DatePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

export default function Form({onDateChange}:{onDateChange:Function}){

    const [bookingDate,setBookDate] = useState<Dayjs|null>(null)

    return(
        <div className="bg-state-100 rounded-lg space-x-5 space-y-2 w-fit flex felx-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" value={bookingDate} onChange={(value)=>{setBookDate(value);onDateChange(value);}}/>
            </LocalizationProvider>
        </div>
    )
}