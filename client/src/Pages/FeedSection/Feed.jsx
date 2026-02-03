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
import AddComments from './AddComments';
dayjs.extend(relativeTime);

const Feed = () => {
    const navigate = useNavigate();
    const getUserID = localStorage.getItem("UserID");

    const DefaultValues = {
        title: "",
        des: "",
        userID: getUserID,
        profileName: "",
        media: null,
        mediaURL: "",
    }

    const [UserStatus, setUserStatus] = React.useState(null);
    const [formData, setFormData] = React.useState(DefaultValues);
    const [visibleForm, setVisibleForm] = React.useState(false);
    const [addedBookmarks, setAddedBookmarks] = React.useState([]);
    const [addedLikes, setAddedLikes] = React.useState([]);
    const [DailyFeed, setDailyFeed] = React.useState([]);
    const [activeComment, setActiveComment] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const validateUser = React.useCallback(async () => {
        try {
            if (!getUserID) return;
            const res = await axios.get(`http://localhost:5001/auth/validate-user/${getUserID}`);
            if (res.status === 200)
                setUserStatus(res.data.FindedUser.name);
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        validateUser();
    }, [validateUser]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleUploadNewPost = async () => {
        try {
            if (!formData.title || !formData.userID) {
                alert("please fill the details")
                return;
            }

            setLoading(true);
            let uploadedMediaUrl = "";

            if (formData.media) {
                const cloudRes = await uploadToCloudinary(formData.media);
                uploadedMediaUrl = cloudRes.secure_url;
            }

            const res = await axios.post("http://localhost:6001/feed/upload-post",
                {
                    title: formData.title,
                    des: formData.des,
                    userID: formData.userID,
                    profileName: UserStatus,
                    mediaURL: uploadedMediaUrl,
                }
            );
            if (res.status === 200) {
                alert(res.data.message);
                getAllPosts();
            }
        } catch (err) {
            console.log(err)
        }
        finally {
            setFormData(DefaultValues);
            setVisibleForm(!visibleForm);
            setLoading(false);
        }
    }

    const getAllPosts = React.useCallback(async () => {
        try {
            let res;
            if (getUserID) {
                res = await axios.get(`http://localhost:6001/feed/user-feed/${getUserID}`);
                if (res.status === 200) {
                    setDailyFeed(res.data.feedPost);
                    return;
                }
            }

            const allRes = await axios.get("http://localhost:6001/feed/all-posts");
            if (allRes.status === 200) {
                setDailyFeed(allRes.data.allPosts);
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    const handleAddBookmark = async ({ postID }) => {
        try {
            if (getUserID) {
                if (addedBookmarks.some(b => b.postID === postID)) {
                    //Delete Bookmark
                    const res = await axios.delete(`http://localhost:6001/feed/delete-bookmark?userID=${getUserID}&postID=${postID}`);

                    if (res.status === 200) {
                        alert(res.data.message);
                        fetchAddedBookmarks();
                    }
                }
                else {
                    // add to Bookmark
                    const res = await axios.post("http://localhost:6001/feed/add-bookmarks",
                        {
                            userID: getUserID,
                            postID: postID
                        }
                    );
                    if (res.status === 200) {
                        alert(res.data.message);
                        fetchAddedBookmarks();
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const fetchAddedBookmarks = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:6001/feed/user-bookmarks/${getUserID}`);
            if (res.status === 200) {
                setAddedBookmarks(res.data.bookmarks);
            }
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        fetchAddedBookmarks();
    }, [fetchAddedBookmarks]);

    const fetchAddedLikes = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:6001/feed/user-likes/${getUserID}`);
            if (res.status === 200) {
                setAddedLikes(res.data.likes);
            }
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        fetchAddedLikes();
    }, [fetchAddedLikes]);

    const handleLikeFunction = async ({ postID }) => {
        try {
            if (getUserID) {

                const isLiked = addedLikes.some(l => l.postID === postID);

                setDailyFeed(prev =>
                    prev.map(post =>
                        post._id === postID
                            ? {
                                ...post,
                                likesCount: isLiked
                                    ? post.likesCount - 1
                                    : post.likesCount + 1
                            }
                            : post
                    )
                );
                setAddedLikes(prev => isLiked ? prev.filter(l => l.postID !== postID) : [...prev, { postID }]);
                if (isLiked) {
                    //Remove Like
                    const res = await axios.delete("http://localhost:6001/feed/remove-like", {
                        data: {
                            userID: getUserID,
                            postID: postID,
                        }
                    });
                    if (res.status === 200) {
                        fetchAddedLikes();
                    }
                }
                else {
                    // ADD Like
                    const res = await axios.post("http://localhost:6001/feed/add-like", {
                        userID: getUserID,
                        postID: postID
                    });
                    if (res.status === 200) {
                        fetchAddedLikes();
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleFollowButton = async ({ UserID, userName }) => {
        try {
            const res = await axios.post("http://localhost:6001/feed/add-follow", {
                followerID: getUserID,
                followingID: UserID,
                userName: userName,
            })

            if (res.status === 200) {
                alert(res.data.message);
                getAllPosts();
            }
        } catch (err) {
            console.log(err)
        }
    }

    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "systemdesignApp");
        data.append("cloud_name", "dqljhvaje");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dqljhvaje/auto/upload",
            {
                method: "POST",
                body: data,
            }
        );

        return await res.json();
    };

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
                                        Upload Photo / Video
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                media: e.target.files[0],
                                            })
                                        }
                                        className="w-full"
                                    />
                                </div>

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
                                        rows='2'
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
                                        {
                                            loading ?
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Publishing...
                                                </span>
                                                : "Publish"
                                        }
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
                                            <div className="ml-auto">
                                                {
                                                    getUserID === post.userID ? null :
                                                        <>
                                                            <button
                                                                onClick={() => handleFollowButton({ UserID: post.userID, userName: post.profileName })}
                                                                className='bg-blue-500 text-white px-6 py-1.5 rounded-md ml-4 cursor-pointer'
                                                            >
                                                                Follow
                                                            </button>
                                                        </>
                                                }
                                            </div>
                                        </div>

                                        {post.mediaURL && (
                                            <div className="mb-4 h-[60vh] w-full overflow-hidden rounded-lg bg-black">
                                                {post.mediaURL.includes("/video/") ? (
                                                    <video
                                                        controls
                                                        className="h-full w-full object-contain"
                                                    >
                                                        <source src={post.mediaURL} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <img
                                                        src={post.mediaURL}
                                                        alt={post.title}
                                                        className="h-full w-full object-fill"
                                                    />
                                                )}
                                            </div>
                                        )}


                                        <div className='mb-4'>
                                            <h2 className='text-xl font-bold text-gray-800 mb-2'>{post.title}</h2>
                                            <p className='text-gray-600 leading-relaxed'>{post.des}</p>
                                        </div>
                                    </div>

                                    <div className='border-t border-gray-200 px-6 py-3'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-6'>
                                                <button
                                                    className='flex items-center gap-2 text-gray-600 hover:text-gray-600 transition-colors duration-200 group'
                                                    onClick={() => handleLikeFunction({ postID: post._id })}
                                                >
                                                    {
                                                        addedLikes.some(l => l.postID === post._id) ? (
                                                            <AiFillHeart size={24} className='text-pink-500 group-hover:scale-110 transition-transform duration-200' />
                                                        ) : (
                                                            <AiOutlineHeart size={24} className='group-hover:scale-110 transition-transform duration-200' />
                                                        )
                                                    }
                                                    <span className='font-medium'>{post.likesCount}</span>
                                                </button>
                                                <button
                                                    onClick={() => setActiveComment(post)}
                                                    className='flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200 group'
                                                >
                                                    <BiComment size={24} className='group-hover:scale-110 transition-transform duration-200' />
                                                    <span className='font-medium'>{post.commentsCount}</span>
                                                </button>
                                                <button className='flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors duration-200 group'>
                                                    <BiShare size={24} className='group-hover:scale-110 transition-transform duration-200' />
                                                    <span className='font-medium'>Share</span>
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleAddBookmark({ postID: post._id })}
                                                className='text-gray-600 hover:text-purple-500 transition-colors duration-200'
                                            >
                                                {
                                                    addedBookmarks.some(b => b.postID === post._id) ?
                                                        <BsBookmarkFill size={22} className='hover:scale-110 transition-transform duration-200' />
                                                        : <BsBookmark size={22} className='hover:scale-110 transition-transform duration-200' />
                                                }
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

            {
                activeComment &&
                <AddComments
                    postID={activeComment}
                    closeComments={() => setActiveComment(null)}
                    setDailyFeed={setDailyFeed}
                />
            }
        </div>
    )
}

export default Feed;
