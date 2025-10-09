import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Component/Contaxt/Context";
import AOS from "aos";
import "aos/dist/aos.css"; // ✅ Add this import once

// 🔹 Lazy load all pages
const HomePage1 = lazy(() => import("./Component/USERPAGES/HomePage1"));
const Login = lazy(() => import("./Component/Login"));
const AdminHomePage = lazy(() => import("./Component/ADMINPAGES/AdminHomePage"));
const HistoryPage = lazy(() => import("./Component/USERPAGES/HistoryPage"));
const AddBoysPage = lazy(() => import("./Component/ADMINPAGES/AddBoysPage"));
const NotificationPage = lazy(() => import("./Component/USERPAGES/NotificationPage"));
const AddSitePage = lazy(() => import("./Component/ADMINPAGES/AddSitePage"));
const BoysInfoPage = lazy(() => import("./Component/ADMINPAGES/BoysInfoPage"));
const Edit = lazy(() => import("./Component/Admin/Edit"));
const ViewSiteInfoAdmin = lazy(() => import("./Component/Admin/ViewSiteInfoAdmin"));
const AboutSites = lazy(() => import("./Component/Admin/AboutSites"));
const Payment = lazy(() => import("./Component/Admin/Payment"));
const UserPaymentPage = lazy(() => import("./Component/USERPAGES/UserPaymentPage"));
const UserRating = lazy(() => import("./Component/User/UserRating"));
const About = lazy(() => import("./Component/User/About"));
const SiteBook = lazy(() => import("./Component/User/SiteBoo")); // ✅ fix path typo if needed

function App() {
  const [user, setUser] = useState(null);
  const [logUser, setLogUser] = useState("");
  const [tudo, setTudo] = useState(false);
  const [notficationList, setNotificationList] = useState([]);

  useEffect(() => {
    const saveUser = localStorage.getItem("user");
    if (saveUser) {
      setUser(JSON.parse(saveUser));
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, tudo, setTudo, notficationList, setNotificationList }}>
      <BrowserRouter>
        {/* Suspense fallback while components are loading */}
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center min-h-screen bg-white text-green-700">
              {/* Spinner animation */}
              <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-4"></div>
              {/* Text */}
              <p className="text-xl font-semibold">Loading...</p>
            </div>
          } F
        >
          <Routes>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomePage1 />} />
            <Route path="/sitebook" element={<SiteBook />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/addboys" element={<AddBoysPage />} />
            <Route path="/addsite" element={<AddSitePage />} />
            <Route path="/boysinfo" element={<BoysInfoPage />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/AdmitSiteInfo" element={<ViewSiteInfoAdmin />} />
            <Route path="/aboutsites/:id" element={<AboutSites />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/notificationuser" element={<NotificationPage />} />
            <Route path="/userpayment" element={<UserPaymentPage />} />
            <Route path="/userrating" element={<UserRating />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
/* HTML: <div class="loader"></div> */
