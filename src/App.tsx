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
import Capsule from "./pages/Capsules/Capsule.tsx";
import CreateCapsule from "./pages/Capsules/CreateCapsule.tsx";
import Capsules from "./pages/Capsules/Capsules.tsx";
import Campaigns from "./pages/Campaigns/Campaigns.tsx";
import Campaign from "./pages/Campaigns/Campaign.tsx";
import CreateCampaign from "./pages/Campaigns/CreateCampaign.tsx";

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
            <Route path="/capsules">
              <Route path=":categoryID" element={<Capsule/>} />
              <Route path="create" element={<CreateCapsule/>} />
              <Route path="page/:pageNumber" element={<Capsules/>} />
              <Route index element={<Capsules/>} />
            </Route>
            <Route path="/campaigns">
              <Route path=":campaignID" element={<Campaign/>} />
              <Route path="create" element={<CreateCampaign/>} />
              <Route path="page/:pageNumber" element={<Campaigns/>} />
              <Route index element={<Campaigns/>} />
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
