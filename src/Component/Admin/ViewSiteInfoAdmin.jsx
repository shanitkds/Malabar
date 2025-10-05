import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaClock, FaInfoCircle } from "react-icons/fa";
import NavBarAdmin from './NavBarAdmin';
import { useNavigate } from 'react-router-dom';


function ViewSiteInfoAdmin() {
    const [sites, setSits] = useState([])
    const navigation=useNavigate()

    const siteInfo = async () => {
        const info = await axios.get("https://json-server-c825.onrender.com/sites")
        const visiblesite=info.data.filter((info)=>info.compile!== true)
        setSits(visiblesite)
    }

    // console.log(sites);

    const About=(info)=>{
      navigation(`/aboutsites/${info.id}`,{ state: { site: info } })
        
    }


    useEffect(() => {
        siteInfo()
    }, [])
    return (
        <div>
            <NavBarAdmin/>
            <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                All Sites Information
            </h1>

          
            <div className="flex items-center justify-center flex-wrap gap-8">
                {sites.map((a, index) => (
                    <div
                        key={index}
                        className="relative w-[350px] max-sm:w-80 p-6 rounded-2xl 
              bg-gradient-to-br from-gray-800 via-gray-900 to-black 
              text-white shadow-lg border border-gray-700
              transform hover:scale-105 hover:shadow-2xl transition duration-300"
                    >
                        
                        <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
                            {a.name}
                        </h2>

                        
                        <div className="bg-gray-700/40 p-2 rounded-lg mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-400" />
                            <span className="font-medium">{a.location}</span>
                        </div>

                      
                        <div className="bg-gray-700/40 p-2 rounded-lg mb-3 flex items-center gap-2">
                            <FaRupeeSign className="text-green-400" />
                            <span className="font-semibold text-green-400">{a.price}</span>
                        </div>

                      
                        <div className="bg-gray-700/40 p-2 rounded-lg mb-3 flex items-center gap-2">
                            <FaCalendarAlt className="text-yellow-400" />
                            <span className="text-blue-300">{a.date}</span>
                        </div>

                       
                        <div className="bg-gray-700/40 p-2 rounded-lg mb-4 flex items-center gap-2">
                            <FaClock className="text-purple-400" />
                            <span className="text-blue-300">{a.reporting_time}</span>
                        </div>

                     
                        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
                         onClick={()=>About(a)}
                        >
                            <FaInfoCircle /> About
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default ViewSiteInfoAdmin