import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useRedux } from '../../constants/reduxImports'

const EmailPreview = ({email_body, email_title,onClose, email_id}) => {




    const handleClose = () =>{
        onClose()
    }


  return (
    <div className='flex-1 w-[40%] h-[100%] bg-white rounded-md p-10 relative'>
        <div className='absolute right-2 top-2'>
       <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-6 h-6 hover:bg-slate-400 duration-200 cursor-pointer rounded-md">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>


        </div>
        <div className='absolute right-8 top-2'>
        <Link to={`/send_email?uuid=${email_id}&subject=${email_title}&message=${email_body}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-6 h-6 hover:bg-slate-400 duration-200 cursor-pointer rounded-md">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
</svg></Link>

        </div>
      <div className='flex-1 flex-col bg-pagie shadow-2xl rounded-md h-[520px] p-5 overflow-y-auto'>
      <h1 className='text-black text-start text-2xl font-semibold'>{email_title}</h1>
      <p className='text-black text-start mt-10'>{email_body}</p>
      </div>
    </div>
  )
}

export default EmailPreview
