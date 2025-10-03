import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { compile } from 'tailwindcss'


function History() {
    const [histors, setHistors] = useState([])

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'))
        const id = userInfo.id
        console.log(id);
        const userHistory = async () => {
            try {
                const hist = await axios.get(`http://localhost:5000/bookings?userId=${id}`)
                console.log(hist.data);
                setHistors(hist.data)


            } catch (error) {

                console.error(error);

            }
        }

        userHistory()
    }, [])

    const PRIMARY_GREEN = '#004d40'; 
    const ACCENT_YELLOW = '#ffc107';
    return (
        <div
            className="min-h-screen pt-25 text-white p-6"
            style={{ backgroundColor: PRIMARY_GREEN }}
        >
            <h1
                className="text-3xl font-bold text-center mb-10"
                style={{ color: ACCENT_YELLOW }}
            >
                My History
            </h1>

            <div className="grid gap-6 max-w-3xl mx-auto">
                {histors.map((a, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-2xl bg-white text-gray-800 shadow-xl border-2 border-transparent 
                               hover:border-green-400 hover:scale-[1.02] transition duration-300 cursor-pointer"
                    >
                        <h2
                            className="text-xl font-bold mb-2"
                            style={{ color: PRIMARY_GREEN }}
                        >
                            📍 {a.location}
                        </h2>

                        <p className="text-gray-600 mb-4">📅 {a.date}</p>


                        <div
                            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md
                        ${a.status === "pending"
                                    ? "bg-yellow-500 text-black" 
                                    : a.status === "completed"
                                        ? "bg-green-600 text-white" 
                                        : "bg-red-600 text-white" 
                                }`}
                        >
                            {a.status}
                        </div>
                    </div>
                ))}
            </div>

            {histors.length === 0 && (
                <p className="text-center text-white opacity-70 mt-12">No booking history found.</p>
            )}
        </div>

    )
}

export default History