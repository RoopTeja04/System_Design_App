import React from 'react';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

const Following = () => {
    const getUserID = localStorage.getItem("UserID");

    const [followersData, setFollowersData] = React.useState([]);

    const fetchFollowersCountByProfileID = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:7001/profile/view-following/${getUserID}`);
            if (res.status === 200) {
                setFollowersData(res.data.following);
            }
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        fetchFollowersCountByProfileID();
    }, [fetchFollowersCountByProfileID]);

    const removeFollowing = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:7001/profile/remove-following/${id}`);
            if (res.status === 200) {
                alert(res.data.message);
                fetchFollowersCountByProfileID();
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
                                user.followingID.profilePic ? (
                                    <img
                                        src={user.followingID.profilePic}
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
                                <p className='font-semibold text-gray-800'>{user.followingID.name}</p>
                                <p className='text-xs text-gray-500'>@{user.followingID.name.toLowerCase().replace(' ', '')}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFollowing(user._id)}
                            className='px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium'
                        >
                            Unfollow
                        </button>
                    </div>
                ))
            }
        </div>

    )
}

export default Following