import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const AccountDeletion = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-col items-start justify-between gap-6 mr-6">
                <div className="flex items-center gap-2">
                    <IoMdArrowBack
                        size={28}
                        className="cursor-pointer"
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <h1 className="text-2xl font-semibold">Delete Account</h1>
                </div>

                <div className="w-[95%] mt-4 ml-8 flex flex-col gap-4">
                    <p>
                        Deleting your account is a permanent action. Once you request account
                        deletion, your profile, data, posts, and all associated information
                        will be scheduled for removal from our systems. Your account will no
                        longer be visible to other users.
                    </p>

                    <p>
                        However, your account will not be deleted immediately. We provide a
                        <span className="font-semibold"> 15-day recovery period </span>
                        during which you can change your mind. If you log back in within
                        these 15 days, the deletion request will be automatically cancelled
                        and your account will be fully restored.
                    </p>

                    <p>
                        After the 15-day period, your account and data will be permanently
                        deleted and cannot be recovered. Some information may still be
                        retained for legal, security, or compliance purposes as required by
                        law.
                    </p>

                    <div className="flex space-x-8 mt-4">
                        <select
                            className="w-68 px-4 py-2 border border-gray-400 rounded-md focus:cursor-pointer"
                            placeholder="Select a Reason"
                        >
                            <option value="">Select a Reason</option>
                            <option value="privacy">I have privacy concerns</option>
                            <option value="not-useful">I don’t find this app useful anymore</option>
                            <option value="too-many-notifications">Too many notifications</option>
                            <option value="created-another-account">I created another account</option>
                            <option value="performance">App is slow or buggy</option>
                            <option value="content">I don’t like the content I see</option>
                            <option value="security">I’m worried about account security</option>
                            <option value="other">Other reason</option>
                        </select>
                    </div>

                    <div className="flex flex-row justify-end items-center w-[100%] mt-6 space-x-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2.5 px-10 bg-gray-500 text-white rounded-md cursor-pointer hover:bg-gray-400 transition-all duration-300 text-md font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            className="p-2 px-10 border-2 border-red-600 text-red-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 text-md font-semibold"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountDeletion;