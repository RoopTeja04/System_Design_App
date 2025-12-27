import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiShare } from 'react-icons/bi';
import { MdCalendarToday } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikesInfo from './LikesInfo';
import CommentsInfo from './CommentsInfo';
dayjs.extend(relativeTime);

const InfoModel = ({ post, visibleInfoModel, setVisibleInfoModel }) => {

    const [showLikes, setShowLikes] = React.useState(false);
    const [showComments, setShowComments] = React.useState(false);

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-center'>
            <div
                onClick={() => setVisibleInfoModel(!visibleInfoModel)}
                className='absolute inset-0 bg-black/70'
            ></div>

            <div className='bg-white rounded-3xl shadow-2xl py-4 px-2 w-full max-w-2xl relative z-10 overflow-hidden animate-fadeIn'>
                <div className='px-6 py-4 flex items-center justify-end'>
                    <button
                        onClick={() => setVisibleInfoModel(!visibleInfoModel)}
                    >
                        <RxCross2 size={28} />
                    </button>
                </div>

                <div className='p-8 space-y-6'>
                    <div className='p-5 border border-gray-200 rounded-lg'>
                        <p className='text-xs font-semibold text-purple-600 uppercase tracking-wide mb-2'>Post Title</p>
                        <h3 className='text-lg font-bold text-gray-800 leading-relaxed'>{post.title}</h3>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <button
                            onClick={() => setShowLikes(!showLikes)}
                            className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer'>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-12 h-12 rounded-full flex items-center justify-center'>
                                    <AiOutlineHeart size={40} />
                                </div>
                                <p className='text-2xl font-bold text-gray-800'>{post.likesCount}</p>
                                <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>Likes</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setShowComments(!showComments)}
                            className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer'>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-12 h-12 rounded-full flex items-center justify-center'>
                                    <BiComment size={40} />
                                </div>
                                <p className='text-2xl font-bold text-gray-800'>{post.commentsCount}</p>
                                <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>Comments</p>
                            </div>
                        </button>

                        <div className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer'>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-12 h-12 rounded-full flex items-center justify-center'>
                                    <BiShare size={40} />
                                </div>
                                <p className='text-2xl font-bold text-gray-800'>{0}</p>
                                <p className='text-xs font-medium text-gray-500 uppercase tracking-wide'>Shares</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-50 rounded-xl p-5 border border-gray-200'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
                                <MdCalendarToday size={20} className='text-white' />
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Created</p>
                                <p className='text-sm font-semibold text-gray-800'>{dayjs(post.createdAt).format('MMMM DD, YYYY [at] h:mm A')}</p>
                                <p className='text-xs text-gray-500'>{dayjs(post.createdAt).fromNow()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showLikes && <LikesInfo
                    showLikes={showLikes}
                    setShowLikes={setShowLikes}
                    post={post}
                />
            }

            {
                showComments &&
                <CommentsInfo
                    showComments={showComments}
                    setShowComments={setShowComments}
                    post={post}
                />
            }
        </div>
    )
}

export default InfoModel