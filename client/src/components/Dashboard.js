import React, {useState, useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';

const Dashboard = () => {
    const {isAuthenticated, user} = useContext(AuthContext);
    return (
        <div className="container">
            <h1>
                Dashboard Page
            </h1>
            {user.name != null && <p>Name: {user.name}</p>}
            <p>Username: {user.username}</p>
            <p>Role: {user.role}</p>
        </div>
    )
}

export default Dashboard
