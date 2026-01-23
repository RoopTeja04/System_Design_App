import axios from 'axios';
import React from 'react';
import { BsBookmarkFill } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { IoBookmarkOutline } from 'react-icons/io5';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';
dayjs.extend(relativeTime);

const Bookmarks = () => {

    const Navigate = useNavigate();
    const userID = localStorage.getItem("UserID");

    const [BookmarksData, setBookmarksData] = React.useState([]);

    const fetchBookmarks = React.useCallback(async () => {
        try {
            const res = await axios.get(`https://nginx-0yzj.onrender.com/feed/user-bookmarks-by-user/${userID}`);
            if (res.status === 200) {
                setBookmarksData(res.data.bookmarks);
            }
        } catch (err) {
            console.log(err)
        }
    }, [userID]);

    React.useEffect(() => {
        fetchBookmarks()
    }, [fetchBookmarks]);

    const handleDeleteBookmark = async ({ bookmarkID }) => {
        try {
            const res = await axios.delete(`https://nginx-0yzj.onrender.com/feed/delete-bookmark?userID=${userID}&postID=${bookmarkID}`);
            if (res.status === 200) {
                alert(res.data.message)
                fetchBookmarks();
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {
                BookmarksData.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-2'>
                        {
                            BookmarksData.map((bookmark, index) => (
                                <div key={index} className='bg-white w-60 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100'>
                                    <div className='p-4'>
                                        <div className='flex items-start justify-between mb-3'>
                                            <div className='flex items-center gap-2'>
                                                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shrink-0">
                                                    <CgProfile size={18} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold text-gray-800 text-xs line-clamp-1'>{bookmark.postID.profileName}</h3>
                                                    <p className='text-[10px] text-gray-500'>{dayjs(bookmark.postID.createdAt).fromNow()}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDeleteBookmark({ bookmarkID: bookmark.postID._id })}
                                                className='hover:scale-110 transition-transform duration-200'
                                            >
                                                <BsBookmarkFill size={16} className='text-purple-600' />
                                            </button>
                                        </div>

                                        <div className='mb-3'>
                                            <h2 className='text-sm font-bold text-gray-800 mb-1 line-clamp-2'>{bookmark.postID.title}</h2>
                                            <p className='text-gray-600 text-xs leading-relaxed line-clamp-3'>{bookmark.postID.des}</p>
                                        </div>

                                        <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                                            <button className='flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors duration-200'>
                                                <AiOutlineHeart size={16} />
                                                <span className='text-xs font-medium'>Like</span>
                                            </button>

                                            <button className='flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors duration-200'>
                                                <BiComment size={16} />
                                                <span className='text-xs font-medium'>Comment</span>
                                            </button>

                                            <button className='flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors duration-200'>
                                                <span className='text-xs font-medium'>View</span>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <button
                                className='mt-6 px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-purple-500/30'
                                onClick={() => Navigate('/main/feed')}>
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
