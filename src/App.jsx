import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage1 from './Component/USERPAGES/HomePage1';
import Login from './Component/Login';
// import AdminHome from './Component/Admin/AdminHome';
import AdminHomePage from './Component/ADMINPAGES/AdminHomePage';
import HistoryPage from './Component/USERPAGES/HistoryPage';
import { userContext } from './Component/Contaxt/Context'
import AddBoysPage from './Component/ADMINPAGES/AddBoysPage';
import NotificationPage from './Component/USERPAGES/NotificationPage';
import AddSitePage from './Component/ADMINPAGES/AddSitePage';
import BoysInfoPage from './Component/ADMINPAGES/BoysInfoPage';
import Edit from './Component/Admin/Edit';
import ViewSiteInfoAdmin from './Component/Admin/ViewSiteInfoAdmin';
import AboutSites from './Component/Admin/AboutSites';
import Payment from './Component/Admin/Payment';
import UserPaymentPage from './Component/USERPAGES/UserPaymentPage';
import UserRating from './Component/User/UserRating';
import About from './Component/User/About';
import SiteBookPage from './Component/USERPAGES/SiteBookPage';


function App() {
  const [user, setUser] = useState(null)
  const [logUser, setLogUser] = useState('')
  const [tudo,setTudo]=useState(false)
  const [notficationList,setNotificationList]=useState([])
  // const [fech,setFech]=useState('')


  console.log(logUser);

  useEffect(() => {
    const saveUser = localStorage.getItem("user")
    if (saveUser) {
      // console.log(saveUser);
      
      setUser(JSON.parse(saveUser))
    }
  }, [])


  return (
    <>
      <userContext.Provider value={{ user, setUser,tudo,setTudo,notficationList,setNotificationList}}>
        <BrowserRouter>
          <Routes>
            <Route path='/admin' element={<AdminHomePage />} />
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<HomePage1 />} />
            <Route path='/sitebook' element={<SiteBookPage/>} />
            <Route path='/history' element={<HistoryPage/>} />
            <Route path='/addboys' element={<AddBoysPage/>} />
            <Route path='/addsite' element={<AddSitePage/>} />
            <Route path='/boysinfo' element={<BoysInfoPage/>} />
            <Route path='/edit/:id' element={<Edit/>} />
            <Route path='/AdmitSiteInfo' element={<ViewSiteInfoAdmin/>} />
            <Route path='/aboutsites/:id' element={<AboutSites/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/notificationuser' element={<NotificationPage/>} />
            {/* some user things */}
            <Route path='/userpayment' element={<UserPaymentPage/>} />
            <Route path='/userrating' element={<UserRating/>} />
            <Route path='/about' element={<About/>} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App

