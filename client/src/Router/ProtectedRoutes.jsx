import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const Token = localStorage.getItem('Token');

    return (
        <div>
            {Token ? <Outlet /> : <Navigate to="/" replace={true} />}
        </div>
    );
};

export default ProtectedRoutes;