import React from 'react'

const ImageComponent = () => {
  return (
    <div className='flex-none p-5 bg-black/50 rounded-md ml-5'>
      <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
    </div>
  )
}

export default ImageComponent
