import React,{useEffect, useState} from 'react'
import useAxiosInstance from '../../auth/axios/axiosInstance';
import { useRedux } from '../../constants/reduxImports';
import { config } from '../../constants/constants';
import EmailPreview from '../../components/EmailPreview/EmailPreview';
import DraftModal from '../../components/Modal/DraftModal';

const EmailDrafts = () => {
  const BASE_URL = config.url.BASE_URL
  const axiosInstance = useAxiosInstance()
  const {currentToken,currentCompanyId} = useRedux()
  const [emailDrafts, setEmailDrafts] = useState([])
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    getDrafts();
  },[])

  const getDrafts = async()=>{
    let response = await axiosInstance.get(`${BASE_URL}/email_base/email_templates/${currentCompanyId}`,{
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + String(currentToken)
      }
    })

    if(response.status===200){
      setEmailDrafts(response.data)
    }
    else{
      console.log('error')
    }

  }

  const handleSendButtonClick = (draft) => {
    setSelectedDraft(draft);
    setShowModal(true)
  };

  const handleModalClose = () => {
    setSelectedDraft(null);
    setShowModal(false);
  };
  
  return (
    <div className='flex flex-col p-10 h-[100%]'>
      <h1 className='text-justify text-3xl'>Email drafts</h1>
      <div className='flex flex-row text-justify text-white/50 font-light'>Drafts:<p className='ml-2'>{emailDrafts.length}</p></div>
      <div className='flex flex-row mt-5'>
        <div className='flex-none w-[20%] h-[500px]'>
          <ul className='flex flex-col gap-4'>
            {emailDrafts?.map((email)=>{
              return <li key={email.id} className='group flex-none w-full h-[100px] bg-white rounded-md hover:duration-200 hover:border-l-8 border-l-purple-600 hover:bg-white/50'>
                  <div className='flex flex-row'>
                      <div className='flex flex-col p-5 mt-3'>
                        <p className='text-black font-semibold text-start text-small'>{email.email_subjectline}</p>
                        <p className='text-black/50 font-semibold text-xs text-start mt-3'>Created: {email.created_at}</p>
                      </div>
                      <div className='flex-1 relative'>
                        <button onClick={() => handleSendButtonClick(email)} className='hidden group-hover:block px-2 py-1 bg-purple-700 absolute right-5 top-10'>Preview</button>
                      </div>
                  </div>
              </li>
            })}

          </ul>
        </div>
        
      </div>
      <DraftModal confirmLeave={handleModalClose} showModal={showModal} email_obj={selectedDraft} />
    </div>
  )
}

export default EmailDrafts
