import { FC } from 'react';
import { useDispatchEx } from "../../hooks/redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { asyncCreateCampaignAction } from "../../redux/slices/campaigns/campaignsAction";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import Input from "../../components/atoms/Input/Input";
import Switch from "../../components/atoms/Switch/Switch";
import { useTranslation } from "react-i18next";
import FormCampaign from "../../components/molecules/FormCampaign/FormCampaign";
import { ICreateCampaignDto } from '../../helpers/types';
import { valSchemaCampaign } from '../../helpers/schemas';

const CreateCampaign: FC = () => {
    const dispatch = useDispatchEx();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const formatDate = (date: Date | string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
    };

    const formik = useFormik<ICreateCampaignDto>({
        initialValues: {
            name: {
                ru: '',
                uz: ''
            },
            productName: {
                ru: '',
                uz: ''
            },
            productDescription: {
                ru: '',
                uz: ''
            },
            imageUrl: '',
            brandLogoUrl: '',
            startDate: formatDate(new Date()),
            endDate: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
            maxParticipants: 0,
            categories: [] as string[],
            isPopular: false,
            isNew: false,
            isFinal: false,
            isCoolPrize: false,
            productPrice: 0,
            allowDonation: false,
            availableCities: [] as string[],
            deliveryPrices: {} as Record<string, number>,
        },
        validationSchema: valSchemaCampaign,
        onSubmit: async (values) => {
            const result = await dispatch(asyncCreateCampaignAction({
                ...values,
                startDate: new Date(values.startDate).toISOString(),
                endDate: new Date(values.endDate).toISOString()
            }));
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/campaigns');
            }
        },
    });

    return (
        <>
            <div className="container">
                <HeaderPanel 
                    title={t('campaigns_pages.create.title')} 
                    onSave={() => formik.handleSubmit()} 
                />
                <FormCampaign config={formik} />
            </div>
        </>
    );
};

export default CreateCampaign; 