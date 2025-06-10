import React, {FC, useEffect} from 'react';

import './StatisticsItems.scss'
import {useDispatchEx, useSelectorEx} from "../../../hooks/redux";
import ArrowIcon from "../../icons/ArrowIcon.tsx";
import Tag from "../../atoms/Tag/Tag.tsx";
import {getColorById} from "../../../helpers/scripts.ts";
import {Link} from "react-router-dom";
import {calculatePercentageGrowth} from "../../../helpers/functions.ts";
import { useTranslation } from 'react-i18next';

const StatisticsItems:FC = () => {
    const {t} = useTranslation();

    const {statistics} = useSelectorEx(state => state.participants);
    const {campaignsStatistics} = useSelectorEx(state => state.campaigns);
    const {purchasesStatistics} = useSelectorEx(state => state.purchases);
    return (
        <div className="statistics-items">
            <div className="statistics-items__item">
                <Link to={'/participants'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">{t('dashboard.participants.title')}</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{statistics?.totalParticipants} {t('dashboard.participants.units')}</span>
                        <span>for today →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {statistics?.totalParticipantsPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(statistics?.totalParticipantsPerDay,statistics?.totalParticipants)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}

                    </div>
                </div>
            </div>
            <div className="statistics-items__item">
                <Link to={'/campaigns'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">{t('dashboard.campaigns.title')}</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{campaignsStatistics?.totalCampaigns} {t('dashboard.campaigns.units')}</span>
                        <span>for today →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {campaignsStatistics?.totalCampaignsPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(campaignsStatistics?.totalCampaignsPerDay,campaignsStatistics?.totalCampaigns)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}
                    </div>
                </div>
            </div>

            <div className="statistics-items__item">
                <Link to={'/purchases'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">{t('dashboard.purchases.title')}</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{purchasesStatistics?.totalPurchases} {t('dashboard.purchases.units')}</span>
                        <span>for today →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {purchasesStatistics?.totalPurchasesPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(purchasesStatistics?.totalPurchasesPerDay,purchasesStatistics?.totalPurchases)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsItems;