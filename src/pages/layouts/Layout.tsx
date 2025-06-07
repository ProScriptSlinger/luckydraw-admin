import React, {FC, ReactNode, useEffect, useState} from 'react';
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

interface ILayout {
    children?: ReactNode;
    className?:string;
}

const Layout:FC<ILayout> = ({children,className}) => {
    const dispatch = useDispatchEx();

    return (
        <>
            <ToastContainer />
            <div className="wrap">
                <Sidebar/>
                <section className={`page ${className}`}>
                    <div className="content">
                        <Outlet/>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Layout;