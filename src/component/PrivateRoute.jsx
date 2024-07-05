import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = Cookies.get('tokenUser');
    return (
        <Route
            {...rest}
            element={token ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
