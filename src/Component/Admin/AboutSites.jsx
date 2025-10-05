import React, { useEffect, useState } from 'react'
import NavBarAdmin from './NavBarAdmin'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { compile } from 'tailwindcss'

function AboutSites() {
    const location = useLocation()
    const { site } = location.state
    const [user, setUser] = useState([])
    const navigation = useNavigate()

    // console.log(site);

    const boysInfo = async () => {
        try {
            // const users=await axios.get("http://localhost:5000/users")
            const bookings = await axios.get("https://json-server-c825.onrender.com/bookings")
            const siteInfo = bookings.data
            const boys = siteInfo.filter((info) => Number(info.siteId) === Number(site.id) &&
                (info.status === "pending" || info.status === "complited"))
            // console.log(boys);
            setUser(boys)

        } catch (err) {
            console.error(err);

        }
    }

    const Remove = async (boy) => {
        const update = { ...boy, "status": "canceld" }

        // console.log(update);

        try {



            await axios.put(`https://json-server-c825.onrender.com/bookings/${boy.id}`, update)
            boysInfo()
            alert("removed ")
        } catch (error) {
            console.error(error);
        }


        try {

            let siteUpdate;

            if (site.seats > 0) {
                siteUpdate = { ...site, seats: site.seats + 1 };
            } else {
                siteUpdate = { ...site, seats: site.seats + 1, available: true };
            }

            console.log(siteUpdate);

            await axios.put(`https://json-server-c825.onrender.com/sites/${site.id}`, siteUpdate);

        } catch (error) {
            console.error("Error fetching sites:", error);
        }

    }

    useEffect(() => {
        boysInfo()
    }, [])




    const Delet = async (id) => {
        //    console.log(id);

        try {

            await axios.delete(`https://json-server-c825.onrender.com/sites/${id}`);

            const res = await axios.get(`https://json-server-c825.onrender.com/bookings?siteId=${id}`)
            const bookings = res.data
            console.log(bookings);


            await bookings.map((books) => (
                axios.put(`https://json-server-c825.onrender.com/bookings/${books.id}`, { ...books, "status": "canceld" })
            ))


            navigation("/AdmitSiteInfo")
            alert("Site deleted & all related bookings canceled ");
        } catch (err) {
            console.error(err);

        }
    }

    const Complite = async (site) => {
        console.log(site);

        const siteInfo = {
            "site_id": site.id,
            "Site_Name": site.name,
            "Location": site.location,
            "Price": site.price,
            "Date": site.date,
            "Paiment": "pendding"
        }

        await axios.post("https://json-server-c825.onrender.com/complited_works", siteInfo)

        try {

            await axios.put(`https://json-server-c825.onrender.com/sites/${site.id}`, {
                ...site,
                compile: true
            });

            const res = await axios.get(`https://json-server-c825.onrender.com/bookings?siteId=${site.id}`)
            const bookings = res.data
            console.log(bookings);

            const PendingBookins = bookings.filter((a) => a.status == "pending")



            await PendingBookins.map((books) => (
                axios.put(`https://json-server-c825.onrender.com/bookings/${books.id}`, { ...books, "status": "completed" })
            ))

        } catch (err) {
            console.error(err);

        }

        navigation("/AdmitSiteInfo")
        alert("It is added to payment section");



        // console.log(siteInfo);

    }


    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <div><NavBarAdmin /></div>

            <div className="p-6 flex max-sm:flex-col items-center gap-10 sm:pl-50 ">

                <div className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-4">

                    <h1 className="text-3xl font-bold text-blue-400 text-center mb-4">About Site</h1>


                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between"><span className="font-semibold">Site Name:</span><span>{site.name}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Location:</span><span>{site.location}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Price:</span><span>{site.price}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Date:</span><span>{site.date}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Reporting Time:</span><span>{site.reporting_time}</span></div>
                        <div className="flex justify-between"><span className="font-semibold">Available Seats:</span><span>{site.seats}</span></div>
                    </div>


                    <div className="flex flex-col gap-4 mt-6">

                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-300 text-center">Click here if the site needs to be deleted</span>
                            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                                onClick={() => Delet(site.id)}
                            >
                                Site Delete
                            </button>
                        </div>


                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-300 text-center">Click here when the work is completed</span>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition "
                                onClick={() => Complite(site)}
                            >
                                Work Completed
                            </button>
                        </div>
                    </div>
                </div>


                <div className="w-full max-w-lg h-130 bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">About Site Boys</h2>


                    <div className="flex flex-col gap-4  overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700">
                        {user.length > 0 ? (
                            user.map((boy, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                                >
                                    {/* Boy Info */}
                                    <div className="flex flex-col gap-1">
                                        <span><span className="font-semibold">Name:</span> {boy.name}</span>
                                        <span><span className="font-semibold">ID:</span> {boy.userId}</span>
                                        <span><span className="font-semibold">Phone:</span> {boy.phoneNumber}</span>
                                        <span><span className="font-semibold">Role:</span> {boy.role}</span>
                                        <span><span className="font-semibold flex">Rating:
                                            <div className='flex pl-2 '>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        className={`text-2l transition-colors ${boy.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>

                                        </span>
                                        </span>
                                    </div>

                                    {/* Remove Button */}
                                    <div>
                                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg font-semibold transition"
                                            onClick={() => Remove(boy)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300 text-center">No boys assigned to this site.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default AboutSites

