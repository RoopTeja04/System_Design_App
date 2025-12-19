import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BiComment, BiShare } from 'react-icons/bi';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { IoCloseCircle } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Feed = () => {
    const navigate = useNavigate();
    const getUserID = localStorage.getItem("UserID");

    const DefaultValues = {
        title: "",
        des: "",
        userID: getUserID,
        profileName: "",
    }

    const [UserStatus, setUserStatus] = React.useState(null);
    const [formData, setFormData] = React.useState(DefaultValues);
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [DailyFeed, setDailyFeed] = React.useState([]);

    React.useEffect(() => {
        validateUser();
    }, []);

    const validateUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/validate-user/${getUserID}`);
            if (res.status === 200)
                setUserStatus(res.data.FindedUser.name);
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleUploadNewPost = async () => {
        try {
            if (!formData.title || !formData.userID) {
                alert("please fill the details")
            }
            else {
                if (UserStatus) {
                    const res = await axios.post("http://localhost:8080/api/feed/upload-post",
                        {
                            title: formData.title,
                            des: formData.des,
                            userID: formData.userID,
                            profileName: UserStatus,
                        }
                    );
                    if (res.status === 200) {
                        alert(res.data.message);
                        getAllPosts(UserStatus);
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
        finally {
            setFormData(DefaultValues);
            setVisibleForm(!visibleForm);
        }
    }

    React.useEffect(() => {
        getAllPosts(UserStatus);
    }, [UserStatus]);

    const getAllPosts = async (UserStatus) => {
        try {
            if (UserStatus) {
                const res = await axios.get("http://localhost:8080/api/feed/all-posts");
                if (res.status === 200) {
                    setDailyFeed(res.data.allPosts);
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {
                UserStatus ? (
                    <div className='bg-white rounded-2xl shadow-lg p-6'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                    <CgProfile size={30} className="text-white" />
                                </div>
                                <div>
                                    <h2 className='text-lg font-semibold text-gray-800'>Share Your Thoughts</h2>
                                    <p className='text-sm text-gray-500'>What's on your mind?</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setVisibleForm(!visibleForm)}
                                className='px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30'
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='bg-white rounded-2xl shadow-lg p-6'>
                        <div className='flex justify-between items-center'>
                            <div>
                                <h1 className='text-xl font-bold text-gray-800 mb-2'>Join the Conversation</h1>
                                <p className='text-gray-600'>Please login to share your posts and connect with others</p>
                            </div>
                            <button
                                className='px-8 py-3 bg-linear-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg shadow-green-500/30'
                                onClick={() => navigate("/")}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )
            }

            {
                visibleForm && (
                    <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-8'>
                        <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn'>
                            <button
                                onClick={() => setVisibleForm(false)}
                                className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                            >
                                <IoCloseCircle size={32} />
                            </button>

                            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Create New Post</h2>

                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Post Title
                                    </label>
                                    <input
                                        type='text'
                                        name='title'
                                        placeholder='Enter an engaging title...'
                                        value={formData.title}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Description
                                    </label>
                                    <textarea
                                        name='des'
                                        rows='6'
                                        placeholder='Share your thoughts, ideas, or story...'
                                        value={formData.des}
                                        onChange={handleChange}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none resize-none'
                                    />
                                </div>

                                <div className='flex gap-3 pt-4'>
                                    <button
                                        onClick={handleUploadNewPost}
                                        className='flex-1 px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30'
                                    >
                                        Publish Post
                                    </button>
                                    <button
                                        onClick={() => { setVisibleForm(false), setFormData(DefaultValues) }}
                                        className='px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200'
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                DailyFeed.length > 0 ? (
                    <div className='space-y-6'>
                        {
                            DailyFeed.map((post, index) => (
                                <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                                    <div className='p-6 pb-4'>
                                        <div className='flex items-center gap-3 mb-4'>
                                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <CgProfile size={30} className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className='font-semibold text-gray-800'>{post.profileName}</h3>
                                                <p className='text-sm text-gray-500'>{dayjs(post.createdAt).fromNow()}</p>
                                            </div>
                                        </div>
                                        <div className='mb-4'>
                                            <h2 className='text-xl font-bold text-gray-800 mb-2'>{post.title}</h2>
                                            <p className='text-gray-600 leading-relaxed'>{post.des}</p>
                                        </div>
                                    </div>

                                    <div className='border-t border-gray-200 px-6 py-3'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-6'>
                                                <button className='flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200 group'>
                                                    <AiOutlineHeart size={24} className='group-hover:scale-110 transition-transform duration-200' />
                                                    <span className='font-medium'>{post.likes.length}</span>
                                                </button>
                                                <button className='flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200 group'>
                                                    <BiComment size={24} className='group-hover:scale-110 transition-transform duration-200' />
                                                    <span className='font-medium'>{post.comments.length}</span>
                                                </button>
                                                <button className='flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200 group'>
                                                    <BiShare size={24} className='group-hover:scale-110 transition-transform duration-200' />
                                                    <span className='font-medium'>Share</span>
                                                </button>
                                            </div>

                                            <button className='text-gray-600 hover:text-purple-500 transition-colors duration-200'>
                                                <BsBookmark size={22} className='hover:scale-110 transition-transform duration-200' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='bg-white rounded-2xl shadow-lg p-12 text-center'>
                        <div className='max-w-md mx-auto'>
                            <div className='w-20 h-20 bg-linear-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className='text-xl font-bold text-gray-800 mb-2'>No Posts Available</h3>
                            <p className='text-gray-600'>Server is temporarily down. Please try again later.</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Feed;
