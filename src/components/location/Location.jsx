import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function LocationSection() {
  const locations = [
    {
      id: 1,
      name: "Dhaka Outlet",
      address: "123 Gulshan Ave, Dhaka, Bangladesh",
      phone: "+880 123 456 789",
      email: "dhaka@grabngo.com",
      image: "/location1.jpeg",
    },
    {
      id: 2,
      name: "Chittagong Outlet",
      address: "456 Agrabad Rd, Chittagong, Bangladesh",
      phone: "+880 987 654 321",
      email: "chittagong@grabngo.com",
      image: "/location2.jpeg",
    },
    {
      id: 3,
      name: "Sylhet Outlet",
      address: "789 Zindabazar St, Sylhet, Bangladesh",
      phone: "+880 321 654 987",
      email: "sylhet@grabngo.com",
      image: "/location2.jpeg",
    },
  ];

  return (
    <section className="w-full font-serif bg-gray-50 py-16 px-6 md:px-12 lg:px-20 mt-12 rounded-2xl shadow-lg">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
        Our <span className="text-indigo-600">Outlet Locations</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden"
          >
            <div className="relative w-full h-56">
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {loc.name}
              </h3>
              <p className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <FaMapMarkerAlt /> {loc.address}
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                <FaPhoneAlt /> {loc.phone}
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <FaEnvelope /> {loc.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
