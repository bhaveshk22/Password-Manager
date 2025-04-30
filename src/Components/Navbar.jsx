import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className='bg-blue-950 h-[8vh] w-full'>
                <div className='mx-auto flex justify-around items-center h-full w-full border-white'>
                    <div>
                        <span className='mt-3 font-bold text-2xl text-green-400'>&lt;</span>
                        <span className='mt-3 font-bold text-2xl text-white'>Pass</span>
                        <span className='mt-3 font-bold text-2xl text-green-400'>OP/&gt;</span>
                    </div>
                    <div className='pl-5'>
                        <a className='flex gap-3 items-center cursor-pointer bg-green-700 border border-white rounded-2xl pr-2' target='_blank' href="http://github.com/bhaveshk22">
                            <img className='invert h-8' src="/icons/github.svg" alt="githubLogo" />
                            <span className='text-white text-lg'>Github</span>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
