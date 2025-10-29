import React from 'react'
import Image from 'next/image'

function AuthBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-linear-to-t from-teal-900/80  to-green-500 fixed inset-0 max-w-screen max-h-screen overflow-hidden">
        <div className="absolute inset-0 -translate-x-1/9 -translate-y-1/12 flex items-center justify-center pointer-events-none select-none">
            <Image src="/bgshape.svg" 
            alt="Background Shape" 
            width={500}
            height={500}
            className="scale-400 opacity-80 blur-[2px] float-animation"
            />
        </div>
        { children }
    </div>
  )
}

export default AuthBackground