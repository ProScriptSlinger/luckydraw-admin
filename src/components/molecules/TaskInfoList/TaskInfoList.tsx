import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";
import TextAvatar from "../../atoms/TextAvatar/TextAvatar.tsx";
import Tag from "../../atoms/Tag/Tag.tsx";
import Placeholder from "../../atoms/Placeholder/Placeholder.tsx";
import {getColorById} from "../../../helpers/scripts.ts";

interface ITaskItem{
    keyID?:any
    id: string;
    title: string;
    date?: string;
    points?: number;
    channelId?:string;
}

interface ITaskList{
    link?:string
    items: ITaskItem[];
}

const TaskInfoList:FC<ITaskList> = ({link='',items=[]}) => {
    return (
        <div className="category-info-list">
            {items?.length ? items.map((item, index) =>{
                return <div key={item.keyID} className="category-info-list__item">
                    <Link to={`${link}/${item.id}`}>
                        <div className="category-info-list__item-wrapper">
                            <div className="category-info-list__item-image-container">
                                <div className="category-info-list__item-id">
                                   # {index+1}
                                </div>
                                <div className="category-info-list__item-image">
                                    <TextAvatar name={item.title} />
                                </div>
                                <div className="category-info-list__item-title">{item.title} @{item?.channelId}</div>
                            </div>
                            <div className="category-info-list__item-details">
                                <div className="category-info-list__item-values">
                                    <Tag name={<><div>Points</div> {item.points ?? 0}</>} textColor={getColorById(2).textColor} color={getColorById(2).color}/>
                                    
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

export default TaskInfoList;