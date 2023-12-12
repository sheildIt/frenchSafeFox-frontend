import React,{useState, useEffect} from 'react'

const EmailPreview = ({email_body, email_title,onClose}) => {

    const handleClose = () =>{
        onClose()
    }


  return (
    <div className='flex-none w-[40%] h-[140%] bg-white rounded-md p-10 relative'>
        <div className='absolute right-2 top-2'>
        <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-6 h-6 hover:bg-slate-400 duration-200 cursor-pointer rounded-md">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>

        </div>
      <div className='flex-none flex-col bg-pagie shadow-2xl rounded-md h-[100%] p-5'>
      <h1 className='text-black text-start text-2xl font-semibold'>{email_title}</h1>
      <p className='text-black text-start mt-10'>{email_body}</p>
      </div>
    </div>
  )
}

export default EmailPreview
