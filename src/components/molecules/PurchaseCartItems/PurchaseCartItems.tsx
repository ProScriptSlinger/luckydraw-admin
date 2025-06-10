import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './PurchaseCartItems.scss';

interface CartItem {
    _id: {
        _id: string;
        name: {
            ru: string;
            uz: string;
        };
        productName: {
            ru: string;
            uz: string;
        };
        imageUrl: string;
        productPrice: number;
    };
    count: number;
}

interface PurchaseCartItemsProps {
    items: CartItem[];
}

const PurchaseCartItems: FC<PurchaseCartItemsProps> = ({ items }) => {
    const { t, i18n } = useTranslation();
    const currentLang = 'ru';

    return (
        <div className="purchase-cart-items">
            <h3>{t('purchases_pages.sections.cart_items')}</h3>
            <div className="purchase-cart-items__list">
                {items?.map((item) => (
                    <div key={item._id._id} className="purchase-cart-items__item">
                        <div className="purchase-cart-items__image">
                            <img src={item._id?.imageUrl} alt={item._id?.name[currentLang]} />
                        </div>
                        <div className="purchase-cart-items__info">
                            <h4>{item._id?.name[currentLang]}</h4>
                            <p>{item._id?.productName[currentLang]}</p>
                            <div className="purchase-cart-items__price">
                                <span className="price">${item._id?.productPrice}</span>
                                <span className="count">x{item.count}</span>
                                <span className="total">${item._id?.productPrice * item.count}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCartItems; 