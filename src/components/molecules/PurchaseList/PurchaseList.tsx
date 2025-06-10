import { FC } from 'react';
import { IPurchase } from '../../../helpers/types';
import { Link } from 'react-router-dom';
import Tag from '../../atoms/Tag/Tag';
import { getColorById } from '../../../helpers/scripts';
import './PurchaseList.scss';
import { format } from 'date-fns';

interface PurchaseListProps {
    items: IPurchase[];
}

const PurchaseList: FC<PurchaseListProps> = ({ items }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return { color: getColorById(3).color, textColor: getColorById(3).textColor };
            case 'pending':
                return { color: getColorById(2).color, textColor: getColorById(2).textColor };
            case 'failed':
                return { color: getColorById(4).color, textColor: getColorById(4).textColor };
            default:
                return { color: getColorById(2).color, textColor: getColorById(2).textColor };
        }
    };

    return (
        <div className="purchase-list">
            {items?.map((item, index) => {
                const user = item?.userId;
                const avatar = JSON.parse(user?.telegram_user || '{}')?.photo_url;
                return (
                    <div key={item._id} className="purchase-list__item">
                        <Link to={`/purchases/${item._id}`}>
                            <div className="purchase-list__item-wrapper">
                                <div className="purchase-list__item-image-container">
                                    <div className="purchase-list__item-id">
                                        #{index + 1}
                                    </div>
                                    <div className="purchase-list__item-image">
                                        {avatar ? (
                                            <img src={avatar} alt={user?.name} />
                                        ) : (
                                            <div className="purchase-list__item-placeholder">
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="purchase-list__item-title">
                                        {user?.name}
                                    </div>
                                </div>
                                <div className="purchase-list__item-details">
                                    <div className="purchase-list__item-values">
                                        <Tag
                                            name={<><div>Count:</div> {item.cartItems.length}</>}
                                            textColor={getColorById(5).textColor}
                                            color={getColorById(5).color}
                                        />
                                        <Tag
                                            name={<><div>Price:</div> ${item.totalPrice}</>}
                                            textColor={getColorById(1).textColor}
                                            color={getColorById(1).color}
                                        />
                                        <Tag
                                            name={<><div>Status:</div> {item.status}</>}
                                            textColor={getStatusColor(item.status).textColor}
                                            color={getStatusColor(item.status).color}
                                        />  
                                        <Tag
                                            name={<><div>Date:</div> {format(item.createdAt || new Date(), 'yyyy-MM-dd HH:mm')}</>}
                                            textColor={getColorById(4).textColor}
                                            color={getColorById(4).color}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default PurchaseList; 