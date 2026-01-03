import React from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const Followers = () => {

    const getUserID = localStorage.getItem("UserID");

    const [followersData, setFollowersData] = React.useState([]);

    React.useEffect(() => {
        fetchFollowersCountByProfileID();
    }, []);

    const fetchFollowersCountByProfileID = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/profile-service/profile/view-followers/${getUserID}`);
            if (res.status === 200) {
                setFollowersData(res.data.followers);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='space-y-3'>
            {
                followersData.map((user, index) => (
                    <div key={index} className='flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200'>
                        <div className='flex items-center gap-3'>
                            {
                                user.followerID.profilePic ? (
                                    <img
                                        src={user.followerID.profilePic}
                                        alt="profile"
                                        className='w-12 h-12 rounded-full object-cover ring-2 ring-purple-200'
                                    />
                                ) : (
                                    <div className='w-12 h-12 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center ring-2 ring-purple-200'>
                                        <CgProfile size={28} className='text-white' />
                                    </div>
                                )
                            }
                            <div>
                                <p className='font-semibold text-gray-800'>{user.followerID.name}</p>
                                <p className='text-xs text-gray-500'>@{user.followerID.name.toLowerCase().replace(' ', '')}</p>
                            </div>
                        </div>
                        <button className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium'>
                            Follow Back
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default Followers