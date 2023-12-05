import React,{useState} from 'react'
import FormGPT from '../../components/Generator/formGPT'
import ImageComponent from '../../components/Image/ImageComponent'
const GenerateEmail = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const componentsMap = {
        formGPT: <FormGPT />,
        imageComponent: <ImageComponent />,


      };
    
      const handleClick = (componentKey) => {
        setSelectedComponent(componentKey);
      };

  return (
    <div className='flex flex-col'>
      <div className='flex-1 p-5'>
        <h1 className='text-justify ml-5'>Generate some stuff..</h1>
      </div>
      <div className="flex flex-row p-5 ml-5 relative">
        <div className='flex-none flex-col p-4 bg-black w-24 h-96 rounded-md'>
            <div className='flex-1 p-2 mb-3 bg-slate-100 rounded-md hover:bg-emerald-200 duration-300 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black mx-auto w-8 h-8"  onClick={()=>handleClick('formGPT')}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                </svg>
            </div>
            <div className='flex-1 p-2 mb-3 bg-slate-100 rounded-md hover:bg-emerald-200 duration-300 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black mx-auto w-8 h-8" onClick={()=>handleClick('imageComponent')}>
            <   path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            </div>
            <div className='flex-1 p-2 bg-slate-100 rounded-md hover:bg-emerald-200 duration-300 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black mx-auto w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>

            </div>
            <div className='flex-1 p-2 bg-slate-100 rounded-md hover:bg-emerald-200 duration-300 cursor-pointer my-32'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black mx-auto w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
            </div>
        </div>
        <div className='flex-none'>
        {selectedComponent && componentsMap[selectedComponent]}
        </div>
        <div className='flex w-[550px] h-[590px] bg-black/50 rounded-md p-10 absolute right-0 top-0'>
            <div className='flex-1 bg-white w-[450px] h-[500px] rounded-md'>

            </div>
        </div>
      </div>

    </div>
  )
}

export default GenerateEmail
