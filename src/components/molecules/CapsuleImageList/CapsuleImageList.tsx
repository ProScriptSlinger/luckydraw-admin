import React, { FC, ReactNode } from 'react';
import ButtonRect from "../../atoms/ButtonRect/ButtonRect";
import CloseIcon from "../../icons/CloseIcon";

import './CapsuleImageList.scss';
import PlaceholderIcon from "../../icons/PlaceholderIcon";
import { Link } from "react-router-dom";
import Placeholder from "../../atoms/Placeholder/Placeholder.tsx";
import Tag from "../../atoms/Tag/Tag.tsx";
import {getColorById} from "../../../helpers/scripts.ts";

interface ICapsuleImageItem {
    id: number,
    title: ReactNode,
    coins?: number;
    maxEnergy?: number;
    energy?: number;
}

interface ICapsuleImageList {
    link?: string;
    items: ICapsuleImageItem[];
    onDelete?: (id: number) => void;
}

const CapsuleImageList: FC<ICapsuleImageList> = ({ link = '', items = [], onDelete = () => { } }) => {
    return (
        <div className="capsule-image-list">
            {items?.length ? items.map(item => {
                return <div key={item.id} className="capsule-image-list__item">
                    <Link to={`${link}/${item.id}`}>
                        <div className="capsule-image-list__item-wrapper">
                            <div className="capsule-image-list__item-image-container">
                                <div className="capsule-image-list__item-image">
                                    <div className="capsule-image-list__item-id">{item.id}</div>
                                    <PlaceholderIcon />
                                </div>
                                <div className="capsule-image-list__title">{item.title}</div>

                            </div>
                            <div className="capsule-image-list__item-values">
                                <Tag name={<><div>Енергия</div> {item.energy ?? 0}</>} textColor={getColorById(2).textColor} color={getColorById(2).color}/>
                                <Tag name={<><div>Макс. Енергия </div> {item.maxEnergy ?? 0}</>} textColor={getColorById(3).textColor} color={getColorById(3).color}/>
                                <Tag name={<><div>Монеты</div> {item.coins ?? 0}</>} textColor={getColorById(4).textColor} color={getColorById(4).color}/>
                            </div>
                            <div className="capsule-image-list__controls">

                                <ButtonRect onClick={() => onDelete(item.id)} colorType={'red'} name={<CloseIcon />} />
                            </div>
                        </div>
                    </Link>
                </div>
            }) : <Placeholder header={'Упс...'} message={"Результаты не найдены"} />}
        </div>
    );
};

export default CapsuleImageList;
