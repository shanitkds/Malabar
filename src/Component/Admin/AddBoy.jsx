import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AddBoy() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [place, setPlace] = useState('')
    const [role,setRole]=useState('')

    const genarateId = async () => {
        let id;
        let existing = true

        while (existing) {
            id = Math.floor(1000 + Math.random() * 9000);
            const res = await axios.get(`http://localhost:5000/users?id=${id}`)
            existing = res.data.length > 0;
        }

        return id;
    }

    const boysSubmit = async (e) => {
        e.preventDefault();
        const id = await genarateId()

        const Register = {
            "id": Number(id),
            "name": name,
            "email": email,
            "password": password,
            "mobile": number,
            "place": place,
            "role":role
        }

        try {
            await axios.post("http://localhost:5000/users", Register)
            alert("Registrotion complited")
        } catch (err) {
            console.error(err);
        }

        setName("")
        setEmail("")
        setPassword("")
        setNumber('')
        setPlace("")
        setRole("")

    }


    return (
       <div className=" h-screen w-full sm:max-w-md sm:mx-auto bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 sm:rounded-2xl shadow-2xl  sm:my-10">
  <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6 max-sm:pt-10">Add New User</h2>

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
    <div className="text-center">
      <button
        type="submit"
        onClick={boysSubmit}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-lg transition-colors duration-200 w-full"
      >
        Submit
      </button>
    </div>

  </form>
</div>

    )
}

export default AddBoy