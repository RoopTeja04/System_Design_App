import axios from 'axios';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlinePostAdd, MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiShare } from 'react-icons/bi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Posts = () => {

    const userID = localStorage.getItem("UserID");

    const [PostsData, setPostsData] = React.useState([]);
    const [openDropdown, setOpenDropdown] = React.useState(null);

    React.useEffect(() => {
        fetchProfile();
    })

    const fetchProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/profile-service/profile/view-posts/${userID}`);
            if (res.status === 200)
                setPostsData(res.data.Posts);
        }
        catch (err) {
            console.log(err)
        }
    }

    const toggleDropDown = (index) => {
        setOpenDropdown((prev) => (prev === index ? null : index));
    }

    React.useEffect(() => {
        const handleClickOutside = () => setOpenDropdown(null);
        if (openDropdown !== null) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openDropdown]);

    return (
        <div>
            {
                PostsData.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {
                            PostsData.map((post, index) => (
                                <div
                                    key={index}
                                    className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group h-64 flex flex-col'
                                >
                                    <div className='p-4 border-b border-gray-100 flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-2 h-2 bg-linear-to-r from-purple-500 to-blue-500 rounded-full'></div>
                                            <span className='text-xs font-medium text-gray-500'>Your Post</span>
                                        </div>

                                        <div className='relative'>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleDropDown(index);
                                                }}
                                                className='text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100'
                                            >
                                                <BsThreeDots size={18} />
                                            </button>

                                            {openDropdown === index && (
                                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn'>
                                                    <button
                                                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center gap-3'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log('Edit post', post);
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        <MdEdit size={18} />
                                                        <span className='font-medium'>Edit</span>
                                                    </button>

                                                    <button
                                                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 flex items-center gap-3'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log('Delete post', post);
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        <MdDelete size={18} />
                                                        <span className='font-medium'>Delete</span>
                                                    </button>

                                                    <button
                                                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 flex items-center gap-3'
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            console.log('Info for post', post);
                                                            setOpenDropdown(null);
                                                        }}
                                                    >
                                                        <MdInfo size={18} />
                                                        <span className='font-medium'>Info</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='p-4 flex-1 overflow-hidden flex flex-col justify-between'>
                                        <h2 className='text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200'>
                                            {post.title}
                                        </h2>
                                        <div className='flex items-center gap-2'>
                                            <div className='flex items-center gap-2'>
                                                <AiOutlineHeart size={26} />
                                                <span className='text-xl'>{post.likes.length}</span>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <BiComment size={26} />
                                                <span className='text-xl'>{post.comments.length}</span>
                                            </div>
                                        </div>
                                        <p className='text-xs text-gray-500'>{dayjs(post.createdAt).fromNow()}</p>
                                    </div>

                                    <div className='px-4 py-3 bg-linear-to-r from-purple-50 to-blue-50 border-t border-gray-100'>
                                        <button className='w-full text-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200'>
                                            View Full Post
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow-md p-12 text-center'>
                        <div className='max-w-sm mx-auto'>
                            <div className='w-24 h-24 bg-linear-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <MdOutlinePostAdd size={48} className='text-purple-500' />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>No Posts Yet</h3>
                            <p className='text-gray-600 leading-relaxed mb-6'>
                                You haven't created any posts yet. Start sharing your thoughts and ideas with the world!
                            </p>
                            <button className='px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30'>
                                Create Your First Post
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Posts;