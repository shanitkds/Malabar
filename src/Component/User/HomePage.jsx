import React, { useContext, useEffect, useState } from 'react'
import { FaHistory } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import { TbBrandBooking } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Contaxt/Context';
import { FaCreditCard } from "react-icons/fa6";
import axios from 'axios'

// Define the custom green color for consistency
const PRIMARY_GREEN = '#004d40'; // Deep Teal-Green (used as BG and accents)
const ACCENT_YELLOW = '#ffc107'; // Bright accent color for contrast

function HomePage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState([])
  const [latest, setLatest] = useState(localStorage.getItem("latestNotificationId"))
  const { tudo, setTudo, setNotificationList } = useContext(userContext)

  const FechNotification = async () => {
    try {

      const res = await axios.get("http://localhost:5000/notification")
      const all = res.data
      console.log(res.data);
      // const storId = localStorage.getItem("latestNotificationId")


      if (all.length > 0) {
        const newOne = all[all.length - 1]

        if (newOne.id != latest) {
          alert("you have a notification")
          localStorage.setItem("latestNotificationId", newOne.id)
          setLatest(newOne.id)
        }

        setNotificationList(all)
      }


    } catch (err) {

      console.error("Error fetching notifications:", err);

    }
  }

  useEffect(() => {
    FechNotification();
    // const interval = setInterval(() => {
    //     FechNotification();
    // }, 3000);

    // return () => clearInterval(interval);
  }, [latest]);

  return (
    <div
      
      className="min-h-screen pt-20 max-sm:pt-10 text-white w-full"
      style={{ backgroundColor: PRIMARY_GREEN }}
      onClick={() => setTudo(false)}
    >
      
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1
          
          className="text-4xl sm:text-6xl font-extrabold mb-4 text-white"
        >
          Welcome to Catering Boys
        </h1>
        <p
         
          className="text-lg sm:text-xl max-w-3xl mb-8"
          style={{ color: ACCENT_YELLOW }}
        >
          Book catering staff easily, track your bookings, manage payments, and rate services – **all in one seamless platform.**
        </p>
        <button
          
          className="bg-white px-10 py-3 rounded-xl shadow-2xl font-bold text-lg hover:shadow-lg transition transform hover:-translate-y-0.5"
          style={{ color: PRIMARY_GREEN }}
          onClick={() => navigate("/sitebook")}
        >
          Book Work Now
        </button>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-12 max-w-7xl mx-auto">

        
        <div
          
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition cursor-pointer text-gray-800"
          onClick={() => navigate("/sitebook")}
        >
          <h2
            
            className="text-xl font-bold mb-3 flex gap-3 items-center"
            style={{ color: PRIMARY_GREEN }}
          >
            <TbBrandBooking className="text-3xl" style={{ color: PRIMARY_GREEN }} /> Easy Booking
          </h2>
          <p className="text-gray-600">Book your works now.</p>
        </div>

        
        <div
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition cursor-pointer text-gray-800"
          onClick={() => navigate("/history")}
        >
          <h2
            className="text-xl font-bold mb-3 flex gap-3 items-center"
            style={{ color: PRIMARY_GREEN }}
          >
            <FaHistory className="text-3xl text-yellow-600" /> Booking History
          </h2>
          <p className="text-gray-600">View your bookings history.</p>
        </div>

        
        <div
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition cursor-pointer text-gray-800"
          onClick={() => navigate('/userrating')}
        >
          <h2
            className="text-xl font-bold mb-3 flex gap-3 items-center"
            style={{ color: PRIMARY_GREEN }}
          >
            <FcRating className="text-3xl" /> Ratings
          </h2>
          <p className="text-gray-600">Check your rating.</p>
        </div>

        
        <div
          className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition cursor-pointer text-gray-800"
          onClick={() => navigate('/userpayment')}
        >
          <h2
            className="text-xl font-bold mb-3 flex gap-3 items-center"
            style={{ color: PRIMARY_GREEN }}
          >
            <span className="text-3xl"><FaCreditCard className="text-3xl text-blue-400" /></span> Payments
          </h2>
          <p className="text-gray-600">Check pending payments .</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;