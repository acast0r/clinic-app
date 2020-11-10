import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../Context/AuthContext';

const Home = () => {
    const {isAuthenticated, user} = useContext(AuthContext);


    return (
        <>
            <h1>
                Home Page 
            </h1>

        </>
    )
}

export default Home;
