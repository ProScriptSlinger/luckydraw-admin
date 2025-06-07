import React, {FC, ReactNode} from 'react';
import './CategoryInfoList.scss'
import {Link} from "react-router-dom";
import TextAvatar from "../../atoms/TextAvatar/TextAvatar";
import Tag from "../../atoms/Tag/Tag";
import Placeholder from "../../atoms/Placeholder/Placeholder";
import {getColorById} from "../../../helpers/scripts.ts";

interface ICategoryInfoItem{
    keyID?:any
    id: number;
    title: string;
    date?: string;
    coins?: number;
    maxEnergy?: number;
    energy?: number;
    telegram_username?:string;
}

interface ICategoryInfoList{
    link?:string
    items: ICategoryInfoItem[];
}

const CategoryInfoList:FC<ICategoryInfoList> = ({link='',items=[]}) => {
    return (
        <div className="category-info-list">
            {items?.length ? items.map(item =>{
                return <div key={item.keyID} className="category-info-list__item">
                    <Link to={`${link}/${item.id}`}>
                        <div className="category-info-list__item-wrapper">
                            <div className="category-info-list__item-image-container">
                                <div className="category-info-list__item-id">
                                   # {item.id}
                                </div>
                                <div className="category-info-list__item-image">
                                    <TextAvatar name={item.title} />
                                </div>
                                <div className="category-info-list__item-title">{item.title} @{item?.telegram_username}</div>
                            </div>
                            <div className="category-info-list__item-details">
                                <div className="category-info-list__item-values">
                                    <Tag name={<><div>Енергия</div> {item.energy ?? 0}</>} textColor={getColorById(2).textColor} color={getColorById(2).color}/>
                                    <Tag name={<><div>Макс. Енергия </div> {item.maxEnergy ?? 0}</>} textColor={getColorById(3).textColor} color={getColorById(3).color}/>
                                    <Tag name={<><div>Монеты</div> {item.coins ?? 0}</>} textColor={getColorById(4).textColor} color={getColorById(4).color}/>
                                </div>
                                {item?.date ? <div className="category-info-list__item-date">
                                    {item.date}
                                </div> : ""}
                            </div>
                        </div>
                    </Link>

                </div>
            }) : <Placeholder header={'Упс...'} message={"Результаты не найдены"} />}

        </div>
    );
};

export default CategoryInfoList;