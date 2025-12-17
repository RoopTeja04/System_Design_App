import React from 'react';
import { createBrowserRouter } from "react-router-dom"
import Login from '../Components/AuthComponents/Login';
import Create from '../Components/AuthComponents/Create';
import Forgot from '../Components/AuthComponents/Forgot';
import Feed from '../Pages/Feed';
import Search from '../Pages/Search';
import MainLayout from '../Components/Layout/MainLayout';
import Profile from '../Components/GlobalComponents/Profile';

const Router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/create-account", element: <Create /> },
    { path: "/forgot-password", element: <Forgot /> },
    {
        path: "/main", element: <MainLayout />,
        children: [
            { path: "feed", element: <Feed /> },
            { path: "search", element: <Search /> },
            { path: "profile", element: <Profile /> },
        ]
    }
])

export default Router