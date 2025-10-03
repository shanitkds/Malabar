import React, { useState } from 'react'
import NavBarAdmin from './NavBarAdmin'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Edit() {
    const location = useLocation()
  
    console.log(location);
    const { user } = location.state
    // console.log(user);
    
    const navigate = useNavigate()

    const [id, setId] = useState(user.id)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [number, setNumber] = useState(user.mobile)
    const [place, setPlace] = useState(user.place)
    const [role, setRole] = useState(user.role)

    const Save =async(e) => {
        e.preventDefault();

        const newData = {
            "name": name,
            "email": email,
            "password": password,
            "mobile": number,
            "place": place,
            "role": role
        }

        try{
            await axios.put(`http://localhost:5000/users/${Number(id)}`,newData)
            alert("edit complited sussesfuly")
        }catch(err){
            console.error(err);
            
        }



    }
    // console.log(user);
    return (
        <div>
            <NavBarAdmin />
            <div>
                <div className=" h-screen w-full sm:max-w-md sm:mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 sm:rounded-2xl shadow-2xl  sm:my-10">
                    <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6 max-sm:pt-10">Edit The User</h2>

                    <form className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1" htmlFor="password">Create Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1" htmlFor="number">Mobile Number</label>
                            <input
                                type="number"
                                id="number"
                                placeholder="Enter Number"
                                className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>

                        {/* Place */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1" htmlFor="place">Place</label>
                            <input
                                type="text"
                                id="place"
                                placeholder="Enter Place"
                                className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-1">Select Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full border border-gray-700 bg-gray-800 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="">-- Role --</option>
                                <option value="user">User</option>
                                <option value="capten">Capten</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center flex gap-5">
                            <button
                                type="submit"
                                // onClick={boysSubmit}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-lg transition-colors duration-200 w-full"
                                onClick={Save}
                            >
                                Save
                            </button>
                            <button
                                type="submit"
                                onClick={() => (navigate("/boysinfo"))}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-lg transition-colors duration-200 w-full"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit