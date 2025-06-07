import {FC, useEffect} from 'react';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import { asyncGetUsersAction } from '../../redux/slices/users/usersAction';

import {useParams} from "react-router-dom";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import CategoryInfoList from "../../components/molecules/CategoryInfoList/CategoryInfoList";
import Pagination from "../../components/atoms/Pagination/Pagination";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import { selectUsersList} from "../../selectors/selectors";
import {useTranslation} from "react-i18next";


const Users:FC = () => {

    const {isLoading,users,totalUsers} = useSelectorEx(state => state.users);
    const dispatch = useDispatchEx();

    const dataList: any[] = useSelectorEx(selectUsersList)
    const { pageNumber } = useParams();

    const onPagination = (currentPage:number) =>{
    }
    const { t } = useTranslation();

    useEffect(()=>{
        dispatch(asyncGetUsersAction({
            page: pageNumber ? Number(pageNumber) : 1,
            limit:10,
            sort:'desc'
        }));
    },[pageNumber])
    return (
        <>
            <div className="container">
                <HeaderPanel title={t('users_pages.title')}  />
                {!isLoading ?
                    <>
                        <CategoryInfoList link={'/users'} items={dataList}/>
                        <Pagination
                            pageUrl={'/users'}
                            totalItems={totalUsers}
                            itemsPerPage={10}
                            currentPage={pageNumber ? Number(pageNumber) : 1}
                            onPageChange={onPagination}
                        />
                    </>
                    :
                    <PreloaderContent/>
                }

            </div>
        </>
    );
};

export default Users;