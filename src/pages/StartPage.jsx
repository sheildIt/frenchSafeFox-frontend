import React from 'react'
import DigitalClock from '../components/DigitalClock'
const StartPage = () => {
    const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  return (
    <div>
      <h1 className="text-3xl text-white font-extralight mb-24">
      Hello! Welcome to SheildIt
      <DigitalClock/>
    <div className='relative'>
    <p className='absolute inset-0 bg-yellow-600 blur'></p>
    <p className='relative'>{formattedDate}</p>
    </div>
    
    </h1>
    </div>
  )
}

export default StartPage
