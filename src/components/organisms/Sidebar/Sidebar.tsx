import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {useDispatchEx, useSelectorEx} from "../../../hooks/redux.ts";
import {asyncLogoutAction} from "../../../redux/slices/auth/authAction.ts";

import './Sidebar.scss'
import BagIcon from "../../icons/BagIcon.tsx";
import UserIcon from "../../icons/UserIcon.tsx";
import {useTranslation} from "react-i18next";

const Sidebar = () => {
    const dispatch = useDispatchEx();

    const [burger,setBurger] = useState(false);
    const { t } = useTranslation();
    return (
        <aside className={`sidebar ${burger ? "active" : ""}`}>
            <div className="sidebar__wrapper">
                <div className="sidebar__header">
                    <div className="sidebar__logo">
                        <Link to={'/'}>
                            FOXYFIT PANEL
                        </Link>

                    </div>
                    <div onClick={()=>setBurger(!burger)} className={`sidebar__burger ${burger ? "active" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={`sidebar__menu-container ${burger ? "active" : ""}`}>
                    <div className="sidebar__nav">
                        <ul className={'sidebar__menu'}>
                            <li className={'sidebar__item'}><Link to="/participants">Участники <UserIcon/></Link></li>
                            <li className={'sidebar__item'}><Link to="/capsules">Капсулы <BagIcon/></Link></li>
                        </ul>
                    </div>
                    <div className="sidebar__additional-nav">
                        <ul className={'sidebar__menu'}>
                            <li className={'sidebar__item'}><Link to="/mysettings">Настройки</Link></li>
                            <li className={'sidebar__item'}><Link onClick={()=>dispatch(asyncLogoutAction())} to="/logout">Выйти</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;