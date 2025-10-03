import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

// Define the theme colors for consistency
const PRIMARY_GREEN = '#004d40'; // Deep Teal-Green (for text/accents)
const ACCENT_GREEN = '#10b981'; // A lighter green for link hover/subtle accents

function Footer() {
  return (
    // Outer container uses a very light gray background, text is dark gray
    <footer 
      className="bg-gray-50 text-gray-700 pt-10 pb-6 shadow-md border-t border-gray-200" 
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-200 pb-8">
          
          {/* 1. Brand / Contact Info */}
          <div className="col-span-2 lg:col-span-2">
            <h3 
              className="text-2xl font-extrabold mb-4"
              style={{ color: PRIMARY_GREEN }} // Brand name uses the deep green
            >
              Malabar Caterings
            </h3>
            <p className="text-sm text-gray-500 mb-4 max-w-xs">
              Your reliable partner for professional catering staff booking and management. Quality service guaranteed.
            </p>
            
            {/* Contact Details */}
            <div className="space-y-2 text-sm">
                <a href="mailto:support@cateringboys.com" className="flex items-center hover:text-gray-900 transition">
                    <FaEnvelope className="mr-2" style={{ color: PRIMARY_GREEN }} />
                    support@cateringboys.com
                </a>
                <a href="tel:+1234567890" className="flex items-center hover:text-gray-900 transition">
                    <FaPhone className="mr-2" style={{ color: PRIMARY_GREEN }} />
                    (123) 456-7890
                </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: PRIMARY_GREEN }}>Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-gray-900 transition">Home</a></li>
              <li><a href="/sitebook" className="hover:text-gray-900 transition">Book Now</a></li>
              <li><a href="/history" className="hover:text-gray-900 transition">History</a></li>
              <li><a href="/userrating" className="hover:text-gray-900 transition">Ratings</a></li>
            </ul>
          </div>

          {/* 3. Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: PRIMARY_GREEN }}>Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-gray-900 transition">About Us</a></li>
              <li><a href="/careers" className="hover:text-gray-900 transition">Careers</a></li>
              <li><a href="/terms" className="hover:text-gray-900 transition">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-gray-900 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 4. Social Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4" style={{ color: PRIMARY_GREEN }}>Connect</h4>
            <div className="flex space-x-4 md:flex-col md:space-x-0 md:space-y-3">
              <a href="#" className="flex items-center hover:text-gray-900 transition">
                <FaFacebook className="text-xl md:text-base mr-0 md:mr-2" style={{ color: ACCENT_GREEN }} />
                <span className="hidden md:inline">Facebook</span>
              </a>
              <a href="#" className="flex items-center hover:text-gray-900 transition">
                <FaTwitter className="text-xl md:text-base mr-0 md:mr-2" style={{ color: ACCENT_GREEN }} />
                <span className="hidden md:inline">Twitter</span>
              </a>
              <a href="#" className="flex items-center hover:text-gray-900 transition">
                <FaInstagram className="text-xl md:text-base mr-0 md:mr-2" style={{ color: ACCENT_GREEN }} />
                <span className="hidden md:inline">Instagram</span>
              </a>
              <a href="#" className="flex items-center hover:text-gray-900 transition">
                <FaLinkedin className="text-xl md:text-base mr-0 md:mr-2" style={{ color: ACCENT_GREEN }} />
                <span className="hidden md:inline">LinkedIn</span>
              </a>
            </div>
          </div>
          
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Catering Boys. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;