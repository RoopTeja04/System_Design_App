import React from 'react';
import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeIconSolid,
    MagnifyingGlassIcon as SearchIconSolid,
} from '@heroicons/react/24/solid';

const SideBar = () => {
    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm">
            <div className="px-4 py-10 space-y-5">
                <NavLink
                    to="/main/feed"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                            ? 'bg-linear-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 border border-gray-500'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-500'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {isActive ? (
                                <HomeIconSolid className="h-5 w-5" />
                            ) : (
                                <HomeIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <span className="font-medium">Feed</span>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/main/search"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                            ? 'bg-linear-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 border border-gray-500'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-500'
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            {isActive ? (
                                <SearchIconSolid className="h-5 w-5" />
                            ) : (
                                <MagnifyingGlassIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                            )}
                            <span className="font-medium">Search</span>
                        </>
                    )}
                </NavLink>
            </div>
        </aside>
    );
}

export default SideBar;
