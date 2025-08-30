import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingProperties from "../components/LoadingProperties";
import axios from "axios";

const Property = () => {
  const { register, handleSubmit } = useForm();
  const [filteredProps, setFilteredProps] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await axios.get("http://localhost:3000/property/filter", {
        params: {
          location: data.location,
          minPrice: data.MinPrice,
          maxPrice: data.MaxPrice,
        },
      });
      setFilteredProps(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen bg-gray-200">
      
      <div className="w-full flex justify-center items-center pt-6 bg-gray-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md space-y-4 border-2 border-gray-200 rounded-4xl p-6 mt-10"
        >
          <div className="gap-5 md:flex">
            <div className="p-2">
              <input
                type="text"
                placeholder="Enter location"
                {...register("location")}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="p-2">
              <input
                type="number"
                placeholder="Min Price"
                {...register("MinPrice")}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="p-2">
              <input
                type="number"
                placeholder="Max Price"
                {...register("MaxPrice")}
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </form>
      </div>

      
      <LoadingProperties filteredProps={filteredProps} />
    </div>
  );
};

export default Property;
