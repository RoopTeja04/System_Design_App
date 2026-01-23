import React from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

const UpdateModel = ({ post, visibleUpdateModel, setVisibleUpdateModel }) => {

    const [isUpdating, setIsUpdating] = React.useState(false);

    const [updateForm, setUpdateForm] = React.useState({
        id: post._id,
        title: post.title,
        des: post.des
    })

    const handleChange = (e) => {
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value })
    }

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const res = await axios.put("https://nginx-0yzj.onrender.com/feed/update-post",
                {
                    title: updateForm.title,
                    des: updateForm.des,
                    postID: updateForm.id
                }
            );
            if (res.status === 200) {
                setVisibleUpdateModel(!visibleUpdateModel)
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/70'></div>

            <div className='bg-white rounded-lg shadow-2xl py-6 px-2 w-full max-w-3xl relative z-10 overflow-hidden animate-fadeIn'>
                <div className='border-b-2 border-gray-400 pb-3 mx-6 flex justify-between px-2'>
                    <h2 className='text-xl font-semibold text-gray-800'>Update Post</h2>
                    <button
                        onClick={() => setVisibleUpdateModel(!visibleUpdateModel)}
                    >
                        <RxCross2 size={28} />
                    </button>
                </div>

                <div className='flex flex-col gap-4 mt-4 pb-3 mx-6'>
                    <label className='flex flex-col gap-2'>
                        <span className='text-sm font-medium text-gray-700'>Title</span>
                        <input
                            type='text'
                            name="title"
                            value={updateForm.title}
                            onChange={handleChange}
                            className='px-4 py-3 border border-black rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200'
                        />
                    </label>
                    <label className='flex flex-col gap-2'>
                        <span className='text-sm font-medium text-gray-700'>Description</span>
                        <textarea
                            rows='6'
                            name='des'
                            value={updateForm.des}
                            onChange={handleChange}
                            className='px-4 py-3 border border-black rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 resize-none'
                        />
                    </label>
                </div>

                <div className='flex justify-end space-x-6 mx-6 mt-6 pb-4'>
                    <button
                        disabled={isUpdating}
                        onClick={() => { setVisibleUpdateModel(!visibleUpdateModel) }}
                        className='px-8 py-2.5 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300'
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isUpdating}
                        onClick={handleUpdate}
                        className='px-10 py-2.5 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {isUpdating ? (
                            <>
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Updating...</span>
                            </>
                        ) : (
                            'Update'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateModel