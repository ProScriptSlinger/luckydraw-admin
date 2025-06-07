import React, {useEffect} from 'react';
import {Navigate, Outlet, useLocation } from 'react-router-dom';
import {useDispatchEx, useSelectorEx} from "../hooks/redux";
import { asyncCheckAction } from '../redux/slices/auth/authAction';
import Preloader from "../components/atoms/Preloader/Preloader";

const RequireAuth = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const dispatch = useDispatchEx();
    useEffect(()=>{
        dispatch(asyncCheckAction());
    },[]);
    const {user, isLoading} = useSelectorEx(state => state.auth)
    if((!user && token) || isLoading) return <Preloader/>
    return (
        token
            ? <Outlet/>
            : <Navigate to={'/login'} state={{from: location}} replace />
    );
};

export default RequireAuth;