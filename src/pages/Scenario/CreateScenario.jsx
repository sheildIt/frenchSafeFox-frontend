import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../auth/axios/axiosInstance';
import { useRedux } from '../../constants/reduxImports';

const CreateScenario = () => {
    const axiosInstance = useAxiosInstance()
    const {currentCompanyId,currentToken} = useRedux() //companies id

    const navigate = useNavigate()
    const [name, setName] = useState()
    const [title, setTitle] = useState()
    const [poi, setPoi] = useState()
    const [emailPoi, setEmailPoi] = useState()
    const [scenario, setScenario] = useState()

    const handleName = (e) =>{
        setName(e.target.value)
    }
    
    const handleTitle = (e) =>{
        setTitle(e.target.value)
    }
    
    const handlePoi = (e) =>{
        setPoi(e.target.value)
    }
    
    const handleEmail = (e) =>{
        setEmailPoi(e.target.value)
    }
    
    const handleScenario = (e) =>{
        setScenario(e.target.value)
    }
    console.log('COMPANY',currentCompanyId)
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            "name":name,
            "title":title,
            "POI":poi,
            "poi_email":emailPoi,
            "company":currentCompanyId,
            "scenario":scenario
        }

        // Make an API call to create the object with formData
        // try {
          const response = await axiosInstance.post('http://localhost:8000/company/create_scenario', 
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization":"Bearer "+ String(currentToken)
            }
          });

          if (response.status===201) {
            // Handle success, e.g., redirect or show a success message
            console.log('Object created successfully');
            navigate('/scenarios')
          } else {
            console.log(response)
            // Handle error, e.g., show an error message
            console.error('Error creating object');
          }
        // } catch (error) {
        //   console.error('Error:', error);
        // }
      };


  return (
    <div className='flex flex-row h-[100%] p-10 ml-5 border'>
      <div className='flex p-10 items-center text-justify border'>
      <form class="flex flex-col w-[100%]" onSubmit={handleSubmit}>
            <div className='flex flex-row gap-5'>
            <div class="mb-5">
                <input type="text"
                onChange={handleName} value={name} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="Name" required/>
            </div>
            <div class="mb-5">
                <input type="text" value={title}
                onChange={handleTitle} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="Subjectline/Title" required/>
            </div>
            </div>
            <div className='flex flex-row gap-5'>
            <div class="mb-5">
                <input type="text" value={poi}
                onChange={handlePoi} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 " placeholder="POI" required/>
            </div>
            <div class="mb-5">
                <input type="text" value={emailPoi}
                onChange={handleEmail} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" placeholder="Email of POI" required/>
            </div>
            </div>
            <div className='flex mb-5'>
                <textarea value={scenario}
                onChange={handleScenario} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-[200px] p-2.5' placeholder='Write a scenario here..'></textarea>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateScenario
