import { FC, useEffect } from 'react';
import { useDispatchEx, useSelectorEx } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import Pagination from "../../components/atoms/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { asyncGetPurchasesAction } from "../../redux/slices/purchases/purchasesAction";
import PurchaseList from "../../components/molecules/PurchaseList/PurchaseList";

const Purchases: FC = () => {
    const dispatch = useDispatchEx();
    const { pageNumber } = useParams();
    const { t } = useTranslation();

    const { isLoading, purchases, totalPurchases } = useSelectorEx(state => state.purchases);

    useEffect(() => {
        dispatch(asyncGetPurchasesAction({
            page: pageNumber ? Number(pageNumber) : 1,
            limit: 10,
            sort: 'desc'
        }));
    }, [pageNumber]);

    return (
        <>
            <div className="container">
                <HeaderPanel title={t('purchases_pages.title')}/>
                {!isLoading ?
                    <>
                        <PurchaseList items={purchases} />
                        <Pagination
                            pageUrl={'/purchases'}
                            totalItems={totalPurchases}
                            itemsPerPage={10}
                            currentPage={pageNumber ? Number(pageNumber) : 1}
                        />
                    </>
                    :
                    <PreloaderContent />
                }
            </div>
        </>
    );
};

export default Purchases; 