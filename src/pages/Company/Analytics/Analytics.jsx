import React from 'react'

const Analytics = () => {
  return (
    <div className='flex flex-row p-5 rounded-md'>
      <div className='flex-none text-white p-5 bg-lightPurple rounded-lg w-64 h-80'>
        <p>Security index</p>
        <p>img</p>
        <p>incidents:12</p>
      </div>
      <div className='flex flex-col gap-3 ml-5'>
        <div className='flex flex-row w-72 h-24 bg-darkBlue rounded-lg p-2 relative'>
            <div className='flex flex-col'>
            <p className='text-2xl text-white font-light '>Total Emails</p>
            <p className='text-5xl font-normal text-white text-justify'>123</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 absolute text-white right-5 top-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        </div>
        <div className='flex flex-row w-72 h-24 bg-darkBlue rounded-lg p-2 relative'>
        <div className='flex flex-col'>
            <p className='text-2xl text-white font-light'>Incident report</p>
            <p className='text-5xl font-normal text-white text-justify'>123</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 absolute text-white right-5 top-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
</svg>

        </div><div className='flex flex-row w-72 h-24 bg-darkBlue rounded-lg p-2 relative'>
        <div className='flex flex-col'>
            <p className='text-2xl text-white font-light'>Total Users</p>
            <p className='text-5xl font-normal text-white text-justify'>58</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 absolute text-white right-5 top-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
</svg>

        </div>
      </div>
    </div>
  )
}

export default Analytics
