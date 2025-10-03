
import React, { useContext } from 'react'
import { userContext } from '../Contaxt/Context'


function Notification() {
    const { setTudo} = useContext(userContext)
    const { notficationList } = useContext(userContext)

    const PRIMARY_GREEN = '#004d40'; 
    const ACCENT_YELLOW = '#ffc107'; 
    return (
        <div
            
            className="min-h-screen w-full flex items-center justify-center p-4 pt-22"
            style={{ backgroundColor: PRIMARY_GREEN }}
            onClick={() => setTudo(false)}
        >
           
            <div className="w-full max-w-4xl mx-auto bg-white text-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
                <h2
                    
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center"
                    style={{ color: ACCENT_YELLOW }}
                >
                    Notifications
                </h2>

                <ul className="space-y-4 sm:space-y-5 md:space-y-6">
                   
                    {notficationList.map((n) => (
                        <li
                            key={n.id}
                            
                            className="p-4 sm:p-5 md:p-6 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition duration-300 shadow-md"
                        >
                           
                            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-800">{n.message}</p>
                           
                            <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">{n.date}</p>
                        </li>
                    ))}
                </ul>

                
                {notficationList.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">You have no new notifications.</p>
                )}

            </div>
        </div>

    )
}

export default Notification