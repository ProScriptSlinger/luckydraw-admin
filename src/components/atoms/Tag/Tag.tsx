import './Tag.scss';
import {FC, ReactNode} from 'react';
interface ITag {
    name: ReactNode;
    color: string;
    textColor?: string;
    close?:boolean;
    onClose?: () => void;
}


const Tag:FC<ITag> = ({ name, color,textColor='#fff', close=false, onClose=()=>{} }) => {
    return (
        <div  className={'tag'} style={{backgroundColor: color, color: textColor }}>
        {name}
    </div>
    );
};

export default Tag;