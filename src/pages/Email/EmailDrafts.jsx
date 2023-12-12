import React,{useEffect, useState} from 'react'
import useAxiosInstance from '../../auth/axios/axiosInstance';
import { useRedux } from '../../constants/reduxImports';
import { config } from '../../constants/constants';
import EmailPreview from '../../components/EmailPreview/EmailPreview';

const EmailDrafts = () => {
  const BASE_URL = config.url.BASE_URL
  const axiosInstance = useAxiosInstance()
  const {currentToken} = useRedux()
  const [emailDrafts, setEmailDrafts] = useState([])
  const [selectedDraft, setSelectedDraft] = useState(null);

  useEffect(()=>{
    getDrafts();
  },[])

  const getDrafts = async()=>{
    let response = await axiosInstance.get(`${BASE_URL}/email_base/email_templates/`,{
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
  console.log(selectedDraft)
  const handleSendButtonClick = (draft) => {
    setSelectedDraft(draft);
  };

  const handleCloseDraft = () =>{
    setSelectedDraft(null);
  }

  return (
    <div className='flex flex-col p-10'>
      <h1 className='text-justify text-3xl'>Some email drafts</h1>
      <div className='flex flex-row mt-20'>
        <div className='flex-none w-[25%] h-[100%]'>
          <ul className='flex flex-col gap-4'>
            {emailDrafts?.map((email)=>{
              return <li className='group flex-none w-full h-[120px] bg-white rounded-md hover:duration-200 hover:border-8 border-l-purple-600'>
                  <div className='flex flex-row'>
                      <div className='flex flex-col p-5 mt-3'>
                        <p className='text-black font-semibold text-start'>{email.email_subjectline}</p>
                        <p className='text-black/50 font-semibold text-small text-start mt-3'>Created: {email.created_at}</p>
                      </div>
                      <div className='flex-1 relative'>
                        <button onClick={() => handleSendButtonClick(email)} className='hidden group-hover:block px-2 py-1 bg-purple-700 absolute right-5 top-10'>Preview</button>
                      </div>
                  </div>
              </li>
            })}

          </ul>
        </div>
        {selectedDraft && (
          <div className='flex-1 ml-5'>
            {/* Display EmailPreview when selectedDraft is not null */}
            <EmailPreview email_body={selectedDraft.email_body} email_title={selectedDraft.email_subjectline} onClose={() => setSelectedDraft(null)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailDrafts
