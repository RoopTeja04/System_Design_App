import React from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from "react-icons/cg";

const CommentsInfo = ({ showComments, setShowComments, post }) => {

    const [data, setData] = React.useState([]);

    const fetchComments = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/feed/comments/${post._id}`);
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }, [post._id]);

    React.useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-end'>
            <div className='absolute inset-0 bg-black/70' onClick={() => setShowComments(!showComments)} />

            <div className='bg-white rounded-3xl shadow-2xl py-4 px-2 h-[80vh] w-full max-w-[400px] relative z-10 overflow-hidden animate-slideInLeft'>
                <div className='py-4 px-2 flex items-center justify-between border-b border-gray-700 mx-4 mb-4'>
                    <h1 className='text-xl font-semibold'>Comments</h1>
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className='cursor-pointer'
                    >
                        <RxCross2 size={28} />
                    </button>
                </div>

                <div className='my-4 flex justify-center items-center gap-2'>
                    <AiOutlineHeart size={28} />
                    <p className='text-2xl font-semibold text-gray-800'>{data.commentsCount}</p>
                </div>

                <div className='flex-1 overflow-y-auto px-6 custom-scrollbar'>
                    {
                        data.comments && data.comments.length > 0 ?
                            (
                                <>
                                    <div className='space-y-4'>
                                        {
                                            data.comments.map((user, index) => (
                                                <div key={index}>
                                                    <div className='flex items-center gap-3'>
                                                        <CgProfile size={28} />
                                                        <span className='font-semibold text-gray-800'>{user.userName}</span>
                                                    </div>
                                                    <p className='text-gray-800 mt-2'>- {user.comment}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <div className='flex flex-col h-[40vh] justify-center items-center'>
                                        <p className='text-gray-500 text-2xl'>No Comments Yet</p>
                                    </div>
                                </>
                            )
                    }
                </div >
            </div >
        </div >
    )
}

export default CommentsInfo