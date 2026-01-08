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
import { BsEmojiSmile, BsThreeDots } from "react-icons/bs";

const AddComments = ({ postID, closeComments, setDailyFeed }) => {

    const getUserID = localStorage.getItem("UserID");

    const DefaultValues = React.useMemo(() => ({
        postID: postID._id,
        UserID: getUserID,
        userName: postID.profileName,
        comment: "",
    }), [postID._id, getUserID, postID.profileName]);

    const [comments, setComments] = React.useState([]);
    const [formData, setFormData] = React.useState(DefaultValues);
    const [showEmoji, setShowEmoji] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState(null);
    const [editingCommentId, setEditingCommentId] = React.useState(null);
    const [editedComment, setEditedComment] = React.useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleEmojiClick = (emojiData) => {
        setFormData({ ...formData, comment: formData.comment + emojiData.emoji });
    }

    const fetchCommentsByPostID = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/feed/comments/${postID._id}`);
            if (res.status === 200) {
                setComments(res.data.comments);
            }
        } catch (err) {
            console.log(err);
        }
    }, [postID._id]);

    React.useEffect(() => {
        setFormData(DefaultValues);
        fetchCommentsByPostID();
    }, [DefaultValues, fetchCommentsByPostID]);

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
                setShowEmoji(false);
                fetchCommentsByPostID();
            }
        } catch (err) {
            console.log(err);
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

    const handleDeleteComment = async ({ commentID, userID }) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/feed/remove-comment/${commentID}/${userID}`);
            if (res.status === 200) {
                setDailyFeed(prev =>
                    prev.map(p =>
                        p._id === formData.postID ? { ...p, commentsCount: p.commentsCount - 1 } : p
                    )
                )
                fetchCommentsByPostID();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const saveEditComment = async () => {
        try {
            const res = await axios.put(`http://localhost:8080/api/feed/update-comment`, {
                commentID: editingCommentId,
                userID: getUserID,
                comment: editedComment,
            });
            if (res.status === 200) {
                setEditingCommentId(null);
                setEditedComment("");
                fetchCommentsByPostID();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const enableEditMode = (comment) => {
        setEditingCommentId(comment._id);
        setEditedComment(comment.comment);
        setOpenDropdown(null);
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

                                                {
                                                    c.userID === getUserID && (
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
                                                                <div
                                                                    className="absolute left-12 -top-8 mt-2 w-40 bg-white rounded-md shadow-xl z-20 border border-gray-200"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <button
                                                                        onClick={() => enableEditMode(c)}
                                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md transition"
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        onClick={() => handleDeleteComment({ commentID: c._id, userID: c.userID })}
                                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-200 rounded-b-md transition cursor-pointer"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                editingCommentId === c._id ? (
                                                    <div className="mt-2 text-left">
                                                        <input
                                                            type="text"
                                                            value={editedComment}
                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                            className="w-full p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2 text-black"
                                                            autoFocus
                                                        />
                                                        <div className="flex gap-2 justify-end">
                                                            <button
                                                                onClick={() => setEditingCommentId(null)}
                                                                className="text-xs px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-md transition border border-gray-200"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                onClick={saveEditComment}
                                                                className="text-xs px-3 py-1 bg-purple-600 text-white hover:bg-purple-700 rounded-md transition"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className='text-gray-800 mt-2 text-left'>- {c.comment}</p>
                                                )
                                            }

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