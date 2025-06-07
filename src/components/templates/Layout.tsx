"use client";
import {FC,ReactNode} from 'react';


interface ILayout {
    children: ReactNode;
}

const Layout:FC<ILayout> = ({children}) => {



    return (
        <>

            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;