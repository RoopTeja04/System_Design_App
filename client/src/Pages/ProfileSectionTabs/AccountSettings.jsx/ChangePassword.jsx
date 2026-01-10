import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

const ChangePassword = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='flex flex-col items-start justify-between gap-6 mr-6'>
                <div className='flex items-center gap-2'>
                    <IoMdArrowBack size={28} className='cursor-pointer' onClick={() => { navigate(-1) }} />
                    <h1 className='text-2xl font-semibold'>Change Password</h1>
                </div>

                <div className='flex flex-col items-start gap-2 ml-8'>
                    <p className='text-[16px] tracking-wide'>
                        Create a strong password to keep your account safe.
                        Make sure it’s something you haven’t used before
                        and is hard for others to guess.
                    </p>

                    <div className='flex flex-col w-[80%] gap-6 mt-4'>
                        <div>
                            <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-2 max-w-fit px-2'>Current Password</h1>
                            <input
                                type="text"
                                className='border border-gray-400 p-3 rounded-md w-[40%] text-md font-semibold focus:outline-green-600'
                            />
                        </div>

                        <div>
                            <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-2 max-w-fit px-2'>New Password</h1>
                            <input
                                type="text"
                                className='border border-gray-400 p-3 rounded-md w-[40%] text-md font-semibold focus:outline-green-600'
                            />
                        </div>

                        <div>
                            <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-2 max-w-fit px-2'>Confirm Password</h1>
                            <input
                                type="text"
                                className='border border-gray-400 p-3 rounded-md w-[40%] text-md font-semibold focus:outline-green-600'
                            />
                        </div>
                    </div>

                    <div className='flex flex-row justify-end items-center w-[110%] mt-6 space-x-8'>
                        <button
                            onClick={() => navigate(-1)}
                            className='p-2.5 px-10 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-500 transition-all duration-300 text-md font-semibold'
                        >
                            Cancel
                        </button>
                        <button
                            className='p-2 px-10 border-2 border-gray-400 rounded-md cursor-pointer hover:border-green-600 transition-all duration-300 text-md font-semibold'
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword