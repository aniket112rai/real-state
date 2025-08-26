import React from "react";

const properties = [
  {
    id: 1,
    title: "3BHK Flat",
    location: "New Delhi",
    price: "₹ 10,000",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Luxury Villa",
    location: "Mumbai",
    price: "₹ 25,000",
    image:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "2BHK Apartment",
    location: "Bangalore",
    price: "₹ 15,000",
    image:
      "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const Random = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="relative w-full rounded-2xl overflow-hidden shadow-lg group"
        >
          {/* Property Image */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Top Elements */}
          <div className="absolute top-3 left-3 bg-white/80 text-gray-900 font-semibold px-3 py-1 rounded-lg text-sm">
            {property.price}
          </div>
          <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-red-200 transition">
            ❤️
          </button>

          {/* Bottom Content */}
          <div className="absolute bottom-3 left-3 text-white">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <p className="flex items-center gap-1 text-sm text-gray-200">
              📍 {property.location}
            </p>
            <button className="mt-2 bg-blue-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
              View More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Random;
