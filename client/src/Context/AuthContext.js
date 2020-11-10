import React, {useState, useEffect, createContext} from 'react';
import AuthService from '../Services/AuthService';
import AuthService2 from '../Services/AuthService2';

export const AuthContext = createContext();

export default ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            if(data.isAuthenticated){
                setUser(data.user);
                setIsAuthenticated(data.isAuthenticated);
                setIsLoaded(true);
            }else{
                AuthService2.isAuthenticated().then(data2 => {
                    setUser(data2.user);
                    setIsAuthenticated(data2.isAuthenticated);
                    setIsLoaded(true);
                })
            }
        })
    }, []);
   
    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>
            }
        </div>
    )

}