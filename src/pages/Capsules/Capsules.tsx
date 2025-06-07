import React, {FC, useEffect} from 'react';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Pagination from "../../components/atoms/Pagination/Pagination.tsx";
import {asyncDeleteCapsuleAction, asyncGetCapsulesAction} from "../../redux/slices/capsules/capsulesAction.ts";
import CapsuleImageList from "../../components/molecules/CapsuleImageList/CapsuleImageList.tsx";


interface DataType {
    key: string;
    id: number;
    title: string;
}

const Capsules:FC = () => {

    const dispatch = useDispatchEx();
    const { pageNumber } = useParams();
    useEffect(()=>{
        dispatch(asyncGetCapsulesAction({
            page: pageNumber ? Number(pageNumber) : 1,
            limit:10,
            sort:'desc'
        }));
    },[pageNumber]);

    const {isLoading,capsules,totalCapsules} = useSelectorEx(state => state.capsules);
    const data: DataType[] = capsules?.length ? capsules.map((item:any)=>{
        return {
            key: item.id.toString(),
            id: item.id,
            title: item.title,
            energy: item.energy,
            maxEnergy: item.maxEnergy,
            coins: item.coins,
        }
    }) : [];



    const onDelete = (id:number)=>{
        dispatch(asyncDeleteCapsuleAction(id));
    }
    const { t } = useTranslation();
    //if(isLoading) return <Preloader/>;
    return (
        <>
            <div className="container">
                <HeaderPanel title={t('capsules_pages.title')} addUrl={'/capsules/create'} />
                {!isLoading ?
                    <>
                        <CapsuleImageList onDelete={onDelete} link={'/capsules'} items={data}/>
                        <Pagination
                            pageUrl={'/capsules'}
                            totalItems={totalCapsules}
                            itemsPerPage={10}
                            currentPage={pageNumber ? Number(pageNumber) : 1}

                        />
                    </>
                    :
                    <PreloaderContent/>
                }

            </div>

        </>
    );
};

export default Capsules;