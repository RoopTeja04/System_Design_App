import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='flex items-center gap-6'>
                <IoMdArrowBack size={28} onClick={() => { navigate(-1) }} />
                <h1 className='text-3xl font-semibold'>Edit Profile</h1>
            </div>
        </>
    )
}

export default EditProfile