import React, {FC, useEffect} from 'react';

import HeaderPanel from "../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../components/atoms/PreloaderContent/PreloaderContent";
import {useDispatchEx, useSelectorEx} from "../hooks/redux";

import StatisticsItems from "../components/molecules/StatisticsItems/StatisticsItems";
import {asyncGetParticipantsStatisticsAction} from "../redux/slices/participants/participantsAction.ts";
import { useTranslation } from 'react-i18next';
import {asyncGetCampaignsStatisticsAction} from "../redux/slices/campaigns/campaignsAction.ts";
import { asyncGetPurchasesStatisticsAction } from '../redux/slices/purchases/purchasesAction.ts';

const Dashboard:FC = () => {
    const dispatch = useDispatchEx();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(asyncGetParticipantsStatisticsAction())
        dispatch(asyncGetCampaignsStatisticsAction())
        dispatch(asyncGetPurchasesStatisticsAction())
    }, []);


    return (
        <>
            <>
                <div className="container">
                    <HeaderPanel title={t('dashboard.title')} />
                    {!false ?
                        <>
                          <StatisticsItems/>
                        </>
                        :
                        <PreloaderContent/>
                    }

                </div>
            </>
        </>
    );
};

export default Dashboard;