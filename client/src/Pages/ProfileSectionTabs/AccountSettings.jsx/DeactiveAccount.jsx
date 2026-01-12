import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';

const DeactiveAccount = () => {

    const navigate = useNavigate();

    const getUserID = localStorage.getItem("UserID");

    const [reason, setReason] = React.useState("");
    const [days, setDays] = React.useState("");

    const handleDeactiveBtn = async () => {
        try {
            const res = await axios.post("http://localhost:8080/profile-service/profile/deactivate-account",
                {
                    reason: reason,
                    days: days,
                    userID: getUserID,
                }
            )
            if (res.status === 200) {
                localStorage.removeItem("UserID");
                localStorage.removeItem("Token");
                alert(res.data.message);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    }

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

                    <div className='flex space-x-8 mt-4'>
                        <select
                            className="w-68 px-4 py-2 border border-gray-400 rounded-md focus:cursor-pointer"
                            placeholder="Select a Reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        >
                            <option value="">Select a Reason</option>
                            <option value="privacy">I have privacy concerns</option>
                            <option value="not-useful">I don’t find this app useful anymore</option>
                            <option value="too-many-notifications">Too many notifications</option>
                            <option value="created-another-account">I created another account</option>
                            <option value="taking-break">I’m taking a break</option>
                            <option value="performance">App is slow or buggy</option>
                            <option value="content">I don’t like the content I see</option>
                            <option value="security">I’m worried about account security</option>
                            <option value="other">Other reason</option>
                        </select>
                        <select
                            className='w-68 px-4 py-2 border border-gray-400 rounded-md focus:cursor-pointer'
                            placeholder="Select Duration"
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                        >
                            <option value="">Select Duration</option>
                            <option value="1">1 Day</option>
                            <option value="7">7 Days</option>
                            <option value="30">30 Days</option>
                            <option value="90">90 Days</option>
                            <option value="180">180 Days</option>
                            <option value="365">365 Days</option>
                        </select>
                    </div>

                    <div className='flex flex-row justify-end items-center w-[100%] mt-6 space-x-8'>
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2.5 px-10 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-400 transition-all duration-300 text-md font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeactiveBtn}
                            className="p-2 px-10 border-2 border-red-600 text-red-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 text-md font-semibold"
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