import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import RequireAuth from "./hoc/RequireAuth.tsx";
import Layout from "./pages/layouts/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import User from "./pages/Users/User.tsx";
import Users from "./pages/Users/Users.tsx";
import MySettings from "./pages/MySettings.tsx";
import './i18n';
import './styles/index.scss';
import Participants from "./pages/Participants/Participants.tsx";
import Participant from "./pages/Participants/Participant.tsx";
import Campaigns from "./pages/Campaigns/Campaigns.tsx";
import Campaign from "./pages/Campaigns/Campaign.tsx";
import CreateCampaign from "./pages/Campaigns/CreateCampaign.tsx";
import Purchases from "./pages/Purchases/Purchases.tsx";
import Purchase from "./pages/Purchases/Purchase.tsx";
import Tasks from "./pages/Tasks/Tasks.tsx";
import Task from "./pages/Tasks/Task.tsx";
import CreateTask from './pages/Tasks/CreateTask.tsx';

function App() {
  return (
    <>
      <Routes>
        {/*public routes*/}
        <Route path="/login" element={<Login/>}/>
      {/*  <Route path="/registration" element={<Registration/>}/>*/}
        {/*protected routes*/}
        <Route element={<RequireAuth/>}>
          <Route element={<Layout/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/users">
              <Route path=":userID" element={<User/>} />
              <Route path="page/:pageNumber" element={<Users/>} />
              <Route index element={<Users/>} />
            </Route>
            <Route path="/participants">
              <Route path=":participantID" element={<Participant/>} />
              <Route path="page/:pageNumber" element={<Participants/>} />
              <Route index element={<Participants/>} />
            </Route>
            <Route path="/tasks">
              <Route path="create" element={<CreateTask/>} />
              <Route path=":taskID" element={<Task/>} />
              <Route path="page/:pageNumber" element={<Tasks/>} />
              <Route index element={<Tasks/>} />
            </Route>
            <Route path="/campaigns">
              <Route path=":campaignID" element={<Campaign/>} />
              <Route path="create" element={<CreateCampaign/>} />
              <Route path="page/:pageNumber" element={<Campaigns/>} />
              <Route index element={<Campaigns/>} />
            </Route>
            <Route path="/purchases">
              <Route path=":purchaseID" element={<Purchase/>} />
              <Route path="page/:pageNumber" element={<Purchases/>} />
              <Route index element={<Purchases/>} />
            </Route>

            <Route path="/mysettings" element={<MySettings/>}/>
            <Route path="/logout" element={<Dashboard/>}/>
          </Route>
        </Route>

        <Route path="*" element={<Dashboard/>} />
      </Routes>
    </>
  )
}

export default App
