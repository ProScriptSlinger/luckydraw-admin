import {ActionReducerMapBuilder, createSlice} from "@reduxjs/toolkit";
import {ITask} from "../../../helpers/types";
import {toast} from "react-toastify";
import {toastSetting} from "../../../helpers/scripts";
import {
    asyncDeleteTaskAction,
    asyncGetTaskAction,
    asyncGetTasksAction,
    asyncUpdateTaskAction
} from "./tasksAction";

interface tasksState {
    tasks: ITask[];
    task: ITask | null;
    totalTasks: number;
    isLoading: boolean;
    isLoadingTask: boolean;
    error: string
}

const initialState: tasksState = {
    tasks: [],
    task: null,
    totalTasks: 0,
    isLoading: false,
    isLoadingTask: false,
    error: ''
};

const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        resetTasks: () => initialState,
    },
    extraReducers: (builder: ActionReducerMapBuilder<tasksState>) => {
        builder
            .addCase(asyncGetTasksAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncGetTasksAction.fulfilled, (state, action) => {
                const { rows, count } = action.payload;
                state.isLoading = false;
                state.error = '';
                state.totalTasks = count;
                state.tasks = rows;
            })
            .addCase(asyncGetTasksAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        builder
            .addCase(asyncGetTaskAction.pending, (state) => {
                state.isLoadingTask = true;
                state.error = '';
            })
            .addCase(asyncGetTaskAction.fulfilled, (state, action) => {
                state.isLoadingTask = false;
                state.error = '';
                state.task = action.payload;
            })
            .addCase(asyncGetTaskAction.rejected, (state, action) => {
                state.isLoadingTask = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        builder
            .addCase(asyncUpdateTaskAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncUpdateTaskAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload ;
                }
                toast.success('Task updated successfully', toastSetting);
            })
            .addCase(asyncUpdateTaskAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });

        builder
            .addCase(asyncDeleteTaskAction.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(asyncDeleteTaskAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = '';
                state.tasks = state.tasks.filter(task => task._id !== action.payload._id);
                toast.success('Task deleted successfully', toastSetting);
            })
            .addCase(asyncDeleteTaskAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                toast.error(action.payload as string, toastSetting);
            });
    }
});

export const { resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer; 