import React from 'react'
import AddBoy from './AddBoy'
import { useNavigate } from 'react-router-dom'
import AddSite from './AddSite'
import ViewSiteInfoAdmin from './ViewSiteInfoAdmin'
import { FaPlus, FaUsers, FaUserPlus, FaInfoCircle, FaHistory } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

function Home() {
    const navigation = useNavigate()

     const cardStyle = `
  bg-gray-800 
  rounded-full sm:rounded-2xl 
  p-6 
  flex flex-col items-center justify-center 
  shadow-lg 
  cursor-pointer 
  transition 
  hover:bg-gray-700 
  hover:scale-105 
  max-sm:h-[160px] 
  max-sm:w-[160px]
`;

   const iconStyle = "text-4xl mb-3 text-blue-400";

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-400">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div className={cardStyle} onClick={() => navigation("/addsite")}>
          <FaPlus className={iconStyle} />
          <h2 className="text-xl font-bold mb-2">Add Site</h2>
          <p className="text-gray-300 text-center max-sm:hidden">
            Add a new catering site to the system.
          </p>
        </div>

        
        <div className={cardStyle} onClick={() => navigation("/boysinfo")}>
          <FaUsers className={iconStyle} />
          <h2 className="text-xl font-bold mb-2 ">Boys Info</h2>
          <p className="text-gray-300 text-center max-sm:hidden">
            View all staff or delivery boys in the system.
          </p>
        </div>

        
        <div className={cardStyle} onClick={() => navigation("/addboys")}>
          <FaUserPlus className={iconStyle} />
          <h2 className="text-xl font-bold mb-2">Add Boy</h2>
          <p className="text-gray-300 text-center max-sm:hidden">
            Add new staff or delivery boys to the system.
          </p>
        </div>

       
        <div className={cardStyle} onClick={() => navigation("/AdmitSiteInfo")}>
          <FaInfoCircle className={iconStyle} />
          <h2 className="text-xl font-bold mb-2">Site Info</h2>
          <p className="text-gray-300 text-center max-sm:hidden">
            Check all the details of the existing sites.
          </p>
        </div>

        
        <div className={cardStyle} onClick={()=>navigation('/payment')}>
          <MdPayment className={iconStyle} />
          <h2 className="text-xl font-bold mb-2">payment</h2>
          <p className="text-gray-300 text-center max-sm:hidden">
            Check payment History
          </p>
        </div>

        
        <div className={cardStyle}>
          <FaHistory className={iconStyle} />
          <h2 className="text-xl font-bold mb-2">Site History</h2>
          <p className="text-gray-300 text-center max-sm:hidden">
            View all the booking history of the sites.
          </p>
        </div>
      </div>
    </div>
    )
}

export default Home