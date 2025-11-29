import React from 'react';

function Forbidden() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-black/80">
            <div className="grid-rows-2 text-center text-xl text-white">
                <div>403: Forbidden</div>
                <div>You don&apos;t have the permission to view this page.</div>
            </div>
        </div>
    );
}

export default Forbidden;
