import React from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";

const LikesInfo = ({ showLikes, setShowLikes, post }) => {

    const [data, setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchLikes = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/feed/likes-data/${post._id}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }, [post._id]);

    React.useEffect(() => {
        fetchLikes();
    }, [fetchLikes]);

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-start'>
            <div className='absolute inset-0 bg-black/70' onClick={() => setShowLikes(!showLikes)} />

            <div className='bg-white rounded-3xl shadow-2xl py-4 px-2 h-[80vh] w-full max-w-[500px] relative z-10 overflow-hidden animate-fadeIn'>
                <div className='py-4 px-2 flex items-center justify-between border-b border-gray-700 mx-4 mb-4'>
                    <h1 className='text-xl font-semibold'>Likes</h1>
                    <button
                        onClick={() => setShowLikes(!showLikes)}
                        className='cursor-pointer'
                    >
                        <RxCross2 size={28} />
                    </button>
                </div>

                <div className='my-4 flex justify-center items-center gap-2'>
                    <AiOutlineHeart size={28} />
                    <p className='text-2xl font-semibold text-gray-800'>{data.Total_Likes}</p>
                </div>

                <div className='flex-1 overflow-y-auto px-6 custom-scrollbar'>
                    {isLoading ? (
                        <div className='space-y-4'>
                            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                                <div key={item} className='flex items-center gap-4 animate-pulse'>
                                    <div className='w-10 h-10 bg-gray-200 rounded-full' />
                                    <div className='h-4 bg-gray-200 rounded w-32' />
                                </div>
                            ))}
                        </div>
                    ) : (
                        data && data.FetchUserInfos && data.FetchUserInfos.length > 0 ? (
                            <div className='space-y-4'>
                                {
                                    data.FetchUserInfos.map((user, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center gap-4'
                                        >
                                            <CgProfile size={40} />
                                            <p className='text-gray-800'>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='flex flex-col h-[40vh] justify-center items-center'>
                                <p className='text-gray-500 text-2xl'>No Likes Yet</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default LikesInfo