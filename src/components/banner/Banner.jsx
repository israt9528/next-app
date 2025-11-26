import Image from "next/image";

export default function Banner() {
  return (
    <section className="w-full bg-[url('/banner.jpeg')] bg-cover bg-center bg-no-repeat text-white py-16 px-6 md:px-12 lg:px-20 rounded-2xl shadow-2xl backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="space-y-6 bg-black/30 rounded-lg p-5">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Welcome to <span className="text-yellow-300">GrabNGo</span>
          </h1>

          <p className="text-lg md:text-xl opacity-90">
            Your all-in-one e-commerce platform where users can{" "}
            <span className="font-semibold">add products</span>, manage
            listings, and explore a wide range of items to{" "}
            <span className="font-semibold">buy instantly</span>.
          </p>

          <ul className="space-y-3 text-base md:text-lg">
            <li className="flex items-center gap-3">
              <span className="bg-white text-indigo-600 p-2 rounded-full shadow-lg">
                📦
              </span>
              Add and manage your products with ease
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white text-indigo-600 p-2 rounded-full shadow-lg">
                🛒
              </span>
              Browse thousands of products from sellers
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white text-indigo-600 p-2 rounded-full shadow-lg">
                ⚡
              </span>
              Fast, secure & smooth shopping experience
            </li>
          </ul>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-6 py-3 bg-yellow-300 text-indigo-900 font-semibold rounded-xl shadow-lg hover:bg-yellow-400 transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition">
              Explore Products
            </button>
          </div>
        </div>

        {/* Right Image (Next/Image) */}
        {/* <div className="relative w-full flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 flex items-center justify-center shadow-xl overflow-hidden">
            <Image
              src="/banner.jpeg"
              alt="Banner"
              fill
              className="object-cover rounded-3xl"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
