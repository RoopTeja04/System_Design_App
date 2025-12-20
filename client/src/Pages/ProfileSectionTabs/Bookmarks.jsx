import axios from 'axios';
import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { IoBookmarkOutline } from 'react-icons/io5';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Bookmarks = () => {

    const userID = localStorage.getItem("UserID");

    const [BookmarksData, setBookmarksData] = React.useState([]);

    React.useEffect(() => {
        fetchBookmarks()
    }, []);

    const fetchBookmarks = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/feed/user-bookmarks-by-user/${userID}`);
            if (res.status === 200) {
                setBookmarksData(res.data.bookmarks);
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {
                BookmarksData.length > 0 ? (
                    <div className='grid grid-cols-1 gap-6'>
                        {
                            BookmarksData.map((bookmark, index) => (
                                <div key={index} className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'>
                                    {/* Bookmark Header */}
                                    <div className='p-5 pb-4'>
                                        <div className='flex items-start justify-between mb-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <CgProfile size={24} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold text-gray-800 text-sm'>{bookmark.postID.profileName}</h3>
                                                    <p className='text-xs text-gray-500'>{dayjs(bookmark.postID.createdAt).fromNow()}</p>
                                                </div>
                                            </div>

                                            {/* Bookmark Icon Badge */}
                                            <div className='bg-purple-100 p-2 rounded-full'>
                                                <BsBookmarkFill size={16} className='text-purple-600' />
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className='mb-4'>
                                            <h2 className='text-lg font-bold text-gray-800 mb-2 line-clamp-2'>{bookmark.postID.title}</h2>
                                            <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>{bookmark.postID.des}</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className='flex items-center gap-6 pt-3 border-t border-gray-100'>
                                            <button className='flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200'>
                                                <AiOutlineHeart size={20} />
                                                <span className='text-sm font-medium'>Like</span>
                                            </button>

                                            <button className='flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                                                <BiComment size={20} />
                                                <span className='text-sm font-medium'>Comment</span>
                                            </button>

                                            <button className='flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors duration-200 ml-auto'>
                                                <span className='text-sm font-medium'>View Post</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow-md p-12 text-center'>
                        <div className='max-w-sm mx-auto'>
                            <div className='w-24 h-24 bg-linear-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                                <IoBookmarkOutline size={48} className='text-purple-500' />
                            </div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>No Bookmarks Yet</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Save posts you love by clicking the bookmark icon.
                                They'll appear here for easy access later!
                            </p>
                            <button className='mt-6 px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30'>
                                Explore Posts
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Bookmarks;
