import {FC, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatchEx, useSelectorEx} from "../../hooks/redux";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {ITask} from "../../helpers/types";
import {asyncGetTaskAction, asyncUpdateTaskAction} from "../../redux/slices/tasks/tasksAction";
import HeaderPanel from "../../components/molecules/HeaderPanel/HeaderPanel";
import PreloaderContent from "../../components/atoms/PreloaderContent/PreloaderContent";
import FormTask from "../../components/molecules/FormTask/FormTask";
import {useTranslation} from "react-i18next";

interface TaskFormValues {
    name: string;
    nameUz: string;
    description: string;
    descriptionUz: string;
    type: 'channel_subscription' | 'referral';
    rewardPoints: number;
    isActive: boolean;
    channelId: string;
    referralCode: string;
}

const Task: FC = () => {
    let {taskID} = useParams();
    const dispatch = useDispatchEx();
    const {task, isLoading} = useSelectorEx(state => state.tasks);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        nameUz: Yup.string().required('Name in Uzbek is required'),
        description: Yup.string(),
        descriptionUz: Yup.string(),
        type: Yup.string().required('Type is required'),
        rewardPoints: Yup.number().required('Reward points is required').min(0, 'Reward points must be positive'),
        isActive: Yup.boolean(),
        channelId: Yup.string().when('type', {
            is: (val: string) => val === 'channel_subscription',
            then: (schema) => schema.required('Channel ID is required for channel subscription tasks')
        }),
        referralCode: Yup.string().when('type', {
            is: (val: string) => val === 'referral',
            then: (schema) => schema.required('Referral code is required for referral tasks')
        })
    });

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues
    } = useFormik<TaskFormValues>({
        initialValues: {
            name: task?.name || '',
            nameUz: task?.nameUz || '',
            description: task?.description || '',
            descriptionUz: task?.descriptionUz || '',
            type: task?.type || 'channel_subscription',
            rewardPoints: task?.rewardPoints || 0,
            isActive: task?.isActive ?? true,
            channelId: task?.channelId || '',
            referralCode: task?.referralCode || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            if (task?._id) {
                await dispatch(asyncUpdateTaskAction({
                    _id: task._id,
                    ...values
                }));
                navigate('/tasks');
            }
        },
    });

    useEffect(() => {
        if (taskID) {
            dispatch(asyncGetTaskAction(taskID));
        }
    }, [taskID]);

    useEffect(() => {
        if (task) {
            setValues({
                name: task.name,
                nameUz: task.nameUz,
                description: task.description || '',
                descriptionUz: task.descriptionUz || '',
                type: task.type,
                rewardPoints: task.rewardPoints,
                isActive: task.isActive,
                channelId: task.channelId || '',
                referralCode: task.referralCode || ''
            });
        }
    }, [task]);

    return (
        <>
            <div className="container">
                <HeaderPanel title={`Task ID: ${task?._id}`} onSave={handleSubmit}/>
                {!isLoading ? (
                    <FormTask config={{
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        setFieldValue
                    }}/>
                ) : (
                    <PreloaderContent/>
                )}
            </div>
        </>
    );
};

export default Task; 