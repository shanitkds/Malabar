import axios from 'axios'
import React, { useState } from 'react'

function AddSite() {
    const [siteName, setSiteName] = useState('')
    const [location, setlocation] = useState('')
    const [wage, setWage] = useState('')
    const [seats, setSeats] = useState('')
    const [date, setDate] = useState('')
    const [reTime, setReTime] = useState('')

    const genarateId = async () => {
        let id;
        let existing = true

        while (existing) {
            id = Math.floor(1000 + Math.random() * 9000);
            const res = await axios.get(`http://localhost:5000/sites?id=${id}`)
            existing = res.data.length > 0;
        }

        return id;
    }

    const AddSite = async (e) => {
        e.preventDefault();
        const id = await genarateId()

        const Register = {
            "id": id,
            "name": siteName,
            "location": location,
            'price': wage,
            "available": true,
            "seats": Number(seats),
            "date": date,
            "reporting_time": reTime,
            "compile": false
        }

        try {
            await axios.post("http://localhost:5000/sites", Register)
            alert("Site Registrotion complited")
        } catch (err) {
            console.error(err);
        }

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const notification = {
            message: `New site added: ${Register.name} at ${Register.location} on ${Register.date}`,
            date: formattedDate
        }

        try {
            await axios.post("http://localhost:5000/notification", notification)
        } catch (err) {
            console.log(err);

        }



        setSiteName('')
        setlocation('')
        setWage('')
        setSeats('')
        setDate('')
        setReTime('')



    }

    return (
        <div className='sm:py-12'>
            <div className="max-sm:pt-20 max-sm:h-screen sm:max-w-lg mx-auto sm:mt-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 sm:rounded-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Add New Site</h2>

                <form className="space-y-4">

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1" htmlFor="name">Site Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter site name"
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="block text-gray-300 font-semibold mb-1" htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            placeholder="Enter location"
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={location}
                            onChange={(e) => setlocation(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold mb-1" htmlFor="seats">Wage</label>
                        <input
                            type="number"
                            id="seats"
                            placeholder="Enter the wage"
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={wage}
                            onChange={(e) => setWage(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="block text-gray-300 font-semibold mb-1" htmlFor="seats">Seats</label>
                        <input
                            type="number"
                            id="seats"
                            placeholder="Enter total seats"
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="block text-gray-300 font-semibold mb-1" htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>


                    <div>
                        <label className="block text-gray-300 font-semibold mb-1" htmlFor="time">Reporting Time</label>
                        <input
                            type="time"
                            id="time"
                            className="w-full border border-gray-600 bg-gray-800 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={reTime}
                            onChange={(e) => setReTime(e.target.value)}
                        />
                    </div>


                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md transition-colors"
                            onClick={AddSite}
                        >
                            Add Site
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AddSite