import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegIdBadge } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { CiMobile1 } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";


function BoysInfo() {
  const [user, setUser] = useState([])
  const [serchId, setSearchId] = useState('')
  const navigation = useNavigate()

  const boysinfo = async () => {
    try {
      const res = await axios.get("https://json-server-c825.onrender.com/users");
      const filterData = res.data.filter((u) => u.role == "user" || u.role == "capten");
      setUser(filterData)
      console.log(filterData);

    } catch (err) {
      console.error(err);

    }
  }

  const newData = user.filter(
    (u) =>
      String(u.id).includes(serchId) ||
      u.name.toLowerCase().includes(serchId.toLowerCase())
  );


  useEffect(() => {
    boysinfo()
  }, [])

  const handilRating = async (info, star) => {
    const ratingUpdate = { ...info, "rating": star }
    //  console.log(ratingUpdate);
    await axios.put(`https://json-server-c825.onrender.com/users/${Number(info.id)}`, ratingUpdate)
    boysinfo()
  }

  const Delete = async (id) => {
    try {
      await axios.delete(`https://json-server-c825.onrender.com/users/${id}`);
      alert("User deleted successfully!")
      boysinfo()
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter The ID"
          className="w-full sm:w-150 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={serchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {newData.map((info) => (
          <div
            key={info.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="text-xl font-semibold text-gray-800 mb-2">
              {info.name}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaRegIdBadge /> {info.id}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <AiTwotoneMail /> {info.email}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CiMobile1 /> {info.mobile}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MdLocationOn />{info.place}
            </div>
            <div className="text-gray-700 font-medium">Role: {info.role}</div>

            {/* ⭐ Rating Section */}
            <div className="mt-4 flex">
              <div className="text-[20px] font-medium text-gray-700">Set Rating : </div>
              <div className='flex pl-2 '>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handilRating(info, star)}
                    className={`text-2xl transition-colors ${info.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => navigation(`/edit/${info.id}`, { state: { user: info } })}
              >
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => Delete(info.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoysInfo