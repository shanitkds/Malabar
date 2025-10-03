import React, { useContext } from 'react'
import { userContext } from '../Contaxt/Context'
import { useNavigate, NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";

function NavBarAdmin() {
    const { user, setUser } = useContext(userContext)
    const navigation = useNavigate()
    const { tudo, setTudo } = useContext(userContext)
    // console.log(user);
    const logOut = () => {
        setUser("")
        navigation("/")

    }

    return (
        <div>
            <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">

                    {/* <!-- Logo --> */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="text-2xl font-bold text-blue-500">Ecomars</div>
                    </div>

                    {/* <!-- Navigation Links --> */}
                    <ul className="flex gap-6 max-sm:hidden">
                        <li className="hover:text-blue-400 cursor-pointer">
                            <NavLink to="/admin">Home</NavLink>
                        </li>
                        <li className="hover:text-blue-400 cursor-pointer">
                            <NavLink to="/admin">Profile</NavLink>
                        </li>
                        <li className="hover:text-blue-400 cursor-pointer">
                            <NavLink to="/admin">Boys Info</NavLink>
                        </li>
                    </ul>

                    {/* <!-- User Section --> */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                {user ? user.name.charAt(0).toUpperCase() : "?"}
                            </div>
                            <div className="font-semibold">{user ? user.name : "No User"}</div>
                        </div>

                        {/* <!-- Logout Button --> */}
                        <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-semibold shadow-md transition"
                            onClick={logOut}
                        >
                            Logout
                        </button>
                    </div>

                    <div className="sm:hidden mt-3 flex justify-end">
                        <CiMenuBurger
                            size={28}
                            className="cursor-pointer text-white"
                            onClick={() => setTudo(!tudo)}
                        />
                    </div>

                </div>
                {tudo && (
                    <div className="absolute top-16 right-2 w-56 bg-gradient-to-br from-gray-900 to-black border border-gray-700 text-white rounded-xl shadow-xl overflow-hidden animate-slideDown">
                        <ul className="flex flex-col divide-y divide-gray-700">
                            <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer" onClick={() => { navigation("/home"), setTudo(false) }}>Home</li>
                            <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer">About Us</li>
                            <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer">Contact Us</li>
                            <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer">Profile</li>
                            <li className="px-4 py-3 hover:bg-gray-800 cursor-pointer">Notifications</li>
                        </ul>
                    </div>
                )}
            </nav>

        </div>
    )
}

export default NavBarAdmin