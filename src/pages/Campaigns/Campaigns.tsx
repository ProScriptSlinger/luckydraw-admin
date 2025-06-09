import { FC, useEffect } from 'react';
import { useDispatchEx, useSelectorEx } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import Pagination from "../../components/atoms/Pagination/Pagination";
import { useTranslation } from "react-i18next";
import { asyncGetCampaignsAction } from "../../redux/slices/campaigns/campaignsAction";
import CampaignList from "../../components/molecules/CampaignList/CampaignList";

const Campaigns: FC = () => {
    const dispatch = useDispatchEx();
    const { pageNumber } = useParams();
    const { t } = useTranslation();

    const { isLoading, campaigns, totalCampaigns } = useSelectorEx(state => state.campaigns);

    useEffect(() => {
        dispatch(asyncGetCampaignsAction({
            page: pageNumber ? Number(pageNumber) : 1,
            limit: 10,
            sort: 'desc'
        }));
    }, [pageNumber]);

    return (
        <>
            <div className="container">
                <HeaderPanel title={t('campaigns_pages.title')} addUrl={'/campaigns/create'} />
                {!isLoading ?
                    <>
                        <CampaignList items={campaigns} />
                        <Pagination
                            pageUrl={'/campaigns'}
                            totalItems={totalCampaigns}
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

export default Campaigns; 