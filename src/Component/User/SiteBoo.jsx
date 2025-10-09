import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Contaxt/Context'
import NaveBar from './NaveBar'
import Footer from '../Footer'
import { motion, AnimatePresence } from "framer-motion";


function SiteBoo() {
  const [site, setSite] = useState([])
  const [sucess, setSusses] = useState(false)
  const [history, setHistory] = useState([])
  const { user } = useContext(userContext)
  const [rating, setRating] = useState('')



  const fetchSites = async () => {
    if (!user) return;
    try {
      const res = await axios.get("https://json-server-c825.onrender.com/sites");
      const visiblesite = res.data.filter((info) => info.compile !== true)
      setSite(visiblesite);

    } catch (error) {
      console.error("Error fetching sites:", error);
    }


    //THIS IS ONLY FOR FECH RATING FROM JOSN

    try {
      const userNew = await axios.get(`https://json-server-c825.onrender.com/users/${user.id}`)    //this ks onlu for get rating
      const userInfo = userNew.data
      // console.log(userInfo.rating);
      setRating(userInfo.rating)

    } catch (error) {

      console.error(error);

    }


  }




  useEffect(() => {
    fetchSites();
  }, [user]);




  const handilBoking = async (siteData) => {

    const user = JSON.parse(localStorage.getItem("user"))

    // console.log(rating);


    if (!user) {
      alert("Login First")
      return;
    }

    const booking = {
      "userId": user.id,
      "name": user.name,
      "phoneNumber": user.mobile,
      "location": siteData.location,
      "date": siteData.date,
      "siteId": siteData.id,
      "role": user.role,
      "status": "pending",
      "rating": rating
    }

    console.log(booking);


    try {
      await axios.post("https://json-server-c825.onrender.com/bookings", booking)

      let siteUpdate = { ...siteData, "seats": siteData.seats - 1 }
      // let siteUpdate="hello"
      if (siteUpdate.seats < 0) {
        siteUpdate = { ...siteUpdate, available: false }
      }
      // console.log(siteUpdate);
      // console.log(siteData.id);

      await axios.put(`https://json-server-c825.onrender.com/sites/${Number(siteData.id)}`, siteUpdate)
      setSusses(true)
      fetchSites()
      setHistory([...history, booking]);

    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to book site. Please try again.");
    }

  }


  const id = user?.id
  useEffect(() => {
    const fechHistory = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`https://json-server-c825.onrender.com/bookings?userId=${id}`)
        // console.log(res.data);
        setHistory(res.data)
        // console.log(id);

      } catch {

      }
    }
    fechHistory()
  }, [id])

  // console.log(history);
  const PRIMARY_GREEN = '#004d40';
  const ACCENT_YELLOW = '#ffc107';

   const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  return (
     <div>
      <NaveBar />

      <motion.div
        className="min-h-screen bg-white text-white p-6 pt-22"
        style={{ backgroundColor: PRIMARY_GREEN }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.h1
          className="text-3xl font-bold text-center mb-8 max-sm:pt-10"
          style={{ color: ACCENT_YELLOW }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          Available Sites
        </motion.h1>

        <AnimatePresence>
          {sucess && (
            <motion.div
              key="successModal"
              className="fixed inset-0 flex items-center justify-center  z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white text-gray-800 rounded-2xl shadow-2xl p-6 w-80 text-center"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mb-3 shadow-lg"
                    style={{ backgroundColor: PRIMARY_GREEN }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180 }}
                  >
                    ✅
                  </motion.div>
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: PRIMARY_GREEN }}
                  >
                    Booking Successful!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Your booking has been confirmed.
                  </p>
                  <button
                    onClick={() => setSusses(false)}
                    className="w-full text-white font-semibold py-2 rounded-lg shadow-lg hover:opacity-90 transition"
                    style={{ backgroundColor: PRIMARY_GREEN }}
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Animated Site Cards */}
        <motion.div
          className="flex items-center justify-center flex-wrap gap-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {site.map((a, index) => (
            <motion.div
              key={index}
              className="relative max-sm:w-80 p-6 rounded-2xl bg-white text-gray-800 shadow-xl mb-6 
              transform hover:scale-[1.02] transition duration-300 border-2 border-transparent hover:border-green-400 w-[400px]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <h2
                className="text-2xl font-bold mb-3"
                style={{ color: PRIMARY_GREEN }}
              >
                {a.name}
              </h2>

              <p className="flex items-center gap-2 text-gray-600 mb-1">
                📍 {a.location}
              </p>

              <p className="flex items-center gap-2 text-gray-600 mb-1">
                💰{" "}
                <span className="font-bold text-green-600">₹{a.price}</span>
              </p>

              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">
                  📅 Date :{" "}
                  <span
                    style={{ color: PRIMARY_GREEN, fontWeight: "bold" }}
                  >
                    {a.date}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-1">
                  Time :{" "}
                  <span
                    style={{ color: PRIMARY_GREEN, fontWeight: "bold" }}
                  >
                    {a.reporting_time}
                  </span>
                </label>
              </div>

              <div>
                {history.find((b) => b.siteId == a.id) ? (
                  <div className="w-full py-2 text-center bg-gray-300 text-gray-600 rounded-xl font-semibold cursor-not-allowed">
                    Booked
                  </div>
                ) : a.available ? (
                  <motion.button
                    className="w-full text-white font-semibold py-2 rounded-xl shadow-lg hover:opacity-90 transition"
                    style={{ backgroundColor: PRIMARY_GREEN }}
                    onClick={() => handilBoking(a)}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                ) : (
                  <div className="w-full text-center bg-red-600 text-white font-semibold py-2 rounded-xl shadow-lg">
                    Full
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default SiteBoo
