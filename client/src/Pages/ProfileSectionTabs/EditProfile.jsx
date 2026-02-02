import React from 'react';
import axios from 'axios';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const navigate = useNavigate();

    const [updateData, setUpdateData] = React.useState(
        {
            name: "", username: "", email: "", bio: ""
        }
    );
    const [loading, setLoading] = React.useState(false);

    const getUserID = localStorage.getItem("UserID");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://nginx-0yzj.onrender.com/profile/view-profile/${getUserID}`);
                if (res.status === 200) {
                    setUpdateData(res.data.User);
                }
            } catch (err) {
                console.log(err);
            }
        }
        if (getUserID) {
            fetchData();
        }
    }, [getUserID])

    const handleChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    }

    const handleUpdate = async () => {
        setLoading(true);
        try {
            console.log(updateData);
            const res = await axios.put("http://localhost:7001/profile/update-account",
                { ...updateData, userID: getUserID }
            );
            if (res.status === 200) {
                alert(res.data.message);
                navigate(-1);
            }
        } catch (err) {
            console.log(err);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    }

    // console.log(updateData);

    return (
        <>
            <div className='flex items-center justify-between gap-6 mr-6'>
                <div className='flex items-center gap-2'>
                    <IoMdArrowBack size={28} className='cursor-pointer' onClick={() => { navigate(-1) }} />
                    <h1 className='text-2xl font-semibold'>Edit Profile</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => navigate(-1)}
                        className='text-lg font-semibold bg-red-600 text-white px-10 py-2 rounded-md tracking-wider hover:bg-red-700 transition-all duration-300'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className='border border-gray-400 px-8 py-2 tracking-wider rounded-md cursor-pointer text-lg font-semibold hover:bg-gray-100 transition-all duration-300'
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>

            <div className='w-[98%] border border-gray-400 mt-6 p-8 rounded-lg'>
                <div className='flex flex-col space-y-2 ml-4'>
                    <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-4 max-w-fit px-2'>Profile Name</h1>
                    <input
                        type='text'
                        name='name'
                        value={updateData.name || ""}
                        onChange={handleChange}
                        className='border border-gray-400 p-3 rounded-md w-[40%] text-md font-semibold focus:outline-green-600'
                    />

                    <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-4 max-w-fit px-2'>Username</h1>
                    <input
                        type='text'
                        name='username'
                        value={updateData.username || ""}
                        onChange={handleChange}
                        className='border border-gray-400 p-3 rounded-md w-[40%] text-md font-semibold focus:outline-green-600'
                    />

                    <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-4 max-w-fit px-2'>Email ID</h1>
                    <input
                        type='text'
                        name='email'
                        value={updateData.email || ""}
                        onChange={handleChange}
                        className='border border-gray-400 p-3 rounded-md w-[40%] text-md font-semibold focus:outline-green-600'
                    />
                </div>

                <div className='w-full ml-4 my-2'>
                    <h1 className='text-[14px] font-semibold ml-2 tracking-wide bg-white relative top-2 max-w-fit px-2'>Bio</h1>
                    <textarea
                        rows={4}
                        name='bio'
                        value={updateData.bio || ""}
                        onChange={handleChange}
                        className='border border-gray-400 p-3 rounded-md w-full text-md font-semibold focus:outline-green-600'
                    />
                </div>
            </div>

            <div className='w-[98%] mt-6 mb-8 px-2 flex flex-row justify-between items-center'>
                <button className='text-lg font-semibold tracking-wide text-blue-600'
                    onClick={() => navigate("/main/profile/change-password")}
                >
                    Change Password ?
                </button>

                <div className='flex flex-col justify-end items-end space-y-2 mr-2'>
                    <button
                        className='text-lg font-semibold tracking-wide text-black'
                        onClick={() => navigate("/main/profile/deactive-account")}
                    >
                        Deactive your Account!
                    </button>
                    <button
                        className='text-lg font-semibold tracking-wide text-red-600'
                        onClick={() => navigate("/main/profile/delete-account")}
                    >
                        Delete your Account
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditProfile