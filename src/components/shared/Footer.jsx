import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaShoppingBag,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 px-6 md:px-16 lg:px-24 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/next-logo.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="text-2xl font-bold text-yellow-400">GrabNGo</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Your trusted e-commerce platform to buy and sell products
            effortlessly. Manage listings, explore items, and enjoy a smooth
            digital shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-3">
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Order Tracking
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Return & Refund
            </li>
            <li className="hover:text-yellow-400 transition cursor-pointer">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <p className="mb-4 text-gray-400">
            Stay connected with our community:
          </p>
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-yellow-400 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-400 transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} GrabNGo. All rights reserved.
      </div>
    </footer>
  );
}
