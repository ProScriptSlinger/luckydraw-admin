import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {useDispatchEx, useSelectorEx} from "../../../hooks/redux.ts";
import {asyncLogoutAction} from "../../../redux/slices/auth/authAction.ts";

import './Sidebar.scss'
import BagIcon from "../../icons/BagIcon.tsx";
import UserIcon from "../../icons/UserIcon.tsx";
import {useTranslation} from "react-i18next";
import i18n from '../../../i18n.ts';
import InfoTagIcon from '../../icons/InfoTagIcon.tsx';
import ShoppingCartIcon from '../../icons/ShoppingCartIcon.tsx';

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
                            LuckyDraw PANEL
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
                            <li className={'sidebar__item'}><Link to="/participants">{t('participants_pages.title')} <UserIcon/></Link></li>
                            <li className={'sidebar__item'}><Link to="/campaigns">{t('campaigns_pages.title')} <BagIcon/></Link></li>
                            <li className={'sidebar__item'}><Link to="/purchases">{t('purchases_pages.title')} <ShoppingCartIcon/></Link></li>
                            {/* <li className={'sidebar__item'}><Link to="/capsules">{t('capsules_pages.title')} <BagIcon/></Link></li> */}
                            <li className={'sidebar__item'}><Link to="/users">{t('users_pages.title')} <InfoTagIcon/></Link></li>
                        </ul>
                    </div>
                    <div className="sidebar__additional-nav">
                        <ul className={'sidebar__menu'}>
                            <li className={'sidebar__item'}><Link to="/mysettings">{t('my_settings_pages.title')}</Link></li>
                            <li className={'sidebar__item'}><Link onClick={()=>dispatch(asyncLogoutAction())} to="/logout">{t('logout_pages.title')}</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;