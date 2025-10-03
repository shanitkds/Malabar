import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "./Contaxt/Context";

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useContext(userContext)

  const handilLogin = async (e) => {
    e.preventDefault();
    setError("")

    try {
      const res = await axios.get("http://localhost:5000/users")
      const users = res.data

      const user = users.find((u) => u.email == email && u.password == password)

      if (user) {

        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)

        if (user.role == "user") {
          alert("Welcome " + user.name)
          navigate('/home')

        } else {
          alert('Welcom Admin ' + user.name)
          navigate("/admin")
        }

      } else {
        setError("Invalid email or password")
      }

    } catch (error) {
      console.log(email);

    }

  }
  const PRIMARY_GREEN = '#004d40';
  const ACCENT_YELLOW = '#ffc107'
  const whatsappNumber = "918129652688";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: PRIMARY_GREEN }}
    >

      <div
        className="w-full max-w-md max-sm:w-80 bg-white text-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200"
      >

        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
            style={{ backgroundColor: PRIMARY_GREEN }}
          >
            MC-
          </div>
          <h1 className="mt-4 text-3xl font-bold" style={{ color: PRIMARY_GREEN }}>Malabar Caterings</h1>
          <p className="text-gray-500 text-sm">
            Login to book & manage your events
          </p>
        </div>


        <form className="space-y-5">

          {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white font-semibold py-2 rounded-lg shadow-lg hover:opacity-90 transition transform hover:scale-[1.01]"
            style={{ backgroundColor: PRIMARY_GREEN }}
            onClick={handilLogin}
          >
            Sign In
          </button>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer font-medium"
              style={{ color: ACCENT_YELLOW }}
            >
              Contact
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
