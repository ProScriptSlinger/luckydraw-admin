import React, {FC, useEffect} from 'react';

import HeaderPanel from "../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../components/atoms/PreloaderContent/PreloaderContent";
import {useDispatchEx, useSelectorEx} from "../hooks/redux";

import StatisticsItems from "../components/molecules/StatisticsItems/StatisticsItems";
import {asyncGetParticipantsStatisticsAction} from "../redux/slices/participants/participantsAction.ts";


const Dashboard:FC = () => {
    const dispatch = useDispatchEx();


    useEffect(() => {
        dispatch(asyncGetParticipantsStatisticsAction())
    }, []);


    return (
        <>
            <>
                <div className="container">
                    <HeaderPanel title={'Статистика'} />
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