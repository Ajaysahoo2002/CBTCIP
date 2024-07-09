
import React, { useEffect, useState } from 'react'
const DayTime = () => {
    const [time, setTime] = useState("");
    // get today's day
    const day = ["Sunday", "Monday", "TuesDay", "WednesDay", "Thusrday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
    const currDate = new Date();
    const currentDay = day[currDate.getDay()];
    const currentMonth = months[currDate.getMonth()];
    const currentDate = currDate.getDate();
    const currentYear = currDate.getFullYear();
    useEffect(() => {
        const interval = setInterval(() => {
            const currDate = new Date();
            const currentTime = currDate.toLocaleTimeString();
            setTime(`${currentTime}`);
        }, 1000);
        return () => clearInterval(interval);
    }, [])


    return (
        <div className='daypage'>
            <p>{time}</p>
            <p>{currentDay} {currentMonth} {currentDate}, {currentYear}</p>
        </div>
    )
}

export default DayTime
