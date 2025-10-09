import React, { useContext } from 'react';
import { SiWhatsapp } from "react-icons/si";
import NaveBar from './NaveBar';
import { userContext } from '../Contaxt/Context';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";



const About = () => {
    // Replace this number with your Catering Boys WhatsApp number in international format without "+"
    const whatsappNumber = "918129652688"; // Example: 91 for India + mobile number
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    const { setTudo } = useContext(userContext)

    const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

    return (
        <div>
      <NaveBar />

      <div
        className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-22"
        onClick={() => setTudo(false)}
      >
        <div className="max-w-7xl mx-auto">

          <motion.div
            className="text-center mb-12 sm:mb-16"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/sympel.png"
                alt="Royal Malabar Catering Icon"
                className="h-15 w-15 sm:h-16 sm:w-16"
              />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#004d40] tracking-tight">
              About Royal Malabar Catering
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
              Where Culinary Heritage Meets Exquisite Service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              className="order-1 lg:order-2 relative"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <motion.img
                  src="/About.png"
                  alt="A beautifully set table by Royal Malabar Catering"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link
                  to={whatsappLink}
                  className="absolute -bottom-6 -right-1 p-4 bg-green-500 text-white rounded-full shadow-xl hover:scale-110 transition flex items-center justify-center"
                >
                  <SiWhatsapp className="w-8 h-8" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-base sm:text-lg text-gray-700"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.p
                className="p-4 sm:p-6 bg-white rounded-xl shadow-lg border-t-4 border-teal-600 hover:shadow-xl transition"
                whileHover={{ scale: 1.02 }}
              >
                Catering Boys is your trusted partner for professional catering services. We provide highly skilled staff to ensure every event runs smoothly, from weddings and parties to corporate events.
              </motion.p>

              <motion.p
                className="p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition"
                whileHover={{ scale: 1.02 }}
              >
                Our team of catering professionals is trained to handle everything from food preparation to service, so you can enjoy your event without any stress. We prioritize hygiene, reliability, and customer satisfaction.
              </motion.p>

              <motion.p
                className="p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition"
                whileHover={{ scale: 1.02 }}
              >
                Whether it’s a large celebration or an intimate gathering, Catering Boys delivers customized solutions to match your needs. Count on us for exceptional service, on-time execution, and a memorable experience for you and your guests.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
    );
};

export default About;
