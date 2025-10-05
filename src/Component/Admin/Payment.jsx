import React, { useEffect, useState } from 'react'
import NavBarAdmin from './NavBarAdmin'
import axios from 'axios'


function Payment() {
const [site,setSite]=useState([])

 const sites=async()=>{
    const  info= await axios.get("https://json-server-c825.onrender.com/complited_works")
    const data=info.data
    console.log(data);
    setSite(data)
    
 }

 useEffect(()=>{
  sites()
 },[])

const handlePayment=async(info)=>{
  console.log(info);

  try{
    const updateSite={...info,Paiment:"paid"}
    await axios.put(`https://json-server-c825.onrender.com/complited_works/${info.id}`,updateSite)
    sites()
  }catch(err){
    console.error(err);
    
  }
  
}

  return (
    <div>
        <NavBarAdmin/>
        <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Payment Checking</h1>
      <div className="grid gap-4">
        {site.map((info) => (
          <div
            key={info.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            <p><strong>Site Name:</strong> {info.Site_Name}</p>
            <p><strong>Location:</strong> {info.Location}</p>
            <p><strong>Price:</strong> ₹{info.Price}</p>
            <p><strong>Date:</strong> {info.Date}</p>

            <div className="mt-3">
              {info.Paiment === "pendding" ? (
                <button
                  onClick={() => handlePayment(info)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Click here if paid
                </button>
              ) : (
                <button className="px-4 py-2 bg-green-500 text-white rounded cursor-default">
                  Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Payment