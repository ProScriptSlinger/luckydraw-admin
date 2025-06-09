import {createSelector} from "reselect";
import {RootState} from "../redux/store";
import {getRandomColor, getTimeDate} from "../helpers/scripts";
import participants from "../pages/Participants/Participants.tsx";

export const selectUsers = (state:RootState) => state.users.users;

export const selectUsersList = createSelector(selectUsers, (users)=>{
    return users.map((item:any)=>{
        return {
            keyID: item._id,
            id: item._id,
            title: item?.email,
            date: getTimeDate(item.createdAt as string),
            status: {
                name:item?.roles![0]?.title,
                color: getRandomColor(item?.roles![0]?.title)
            },
        }
    })
});

export const selectParticipants = (state:RootState) => state.participants.participants;

export const selectParticipantsList = createSelector(selectParticipants, (participants)=>{
    return participants.map((item:any)=>{
        const telegram_user = JSON.parse(item?.telegram_user) ?? ""
        return {
            keyID: item._id,
            id: item._id,
            title: item?.name,
            date: getTimeDate(item.createdAt as string),
            points: item.points,
            tickets: item.tickets,
            dailyStreak: item.dailyStreak,
            telegram_username: telegram_user?.username
        }
    })
});