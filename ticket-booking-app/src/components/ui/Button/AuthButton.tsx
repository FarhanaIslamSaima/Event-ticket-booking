import React from 'react';
import { useState,useEffect } from 'react';
import { removeAccessToken,getUserProfile } from '@/service/actions/authService';


const AuthButton = () => {
    const[user,setUser] = useState('');
    const handleLogout = () => {
        removeAccessToken();
    };
    useEffect(() => {
       const fetchUserInfo = async () => {
           const userInfo = await getUserProfile();
            console.log("User Info:", userInfo);
       };
       fetchUserInfo();
    }, []);

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AuthButton;