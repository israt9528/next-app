import { FaTags, FaStar, FaShieldAlt } from "react-icons/fa";
import Image from "next/image";

export default function FeaturedSection() {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-12 lg:px-20 mt-10 rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Why Choose <span className="text-indigo-600">GrabNGo</span>?
          </h2>

          <p className="text-gray-600 text-lg md:text-xl">
            We provide a smooth, fast, and secure marketplace where you can buy
            and sell products without any hassle. Manage your listings, explore
            high‑quality products, and enjoy a seamless shopping experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow">
              <FaTags className="text-3xl text-indigo-600" />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  Best Deals
                </h4>
                <p className="text-gray-500 text-sm">
                  Find top products at unbeatable prices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow">
              <FaStar className="text-3xl text-yellow-500" />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  Top Ratings
                </h4>
                <p className="text-gray-500 text-sm">
                  Trusted by thousands of happy buyers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow">
              <FaShieldAlt className="text-3xl text-green-600" />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  Secure System
                </h4>
                <p className="text-gray-500 text-sm">
                  Your data & payments are always protected.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow">
              <FaTags className="text-3xl text-pink-500" />
              <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  Easy Management
                </h4>
                <p className="text-gray-500 text-sm">
                  Add, edit, and track your listings instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full flex justify-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <Image
              src="/feature.jpeg" // Replace with your own
              alt="Featured Section"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
