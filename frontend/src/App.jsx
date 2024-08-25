import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import {Toaster} from 'react-hot-toast'
import Header from './components/Header'
import { useAuthContext } from './context/AuthContext'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import Account from './pages/Account'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import CampaignDetailPage from './pages/CampaignDetailPage'
import PaymentPage from './pages/PaymentPage'
import SuccessPaymentPage from './pages/SuccessPaymentPage'
import FailurePaymentPage from './pages/FailurePaymentPage'
import CreateCampaign from './pages/CreateCampaign'
import PaymentDetails from './pages/PaymentDetails'
import UpdateCampaignPage from './pages/UpdateCampaignPage'
function App() {
  const {authUser}=useAuthContext()
  return (
    <>
      <div className='bg-gray-200'>
        <Toaster/>
        <Header/>
        <Routes>
       
          <Route path='/login' element={authUser?<Navigate to='/'/>:<LoginPage/>}/>
          <Route path='/signup' element={authUser?<Navigate to='/' />:<SignupPage/>} />         
          <Route path='/' element={authUser?<Homepage/>:<Navigate to={'/signup'} />} />
          <Route path='/protected/paymentConf' element={authUser? <SuccessPaymentPage/>:<Navigate to="/auth" /> } />
          <Route path='/create' element={authUser?<CreateCampaign/>:<Navigate to={'/signup'} />} />
          <Route path='/campaign/update/:id' element={authUser?<UpdateCampaignPage/>:<Navigate to={'/signup'} />} />
          <Route path='/payment/info/:id' element={authUser?<PaymentDetails/>:<Navigate to={'/signup'} />} />
          <Route path='/cancel' element={authUser?<FailurePaymentPage/>:<Navigate to={'/signup'} />} />
          <Route path='/contact' element={authUser?<Contact/>:<Navigate to={'/signup'} />} />
          <Route path='/about' element={<AboutPage/>} />
          <Route path='/campaign/:id' element={authUser?<CampaignDetailPage/>:<Navigate to={'/signup'} />} />
          <Route path='/campaign/payment/:id' element={authUser?<PaymentPage/>:<Navigate to={'/signup'} />} />
          <Route path='/account' element={authUser?<Account/>:<Navigate to={'/signup'} />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
