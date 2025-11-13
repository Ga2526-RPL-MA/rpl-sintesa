import React from 'react';
import Image from 'next/image';
function AuthBackground({ opacity }: { opacity?: number }) {
    return (
        <div className="fixed inset-0 -z-20 max-h-screen max-w-screen overflow-hidden bg-linear-to-t from-teal-900 to-green-500">
            <div className="pointer-events-none absolute inset-0 flex -translate-x-1/9 -translate-y-1/12 items-center justify-center select-none">
                <Image
                    src="/bgshape.svg"
                    alt="Background Shape"
                    width={500}
                    height={500}
                    className="float-animation scale-400 opacity-80 blur-[2px]"
                />
            </div>
        </div>
    );
}

export default AuthBackground;
