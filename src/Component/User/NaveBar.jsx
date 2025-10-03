import React, { useContext } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../Contaxt/Context';

function NaveBar() {
  const navigate = useNavigate();
  const { user, setUser, tudo, setTudo } = useContext(userContext);

  const handilLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('latestNotificationId');
    navigate("/");
  }

  return (
    <div className="w-full bg-white text-gray-800 p-4 shadow-md fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        
       
        <div
          className="cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/home")}
        >
          <img src="/icon.png" alt="Logo" className="w-20 h-10" />
        </div>

        {/* Desktop Menu */}
        <div className="max-sm:hidden">
          <ul className="flex gap-6 font-medium">
            <li className="hover:text-[#004d40] cursor-pointer transition" onClick={() => navigate("/home")}>Home</li>
            <li className="hover:text-[#004d40] cursor-pointer transition" onClick={()=>navigate('/about')}>About Us</li>
            {/* <li className="hover:text-[#004d40] cursor-pointer transition">Contact Us</li> */}
            <li className="hover:text-[#004d40] cursor-pointer transition">Profile</li>
            <li className="hover:text-[#004d40] cursor-pointer transition" onClick={() => navigate("/notificationuser")}>Notifications</li>
          </ul>
        </div>

        
        <div className="flex items-center gap-4 pr-5">
          
          <div
            className="max-sm:hidden bg-[#004d40] hover:bg-green-900 text-white px-4 py-1 rounded-lg cursor-pointer transition"
            onClick={handilLogout}
          >
            Logout
          </div>

         
          <div className="flex items-center gap-2 max-sm:pl-30">
            <div className="w-10 h-10 bg-[#004d40] text-white rounded-full flex items-center justify-center font-bold">
              {user ? user.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="font-semibold text-gray-700">
              <div>{user ? user.name : ""}</div>
              <div className="text-sm">{user ? user.id : ""}</div>
            </div>
          </div>
        </div>

       
        <div className="sm:hidden flex items-center">
          <CiMenuBurger
            size={28}
            className="cursor-pointer text-gray-800"
            onClick={() => setTudo(!tudo)}
          />
        </div>
      </div>

      
      {tudo && (
        <div className="absolute top-16 right-2 w-56 bg-white border border-gray-300 text-gray-800 rounded-xl shadow-lg overflow-hidden animate-slideDown">
          <ul className="flex flex-col divide-y divide-gray-200">
            <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate("/home"); setTudo(false); }}>Home</li>
            <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer" onClick={()=>{navigate('/about');setTudo(false);}}>About Us</li>
            {/* <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Contact Us</li> */}
            <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer" onClick={() => {navigate("/notificationuser"); setTudo(false);}}>Notifications</li>
            <li className="px-4 py-3 hover:bg-gray-100 cursor-pointer" onClick={() => { handilLogout(); setTudo(false); }}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NaveBar;
