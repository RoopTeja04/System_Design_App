import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

const DeactiveAccount = () => {

    const navigate = useNavigate();

    // Deliberate error for testing
    throw new Error("Simulated Error for Testing");

    return (
        <>
            <div className='flex flex-col items-start justify-between gap-6 mr-6'>
                <div className='flex items-center gap-2'>
                    <IoMdArrowBack size={28} className='cursor-pointer' onClick={() => { navigate(-1) }} />
                    <h1 className='text-2xl font-semibold'>Deactivate Account</h1>
                </div>

                <div className='w-[95%] mt-4 ml-8 flex flex-col gap-4'>
                    <p>
                        Deactivating your account will temporarily disable your profile
                        and remove your access to the platform. Your data, preferences,
                        and activity will be safely stored, so you can return anytime by
                        simply logging back in. While your account is deactivated, your
                        profile and content will not be visible to other users.
                    </p>

                    <p>
                        If you’re taking a break, this is a great way to step away without
                        permanently losing anything. However, please note that some
                        information may still be retained for legal, security, or
                        operational reasons. If you’re sure you want to proceed, click
                        the button below to confirm your account deactivation.
                    </p>

                    <div className='flex flex-row justify-end items-center w-[100%] mt-6 space-x-8'>
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

export default DeactiveAccount