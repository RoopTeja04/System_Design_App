import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../GlobalComponents/Header';
import SideBar from '../GlobalComponents/SideBar';
import ScrollToTop from '../../ScrollToTop';

const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col bg-linear-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            <ScrollToTop />
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
