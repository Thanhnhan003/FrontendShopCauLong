import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({ element: Element, restricted, ...rest }) => {
    const token = Cookies.get('tokenUser');
    return (
        <Route
            {...rest}
            element={token && restricted ? <Navigate to="/profile" /> : <Element />}
        />
    );
};

export default PublicRoute;
