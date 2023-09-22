import React, {createContext, useContext, useEffect, useState} from 'react';
import axiosConfig from './axiosConfig';


const AuthContext = createContext('');

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [authUser, setAuthUser] = useState(null);
    const getAuthUserData = () =>{
        const auth_user = localStorage.getItem('auth_user');
        if (auth_user) {
            const parsedAuthUser = JSON.parse(auth_user);
            setAuthUser(parsedAuthUser);
        }
    };
    useEffect(() => {
        getAuthUserData();
    }, []);

    const authLogin = (userData) => {
        if(userData){
            localStorage.setItem('auth_user', JSON.stringify(userData));
            getAuthUserData();
            console.log('User Data Found For AuthContext => authLogin().');
        }else {
            console.log('User Data Not Found For AuthContext => authLogin() !');
        }
    };

    const authLogout = () => {
        setAuthUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_token_expire');
        localStorage.removeItem('auth_user');
        console.log('AuthContext => authLogout()');
    };

    return (
        <AuthContext.Provider value={{authUser, authLogin, authLogout}}>
            {children}
        </AuthContext.Provider>
    );
}
