import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../ContextAPI/UserContext';

export const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    if (user) {
        return children;
    }
    else {
        navigate("/login");
        return;
    }
}
