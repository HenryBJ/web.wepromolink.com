import React from 'react';
import HomeLayout from './layouts/HomeLayout';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Faq from './pages/Faq';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import { ProtectedRoute } from './router/ProtectedRoute';
import Settings from './pages/Settings';
import Campaign from './pages/Campaign';
import Shared from './pages/Shared';
import Balance from './pages/Balance';
import CreateCampaign from './pages/CreateCampaign';
import Feed from './pages/Feed';
import Notification from './pages/Notification';
import SubPlan from './pages/SubPlan';
import Payout from './pages/Payout';
import Deposit from './pages/Deposit';
import CampaignDetail from './pages/CampaignDetail';
import SharedDetail from './pages/SharedDetail';
import TransactionDetail from './pages/TransactionDetail';
import NotificationDetail from './pages/NotificationDetail';
import SubPlanDetail from './pages/SubPlanDetail';
import Withdraw from './pages/Withdraw';
import { GetCampaignStats } from './services/CampaignService';
import CampaignStats from './pages/CampaignStats';
import SharedStats from './pages/SharedStats';
// import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/notifications" element={<Notification/>} />
            <Route path="/payouts" element={<Payout/>} />
            <Route path="/subcriptions" element={<SubPlan/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/campaigns" element={<Campaign />} />
            <Route path="/campaigns/detail/:id" element={<CampaignDetail/>} />
            <Route path="/campaigns/stats/:id" element={<CampaignStats/>} />
            <Route path="/links/detail/:id" element={<SharedDetail/>} />
            <Route path="/links/stats/:id" element={<SharedStats/>} />
            <Route path="/balance/detail/:id" element={<TransactionDetail/>} />
            <Route path="/notifications/detail/:id" element={<NotificationDetail/>} />
            <Route path="/subcriptions/detail/:id" element={<SubPlanDetail/>} />
            <Route path='/create' element={<CreateCampaign />} />
            <Route path="/links" element={<Shared />} />
            <Route path="/balance" element={<Balance />} />
          </Route>
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
