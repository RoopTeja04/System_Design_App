import React from 'react'
import Followers from './Followers'
import Following from './Following'
import { RxCross2 } from "react-icons/rx";

const MainTab = ({ TabState, setTabState, Viewtab, setViewtab }) => {

    const Tabs = [
        { tabName: "Followers", tabValue: "Followers" },
        { tabName: "Following", tabValue: "Following" },
    ]

    const renderComponent = () => {
        switch (TabState) {
            case "Followers": return <Followers />
            case "Following": return <Following />
            default: return <Followers />
        }
    }

    return (
        <div className='fixed inset-0 z-50 p-8 flex items-center justify-center'>
            <div className='absolute inset-0 bg-black/70'
                onClick={() => setViewtab(!Viewtab)}
            />

            <div className='bg-white rounded-3xl shadow-2xl py-4 px-2 w-full max-w-md relative z-10 overflow-hidden animate-fadeIn'>
                <div>
                    <div className="flex justify-center md:justify-center px-6 md:px-8 mt-4">
                        {
                            Tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setTabState(tab.tabValue)}
                                    className={`${TabState === tab.tabValue
                                        ? 'border-purple-500 text-purple-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }
                                    cursor-pointer whitespace-nowrap py-4 px-8 border-b-2 font-semibold text-sm transition-all duration-200
                                    focus:outline-none tracking-wide uppercase flex items-center gap-2`}
                                >
                                    {tab.tabName}
                                </button>
                            ))
                        }
                    </div>

                    <button
                        onClick={() => setViewtab(!Viewtab)}
                        className='absolute top-4 right-5 cursor-pointer'
                    >
                        <RxCross2 size={28} />
                    </button>
                </div>

                <div className='p-6 md:p-8'>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

export default MainTab