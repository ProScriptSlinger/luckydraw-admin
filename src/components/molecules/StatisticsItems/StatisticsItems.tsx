import React, {FC, useEffect} from 'react';

import './StatisticsItems.scss'
import {useDispatchEx, useSelectorEx} from "../../../hooks/redux";
import ArrowIcon from "../../icons/ArrowIcon.tsx";
import Tag from "../../atoms/Tag/Tag.tsx";
import {getColorById} from "../../../helpers/scripts.ts";
import {Link} from "react-router-dom";
import {calculatePercentageGrowth} from "../../../helpers/functions.ts";

const StatisticsItems:FC = () => {

    const {statistics} = useSelectorEx(state => state.participants)
    return (
        <div className="statistics-items">
            <div className="statistics-items__item">
                <Link to={'/participants'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">Количество участников</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{statistics?.totalParticipants} шт.</span>
                        <span>за сегодня →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {statistics?.totalParticipantsPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(statistics?.totalParticipantsPerDay,statistics?.totalParticipants)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}

                    </div>
                </div>
            </div>
            <div className="statistics-items__item">
                <Link to={'/participants'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">Количество заработаных монет</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{statistics?.totalCoins} foxy.</span>
                        <span>за сегодня →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {statistics?.totalCoinsPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(statistics?.totalCoinsPerDay,statistics?.totalCoins)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}
                    </div>
                </div>
            </div>
            <div className="statistics-items__item">
                <Link to={'/capsules'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">Количество открытых капсул</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{statistics?.totalCapsulesOpen} шт.</span>
                        <span>за сегодня →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {statistics?.totalCapsulesOpenPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(statistics?.totalCapsulesOpenPerDay,statistics?.totalCapsulesOpen)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}
                    </div>
                </div>
            </div>
            <div className="statistics-items__item">
                <Link to={'/'} className="statistics-items__item-link">
                    <ArrowIcon/>
                </Link>
                <div className="statistics-items__item-title">Кол-во выполненых упражнений</div>
                <div className="statistics-items__item-content">
                    <div className="statistics-items__item-content-counter">
                        <span>{statistics?.totalExercises} раз.</span>
                        <span>за сегодня →</span>
                    </div>
                    <div className="statistics-item__content-status">
                        {statistics?.totalExercisesPerDay > 0 ?
                            <Tag name={`${calculatePercentageGrowth(statistics?.totalExercisesPerDay,statistics?.totalExercises)} %`} textColor={getColorById(3).textColor} color={getColorById(3).color}/>

                            : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsItems;