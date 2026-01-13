import React from 'react';
import { createBrowserRouter } from "react-router-dom"
import Login from '../Components/AuthComponents/Login';
import Create from '../Components/AuthComponents/Create';
import Forgot from '../Components/AuthComponents/Forgot';
import Feed from '../Pages/FeedSection/Feed';
import Search from '../Pages/Search';
import MainLayout from '../Components/Layout/MainLayout';
import Profile from '../Components/GlobalComponents/Profile';
import EditProfile from '../Pages/ProfileSectionTabs/EditProfile';
import ChangePassword from '../Pages/ProfileSectionTabs/AccountSettings.jsx/ChangePassword';
import DeactiveAccount from '../Pages/ProfileSectionTabs/AccountSettings.jsx/DeactiveAccount';
import AccountDeletion from '../Pages/ProfileSectionTabs/AccountSettings.jsx/AccountDeletion';
import Reactivate from '@/Components/AuthComponents/Reactivate';

const Router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/create-account", element: <Create /> },
    { path: "/forgot-password", element: <Forgot /> },
    { path: "/reactivate-account", element: <Reactivate /> },
    {
        path: "/main", element: <MainLayout />,
        children: [
            { path: "feed", element: <Feed /> },
            { path: "search", element: <Search /> },
            {
                path: "profile", element: <Profile />,
                children: [
                    { path: "edit-profile", element: <EditProfile /> },
                    { path: "change-password", element: <ChangePassword /> },
                    { path: "deactive-account", element: <DeactiveAccount /> },
                    { path: "delete-account", element: <AccountDeletion /> },
                ]
            },
        ]
    }
])

export default Router