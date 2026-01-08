import axios from 'axios';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { MdOutlinePostAdd, MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiShare } from 'react-icons/bi';
import { IoCloseCircle } from 'react-icons/io5';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InfoModel from './InfoModel';
import DeleteModel from './DeleteModel';
import UpdateModel from './UpdateModel';
dayjs.extend(relativeTime);

const Posts = () => {

    const getUserID = localStorage.getItem("UserID");
    const DefaultValues = {
        title: "",
        des: "",
        userID: getUserID,
        profileName: "",
    }

    const [UserStatus, setUserStatus] = React.useState(null);
    const [PostsData, setPostsData] = React.useState([]);
    const [openDropdown, setOpenDropdown] = React.useState(null);
    const [formData, setFormData] = React.useState(DefaultValues);
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [visibleInfoModel, setVisibleInfoModel] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState(null);
    const [visibleDeleteModel, setVisibleDeleteModel] = React.useState(false);
    const [visibleUpdateModel, setVisibleUpdateModel] = React.useState(false);

    const fetchProfile = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8080/profile-service/profile/view-posts/${getUserID}`);
            if (res.status === 200)
                setPostsData(res.data.Posts);
        }
        catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    const validateUser = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8080/auth/validate-user/${getUserID}`);
            if (res.status === 200)
                setUserStatus(res.data.FindedUser.name);
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    React.useEffect(() => {
        validateUser();
    }, [validateUser]);

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
                        fetchProfile();
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
                                                        onClick={() => {
                                                            setOpenDropdown(null);
                                                            setVisibleUpdateModel(!visibleUpdateModel);
                                                            setSelectedPost(post);
                                                        }}
                                                    >
                                                        <MdEdit size={18} />
                                                        <span className='font-medium'>Edit</span>
                                                    </button>

                                                    <button
                                                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 flex items-center gap-3'
                                                        onClick={() => {
                                                            setOpenDropdown(null);
                                                            setVisibleDeleteModel(!visibleDeleteModel);
                                                            setSelectedPost(post);
                                                        }}
                                                    >
                                                        <MdDelete size={18} />
                                                        <span className='font-medium'>Delete</span>
                                                    </button>

                                                    <button
                                                        className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 flex items-center gap-3'
                                                        onClick={() => {
                                                            setOpenDropdown(null);
                                                            setVisibleInfoModel(!visibleInfoModel);
                                                            setSelectedPost(post);
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
                                        <div className='flex items-center gap-4'>
                                            <div className='flex items-center gap-1'>
                                                <AiOutlineHeart size={22} />
                                                <span className='text-lg'>{post.likesCount}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <BiComment size={22} />
                                                <span className='text-lg'>{post.commentsCount}</span>
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
                            <button
                                onClick={() => setVisibleForm(!visibleForm)}
                                className='px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30'
                            >
                                Create Your First Post
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
                visibleInfoModel &&
                <InfoModel
                    post={selectedPost}
                    visibleInfoModel={visibleInfoModel}
                    setVisibleInfoModel={setVisibleInfoModel}
                />
            }

            {
                visibleDeleteModel &&
                <DeleteModel
                    post={selectedPost}
                    visibleDeleteModel={visibleDeleteModel}
                    setVisibleDeleteModel={setVisibleDeleteModel}
                />
            }
            {
                visibleUpdateModel &&
                <UpdateModel
                    post={selectedPost}
                    visibleUpdateModel={visibleUpdateModel}
                    setVisibleUpdateModel={setVisibleUpdateModel}
                />
            }
        </div>
    )
}

export default Posts;