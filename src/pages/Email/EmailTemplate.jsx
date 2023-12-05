import React from 'react'
import { Link } from 'react-router-dom'

const EmailTemplate = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-justify p-5 ml-2'>Select Email Template</h1>
      <div className='flex flex-row p-10 gap-3 items-center'>
        <Link to={'/generate/'} className='flex flex-col p-10 bg-black rounded-md hover:bg-slate-900 cursor-pointer duration-200'>
            <p className='text-3xl'>Standard Email</p>
        </Link>
        <Link to={'/generate/'} className='flex flex-col p-10 bg-black rounded-md hover:bg-slate-900 cursor-pointer duration-200'>
            <p className='text-3xl'>Phishing Email</p>
        </Link>
      </div>
    </div>
  )
}

export default EmailTemplate
