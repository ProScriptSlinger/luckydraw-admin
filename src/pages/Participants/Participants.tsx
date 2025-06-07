import {FC, useEffect} from 'react';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";

import {useParams} from "react-router-dom";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import CategoryInfoList from "../../components/molecules/CategoryInfoList/CategoryInfoList";
import Pagination from "../../components/atoms/Pagination/Pagination";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import {selectParticipantsList, selectUsersList} from "../../selectors/selectors";
import {useTranslation} from "react-i18next";
import {
    asyncGetParticipantsAction
} from "../../redux/slices/participants/participantsAction.ts";


const Participants:FC = () => {

    const {isLoading,participants,totalParticipants} = useSelectorEx(state => state.participants);
    const dispatch = useDispatchEx();

    const dataList: any[] = useSelectorEx(selectParticipantsList)
    const { pageNumber } = useParams();


    const { t } = useTranslation();

    useEffect(()=>{
        dispatch(asyncGetParticipantsAction({
            page: pageNumber ? Number(pageNumber) : 1,
            limit:10,
            sort:'desc'
        }));
    },[pageNumber])
    return (
        <>
            <div className="container">
                <HeaderPanel title={"Участники"}  />
                {!isLoading ?
                    <>
                        <CategoryInfoList link={'/participants'} items={dataList}/>
                        <Pagination
                            pageUrl={'/participants'}
                            totalItems={totalParticipants}
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

export default Participants;