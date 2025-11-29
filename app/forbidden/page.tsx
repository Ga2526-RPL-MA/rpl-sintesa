import React from 'react'

function Forbidden() {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black/80'>
        <div className='text-xl grid-rows-2 text-center font-light text-white'>
            <div>
                403: Forbidden
            </div>
            <div>
                You don't have the permission to view this page.
            </div>
        </div>
    </div>
  )
}

export default Forbidden