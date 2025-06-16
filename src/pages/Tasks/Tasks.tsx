import {FC, useEffect} from 'react';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import TaskInfoList from "../../components/molecules/TaskInfoList/TaskInfoList";
import Pagination from "../../components/atoms/Pagination/Pagination";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import {useTranslation} from "react-i18next";
import {asyncGetTasksAction} from "../../redux/slices/tasks/tasksAction";
import {getTimeDate} from "../../helpers/scripts";

const Tasks: FC = () => {
    const {isLoading, tasks, totalTasks} = useSelectorEx(state => state.tasks);
    const dispatch = useDispatchEx();
    const {pageNumber} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();
    
    const dataList = tasks?.map((item: any) => ({
        keyID: item._id,
        id: item._id,
        title: item.name,
        date: getTimeDate(item.createdAt as string),
        points: item.rewardPoints,
        type: item.type,
        channelId: item.channelId,
        isActive: item.isActive
    }));

    useEffect(() => {
        dispatch(asyncGetTasksAction({
            page: pageNumber ? Number(pageNumber) : 1,
            limit: 10,
            sort: 'desc'
        }));
    }, [pageNumber]);

    return (
        <>
            <div className="container">
                <HeaderPanel title={t('tasks_pages.title')} addUrl='/tasks/create'/>
                {!isLoading ?
                    <>
                        <TaskInfoList link={'/tasks'} items={dataList}/>
                        <Pagination
                            pageUrl={'/tasks'}
                            totalItems={totalTasks}
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

export default Tasks; 