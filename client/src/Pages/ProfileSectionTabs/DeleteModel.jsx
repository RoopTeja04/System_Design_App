import axios from 'axios';
import React from 'react'

const DeleteModel = ({ post, visibleDeleteModel, setVisibleDeleteModel }) => {

    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDeletePost = async ({ postID }) => {
        setIsDeleting(true);
        try {
            const res = await axios.delete(`https://nginx-0yzj.onrender.com/feed/delete-post/${postID}`);
            if (res.status === 200) {
                setVisibleDeleteModel(!visibleDeleteModel)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsDeleting(false);
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
                            disabled={isDeleting}
                            onClick={() => { setVisibleDeleteModel(!visibleDeleteModel) }}
                            className='px-8 py-2.5 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => { handleDeletePost({ postID: post._id }) }}
                            disabled={isDeleting}
                            className='flex-1 px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                        >
                            {isDeleting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                'Delete'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModel  