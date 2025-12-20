import axios from 'axios';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { HiCog6Tooth } from "react-icons/hi2";
import { BsGrid3X3 } from "react-icons/bs";
import Posts from '../../Pages/ProfileSectionTabs/Posts';
import Bookmarks from '../../Pages/ProfileSectionTabs/Bookmarks';

const Profile = () => {

    const userID = localStorage.getItem("UserID");

    const tabs = [
        { title: "Posts", tabValue: "posts" },
        { title: "Bookmarks", tabValue: "bookmarks" },
    ]

    const [profile, setProfile] = React.useState([]);
    const [view, setView] = React.useState("posts");

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

    React.useEffect(() => {
        fetchUserProfle();
    }, []);

    const fetchUserProfle = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/profile-service/profile/view-profile/${userID}`);
            if (res.status === 200) {
                setProfile(res.data.User);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8 mb-6">
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
                            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium flex items-center justify-center gap-2 mx-auto md:mx-0">
                                <HiCog6Tooth size={18} />
                                Edit Profile
                            </button>
                        </div>

                        <div className="text-sm text-gray-700">
                            <p className="leading-relaxed">{profile.bio || 'No bio available yet. Add a bio to tell others about yourself!'}</p>
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

export default Profile