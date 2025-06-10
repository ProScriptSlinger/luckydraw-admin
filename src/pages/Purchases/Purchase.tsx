import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatchEx, useSelectorEx } from "../../hooks/redux";
import { useFormik } from "formik";
import { asyncGetPurchaseAction, asyncUpdatePurchaseAction } from "../../redux/slices/purchases/purchasesAction";
import { useTranslation } from "react-i18next";
import { IUpdatePurchaseDto } from '../../helpers/types';
import { valSchemaPurchase } from '../../helpers/schemas';
import PreloaderContent from '../../components/atoms/PreloaderContent/PreloaderContent';
import FormPurchase from '../../components/molecules/FormPurchase/FormPurchase';
import PurchaseCartItems from '../../components/molecules/PurchaseCartItems/PurchaseCartItems';
import HeaderPanel from '../../components/molecules/HeaderPanel/HeaderPanel';

const Purchase: FC = () => {
    const { purchaseID } = useParams();
    const dispatch = useDispatchEx();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isLoadingPurchase, purchase } = useSelectorEx(state => state.purchases);

    const formik = useFormik<IUpdatePurchaseDto>({
        initialValues: {
            _id: purchaseID || '',
            cartItems: [],
            userId: '',
            totalPrice: 0,
            paymentMethod: 'payme',
            status: 'pending',
            isDonating: false,
            deliveryAddress: {
                city: '',
                district: '',
                house: '',
                apartment: '',
                landmark: ''
            },
            paymentId: '',
            receiptNumber: ''
        },
        validationSchema: valSchemaPurchase,
        onSubmit: (values) => {
            if (purchaseID) {
                dispatch(asyncUpdatePurchaseAction(values)).then(() => {
                    navigate('/purchases');
                });
            }
        },
    });

    useEffect(() => {
        if (purchaseID) {
            dispatch(asyncGetPurchaseAction(purchaseID));
        }
    }, [purchaseID]);

    useEffect(() => {
        if (purchase) {
            formik.setValues(purchase);
        }
    }, [purchase]);

    return (
        <div className="container">
            <HeaderPanel 
                title={t('purchases_pages.page.title')} 
                onSave={() => formik.handleSubmit()} 
            />
            {!isLoadingPurchase && purchase ? (
                <>
                    <PurchaseCartItems items={purchase.cartItems} />
                    <FormPurchase config={formik} />
                </>
            ) : (
                <PreloaderContent />
            )}
        </div>
    );
};

export default Purchase; 