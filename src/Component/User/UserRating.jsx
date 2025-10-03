import React, { useContext, useEffect, useState } from 'react'
import NaveBar from './NaveBar'
import axios from 'axios'
import { userContext } from '../Contaxt/Context'
import { FaCheckCircle, FaExclamationCircle, FaThumbsUp } from "react-icons/fa";


function UserRating() {
     const { user } = useContext(userContext);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchRating = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        setUserRating(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchRating();
  }, [user]); 

  
  return (
    <div className="min-h-screen bg-[#004d40] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
  <NaveBar />

  <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md text-center text-white">
    {userRating ? (
      <div>
        {/* User Greeting */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 mb-4">
          Hi {userRating.name}
        </h2>
        <p className="text-gray-300 mb-6 text-sm sm:text-base md:text-lg">Your Rating Is</p>

        {/* Stars */}
        <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-6">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <span
              key={index}
              className={`text-3xl sm:text-4xl md:text-5xl transition transform hover:scale-125 duration-200 cursor-pointer ${
                userRating.rating >= star
                  ? "text-amber-400 drop-shadow-lg"
                  : "text-gray-500 hover:text-amber-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Feedback message with icons */}
        <div className="flex justify-center items-center gap-2 text-sm sm:text-base md:text-lg font-medium">
          {userRating.rating <= 2 ? (
            <>
              <FaExclamationCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-400" />
              <span className="text-red-400">You need to improve</span>
            </>
          ) : userRating.rating >= 3 && userRating.rating < 5 ? (
            <>
              <FaThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400" />
              <span className="text-yellow-400">Good! Keep improving</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-400" />
              <span className="text-green-400">Excellent! Keep going</span>
            </>
          )}
        </div>
      </div>
    ) : (
      <div className="animate-pulse text-gray-400">Loading user info...</div>
    )}
  </div>
</div>
  );
}

export default UserRating