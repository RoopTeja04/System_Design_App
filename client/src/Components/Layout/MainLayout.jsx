import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../GlobalComponents/Header';
import SideBar from '../GlobalComponents/SideBar';
import ScrollToTop from '../../ScrollToTop';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            <ScrollToTop />
            <Header />
            <div className="flex">
                <SideBar />
                <main className="flex-1 p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
