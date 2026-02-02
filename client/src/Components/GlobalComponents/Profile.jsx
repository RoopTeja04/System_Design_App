import axios from 'axios';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { HiCog6Tooth } from "react-icons/hi2";
import { BsGrid3X3 } from "react-icons/bs";
import Posts from '../../Pages/ProfileSectionTabs/Posts';
import Bookmarks from '../../Pages/ProfileSectionTabs/Bookmarks';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import MainTab from '../../Pages/ProfileSectionTabs/ToggoleTabs/MainTab';

const Profile = () => {

    const getUserID = localStorage.getItem("UserID");
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const isChildren = pathname === "/main/profile";

    const tabs = [
        { title: "Posts", tabValue: "posts" },
        { title: "Bookmarks", tabValue: "bookmarks" },
    ]

    const [profile, setProfile] = React.useState([]);
    const [view, setView] = React.useState("posts");
    const [postsCount, setPostCount] = React.useState(0);
    const [followingCount, setFollowingCount] = React.useState(0);
    const [followersCount, setFollowersCount] = React.useState(0);
    const [Viewtab, setViewTab] = React.useState(false);
    const [TabState, setTabState] = React.useState("");

    const renderComponent = () => {
        switch (view) {
            case "posts":
                return <Posts />
            case "bookmarks":
                return <Bookmarks />
            default:
                return <Posts />
        }
    }

    const fetchUserProfle = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:7001/profile/view-profile/${getUserID}`);
            if (res.status === 200) {
                setProfile(res.data.User);
            }
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    const fetchPostsCountbyProfileID = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:7001/profile/view-posts/${getUserID}`);
            if (res.status === 200)
                setPostCount(res.data.Posts.length);
        }
        catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    const fetchFollowingCountByProfileID = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:7001/profile/view-following/${getUserID}`);
            if (res.status === 200) {
                setFollowingCount(res.data.Count);
            }
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    const fetchFollowersCountByProfileID = React.useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:7001/profile/view-followers/${getUserID}`);
            if (res.status === 200) {
                setFollowersCount(res.data.Count);
            }
        } catch (err) {
            console.log(err)
        }
    }, [getUserID]);

    React.useEffect(() => {
        fetchUserProfle();
        fetchPostsCountbyProfileID();
        fetchFollowingCountByProfileID();
        fetchFollowersCountByProfileID();
    }, [fetchUserProfle, fetchPostsCountbyProfileID, fetchFollowingCountByProfileID, fetchFollowersCountByProfileID]);

    return (
        <>
            {
                isChildren && (
                    <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-6">
                                    {/* Profile Picture */}
                                    <div className="shrink-0">
                                        {profile.profilePic !== "" ? (
                                            <img
                                                src={profile.profilePic}
                                                alt="profile"
                                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-xl ring-2 ring-purple-500"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl ring-2 ring-purple-500">
                                                <CgProfile size={60} className="text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 w-full text-center md:text-left">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                            <h1 className="text-2xl font-semibold text-gray-800">{profile.name || 'User Name'}</h1>
                                            <button
                                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium flex items-center justify-center gap-2 mx-auto md:mx-0"
                                                onClick={() => navigate("/main/profile/edit-profile")}
                                            >
                                                <HiCog6Tooth size={18} />
                                                Edit Profile
                                            </button>
                                        </div>

                                        <div className="flex justify-center md:justify-start gap-8 mb-4">
                                            <div className="text-center md:text-left">
                                                <span className="block text-lg font-semibold text-gray-800 text-center">{postsCount}</span>
                                                <span className="text-sm text-gray-600">Posts</span>
                                            </div>
                                            <div
                                                onClick={() => { setViewTab(!Viewtab), setTabState("Followers") }}
                                                className="text-center md:text-left cursor-pointer hover:text-purple-600 transition-colors duration-200"
                                            >
                                                <span className="block text-lg font-semibold text-gray-800 text-center">{followersCount}</span>
                                                <span className="text-sm text-gray-600">Followers</span>
                                            </div>
                                            <div
                                                onClick={() => { setViewTab(!Viewtab), setTabState("Following") }}
                                                className="text-center md:text-left cursor-pointer hover:text-purple-600 transition-colors duration-200"
                                            >
                                                <span className="block text-lg font-semibold text-gray-800 text-center">{followingCount}</span>
                                                <span className="text-sm text-gray-600">Following</span>
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-700">
                                            <p className="leading-relaxed">{profile.bio || 'No bio available yet. Add a bio to tell others about yourself!'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200">
                            <div className="flex justify-center md:justify-start px-6 md:px-8">
                                {
                                    tabs.map((tab) => (
                                        <button
                                            key={tab.tabValue}
                                            onClick={() => setView(tab.tabValue)}
                                            className={`${view === tab.tabValue
                                                ? 'border-purple-500 text-purple-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                }
                                    cursor-pointer whitespace-nowrap py-4 px-8 border-t-2 font-semibold text-sm transition-all duration-200
                                    focus:outline-none tracking-wide uppercase flex items-center gap-2`}
                                        >
                                            {tab.tabValue === 'posts' && <BsGrid3X3 size={16} />}
                                            {tab.title}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="p-6 md:p-8 bg-gray-50">
                            {renderComponent()}
                        </div>
                    </div>
                )
            }

            {
                Viewtab && (
                    <MainTab
                        TabState={TabState}
                        setTabState={setTabState}
                        Viewtab={Viewtab}
                        setViewtab={setViewTab}
                    />
                )
            }

            <Outlet />
        </>
    )
}

export default Profile