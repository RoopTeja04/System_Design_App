import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-linear-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                    My App
                </h1>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                    </button>

                    <button
                        onClick={() => navigate('/main/profile')}
                        className="p-2 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
                    >
                        <UserCircleIcon className="w-8 h-8 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;