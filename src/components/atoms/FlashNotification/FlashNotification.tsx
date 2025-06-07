import {FC, useEffect, useState} from 'react';
import './FlashNotification.scss';
import Tag from "../Tag/Tag"; // Импортируйте файл стилей


interface IFlashNotification{
    message?: string;
    status: {
        color: string;
        name: string;
    };
    onClose?: ()=>void
}

const FlashNotification:FC<IFlashNotification> = ({ message,status, onClose=()=>{} }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);

        const timer = setTimeout(() => {
            setShow(false);
            const hideTimer = setTimeout(() => {
                onClose();
            }, 500); // Подождать окончания анимации исчезновения
            return () => clearTimeout(hideTimer);
        }, 3000); // Время отображения сообщения

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`flash-notification ${show ? 'show' : ''}`}>
            <div className="category-notifications-list__item">
                <div className="category-notifications-list__item-wrapper">
                    <div className="category-notifications-list__item-image-container">
                        <div className="category-info-list__item-status">
                            <Tag name={status.name} textColor={'#fff'} color={status.color} />
                        </div>

                        <div className="category-notifications-list__item-title">{message}</div>
                    </div>
                    <div className="category-notifications-list__item-details">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashNotification;
