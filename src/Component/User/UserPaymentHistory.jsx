import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../Contaxt/Context'

function UserPaymentHistory() {
    const [sites, setSites] = useState([])
    const { user } = useContext(userContext)




    const site = async () => {
        try {
            const arr = await axios.get("https://json-server-c825.onrender.com/complited_works")
            console.log(arr.data);


            const my_work = await axios.get('https://json-server-c825.onrender.com/bookings')
            const data = my_work.data
            const filterData = data.filter((a) => a.userId == user.id)

            const compliteData = filterData.filter((a) => a.status == "completed")
            console.log(compliteData);

            const paymentHistory = arr.data.filter((a) =>
                compliteData.some((c) => a.site_id === c.siteId)
            );
            setSites(paymentHistory);
            console.log(paymentHistory);


        } catch (err) {
            console.error(err);

        }
    }

    useEffect(() => {
        if (user) {
            site()
        }
    }, [user])
    // console.log(sites);


    const PRIMARY_GREEN = '#004d40';
    const ACCENT_YELLOW = '#ffc107';

    return (
        <div className='min-h-screen pt-8'
        style={{ backgroundColor: PRIMARY_GREEN }}
        >
            <div
            className="pt-25 flex flex-wrap justify-center gap-6 text-white p-6 "
            
        >
            {sites.map((site, index) => (
                <div
                    key={index}
                    className="bg-white text-gray-800 rounded-2xl shadow-xl w-80 p-6 h-[250px]
                           border-2 border-transparent hover:border-green-400 hover:scale-[1.02] transition-transform duration-300"
                >
                    <h2
                        className="text-2xl font-bold mb-4 text-center"
                        style={{ color: PRIMARY_GREEN }}
                    >
                        {site.Site_Name}
                    </h2>

                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 mb-2">
                        <span style={{ color: ACCENT_YELLOW }}>📍</span>
                        <span className="font-medium">{site.Location}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 mb-2">
                        <span className="text-green-500">📅</span>
                        <span>{site.Date}</span>
                    </div>

                    <div className={`flex items-center gap-2 rounded-lg p-2 font-semibold text-white justify-center
                    ${site.Paiment === "pendding"
                            ? "bg-red-600"
                            : "bg-green-600" 
                        }`}
                    >
                        <span>{site.Paiment === "pendding" ? "❌" : "✅"}</span>
                        <span>{site.Paiment}</span>
                    </div>
                </div>
            ))}
        </div>
        </div>

    )
}


export default UserPaymentHistory