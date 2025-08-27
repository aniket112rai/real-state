import React from "react";

const Random = () => {
  // dummy frontend-only data
  const propertyData = {
    id: 1,
    title: "Luxury Villa with Pool",
    description:
      "A stunning 4BHK villa featuring modern architecture, a private pool, and landscaped garden. Located in a peaceful neighborhood, perfect for family living.",
    price: 8500000,
    location: "Bangalore, India",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    owner: {
      name: "John Doe",
      email: "john@example.com",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Hero Image */}
        <div className="relative h-[400px]">
          <img
            src={propertyData.imageUrl}
            alt={propertyData.title}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 rounded-xl">
            <h1 className="text-3xl font-bold text-white">
              {propertyData.title}
            </h1>
            <p className="text-lg text-gray-200">📍 {propertyData.location}</p>
            <p className="text-2xl font-semibold text-green-400 mt-2">
              ₹{propertyData.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left (Details) */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-3">Property Details</h2>
            <p className="text-gray-700 leading-relaxed">
              {propertyData.description}
            </p>

            <div className="mt-6">
              <h3 className="font-semibold text-lg">Additional Info:</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>ID: {propertyData.id}</li>
                <li>Location: {propertyData.location}</li>
                <li>Price: ₹{propertyData.price.toLocaleString()}</li>
              </ul>
            </div>
          </div>

          {/* Right (Owner Info) */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-bold mb-3">Owner Info</h2>
            <p className="text-gray-700">👤 {propertyData.owner.name}</p>
            <p className="text-gray-600">✉️ {propertyData.owner.email}</p>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
                ❤️ Favorite
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                📞 Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Random;
