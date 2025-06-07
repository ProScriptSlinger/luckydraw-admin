import './TextAvatar.scss';
import {FC} from 'react';
import {getRandomColor} from "../../../helpers/scripts";

interface ITextAvatar{
    className?: string;
    name?: string;
    image?: string;
}

const TextAvatar:FC<ITextAvatar> = ({className='', name='',image ='' }) => {
    const initial = name?.charAt(0).toUpperCase();
    return (
        <div className={`text-avatar ${className}`} style={{ backgroundColor: getRandomColor(name) }}>
            {name ?
                <span className="text-avatar__letter">{initial}</span>
                :
                <img src={image} alt=""/>
            }
        </div>
    );
};

export default TextAvatar;