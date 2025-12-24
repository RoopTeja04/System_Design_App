import axios from 'axios';
import React from 'react'

const DeleteModel = ({ post, visibleDeleteModel, setVisibleDeleteModel }) => {

    const handleDeletePost = async ({ postID }) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/feed/delete-post/${postID}`);
            if (res.status === 200) {
                setVisibleDeleteModel(!visibleDeleteModel)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/70'></div>

            <div className='bg-white rounded-lg shadow-2xl py-6 px-2 w-full max-w-[440px] relative z-10 overflow-hidden animate-fadeIn'>
                <div className='px-6 py-2 space-y-6'>
                    <h1 className='text-lg font-semibold text-gray-800'>Are You sure to delete this post?</h1>

                    <div className='flex justify-end space-x-6'>
                        <button
                            onClick={() => { setVisibleDeleteModel(!visibleDeleteModel) }}
                            className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { handleDeletePost({ postID: post._id }) }}
                            className='px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-300 cursor-pointer'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModel  