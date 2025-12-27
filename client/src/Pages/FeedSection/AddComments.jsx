import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from 'react-icons/cg';
import { IoIosSend } from "react-icons/io";
import { BiComment } from "react-icons/bi";
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const AddComments = ({ postID, closeComments, setDailyFeed }) => {

    const getUserID = localStorage.getItem("UserID");

    const DefaultValues = {
        postID: postID._id,
        UserID: getUserID,
        userName: postID.profileName,
        comment: "",
    }

    const [comments, setComments] = React.useState([]);
    const [formData, setFormData] = React.useState(DefaultValues);
    const [showEmoji, setShowEmoji] = React.useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEmojiClick = (emojiData) => {
        setFormData({ ...formData, comment: formData.comment + emojiData.emoji });
    }

    React.useEffect(() => {
        setFormData(DefaultValues);
        fetchCommentsByPostID();
    }, []);

    const fetchCommentsByPostID = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/feed/comments/${postID._id}`);
            if (res.status === 200) {
                setComments(res.data.comments);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleUploadComment = async () => {
        try {
            if (!formData.comment.trim()) return;
            const res = await axios.post("http://localhost:8080/api/feed/add-comment",
                {
                    postID: formData.postID,
                    userID: formData.UserID,
                    userName: formData.userName,
                    comment: formData.comment,
                }
            );
            if (res.status === 200) {
                setDailyFeed(prev =>
                    prev.map(p =>
                        p._id === formData.postID ? { ...p, commentsCount: p.commentsCount + 1 } : p
                    )
                )
                setFormData(DefaultValues);
                setShowEmoji(!showEmoji);
                fetchCommentsByPostID();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-end'>
            <div className='absolute inset-0 bg-black/70' onClick={closeComments} />

            <div className='bg-white rounded-3xl shadow-2xl h-[80vh] w-full max-w-[700px] relative z-10 overflow-hidden animate-slideInRight flex flex-col'>
                <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
                            <CgProfile size={24} className='text-white' />
                        </div>
                        <span className='font-semibold text-gray-800'>{postID.profileName}</span>
                    </div>
                    <button onClick={closeComments} className='hover:bg-gray-300 p-2 rounded-full transition-all duration-200'>
                        <RxCross2 size={24} className='cursor-pointer' />
                    </button>
                </div>

                <div className='flex-1 overflow-y-auto px-6 py-4 custom-scrollbar'>
                    {
                        comments.length > 0 ? (
                            <div className='space-y-4'>
                                {
                                    comments.map((c, index) => (
                                        <div key={index}>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-semibold text-gray-800'>{c.userName}</span>
                                                <span>{dayjs(c.createdAt).fromNow()}</span>
                                            </div>
                                            <p className='text-gray-800 mt-2'>- {c.comment}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full text-center'>
                                <div className='w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4'>
                                    <BiComment size={40} className='text-gray-400' />
                                </div>
                                <p className='text-gray-800 text-xl font-semibold mb-2'>No Comments Yet</p>
                                <p className='text-gray-500 text-sm'>Be the first to comment!</p>
                            </div>
                        )
                    }
                </div>

                <div className='border-t border-gray-200 px-6 py-6 bg-gray-50 my-2'>
                    <div className='flex gap-3 items-center'>
                        <input
                            type='text'
                            name='comment'
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder='Add a comment...'
                            className='flex-1 px-4 py-3 border text-black border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200'
                        />
                        <BsEmojiSmile size={24} onClick={() => setShowEmoji(!showEmoji)} />
                        {
                            showEmoji && (
                                <div className='absolute bottom-28 right-8 z-50'>
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )
                        }
                        <button
                            onClick={handleUploadComment}
                            className='w-12 h-12 flex items-center justify-center hover:bg-gray-300 rounded-full'
                        >
                            <IoIosSend size={32} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddComments