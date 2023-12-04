import React, {useEffect, useState} from 'react'

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (value) => (value < 10 ? `0${value}` : value);
  
    const hours = formatTime(time.getHours());
    const minutes = formatTime(time.getMinutes());
    const seconds = formatTime(time.getSeconds());
  
    return (
      <div className='p-5'>
        
        <div className="clock rounded-md">
          <span>{hours}</span>:
          <span>{minutes}</span>:
          <span>{seconds}</span>
        </div>
      </div>
    );
}

export default DigitalClock
