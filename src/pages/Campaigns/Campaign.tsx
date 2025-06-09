import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatchEx, useSelectorEx } from "../../hooks/redux";
import { useFormik } from "formik";
import { asyncGetCampaignAction, asyncUpdateCampaignAction } from "../../redux/slices/campaigns/campaignsAction";
import { useTranslation } from "react-i18next";
import { valSchemaCampaign } from '../../helpers/schemas';
import { IUpdateCampaignDto } from '../../helpers/types';
import PreloaderContent from '../../components/atoms/PreloaderContent/PreloaderContent';
import FormCampaign from '../../components/molecules/FormCampaign/FormCampaign';
import HeaderPanel from '../../components/molecules/HeaderPanel/HeaderPanel';

// Utility functions for date conversion
const toLocalDateTimeString = (date: Date | string): string => {
  if (!date) return '';
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
  const localISOTime = new Date(d.getTime() - offset).toISOString();
  return localISOTime.slice(0, 16); // "YYYY-MM-DDTHH:MM"
};

const toISODateTimeString = (localDateTime: string): string => {
  if (!localDateTime) return '';
  const d = new Date(localDateTime);
  return d.toISOString();
};

const Campaign: FC = () => {
    const { campaignID } = useParams();
    const dispatch = useDispatchEx();
    const { t } = useTranslation();
    const { isLoadingCampaign, campaign } = useSelectorEx(state => state.campaigns);

    const formik = useFormik<IUpdateCampaignDto>({
        initialValues: {
            _id: campaignID || '',
            name: { ru: '', uz: '' },
            productName: { ru: '', uz: '' },
            productDescription: { ru: '', uz: '' },
            imageUrl: '',
            brandLogoUrl: '',
            startDate: toLocalDateTimeString(new Date()),
            endDate: toLocalDateTimeString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
            maxParticipants: 0,
            categories: [],
            isPopular: false,
            isNew: false,
            isFinal: false,
            isCoolPrize: false,
            productPrice: 0,
            allowDonation: false,
            availableCities: [],
            deliveryPrices: {},
        },
        validationSchema: valSchemaCampaign,
        onSubmit: (values) => {
            if (campaignID && values.startDate && values.endDate) {
                const updateData: IUpdateCampaignDto = {
                    ...values,
                    _id: campaignID,
                    startDate: toISODateTimeString(values.startDate),
                    endDate: toISODateTimeString(values.endDate),
                };
                dispatch(asyncUpdateCampaignAction(updateData));
            }
        },
    });

    useEffect(() => {
        if (campaignID) {
            dispatch(asyncGetCampaignAction(campaignID));
        }
    }, [campaignID]);

    useEffect(() => {
        if (campaign) {
            formik.setValues({
                ...campaign,
                startDate: toLocalDateTimeString(campaign.startDate),
                endDate: toLocalDateTimeString(campaign.endDate),
            });
        }
    }, [campaign]);

    return (
        <div className="container">
            <HeaderPanel 
                title={t('campaigns_pages.page.title')} 
                onSave={() => formik.handleSubmit()} 
            />
            {!isLoadingCampaign ? (
                <FormCampaign config={formik} />
            ) : (
                <PreloaderContent />
            )}
        </div>
    );
};

export default Campaign;