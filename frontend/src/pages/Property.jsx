import React from "react";
import { useForm } from "react-hook-form";
import LoadingProperties from "../components/LoadingProperties";

const Property=()=> {
  const {
    register,       
    handleSubmit,   
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
        <div className="w-full flex  justify-center items-center pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md  space-y-4 border-2 border-gray-200 rounded-lg p-6 mt-10  ">
        {/* location */}
            <div className=" gap-5  md:flex ">
                        <div className="p-2"> 
                        {/* 1 */}

                            <input
                                type="text"
                                placeholder="Enter location"
                                {...register("location")}
                                className="border p-2 w-full rounded"
                            />
                            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                        </div>

                        {/* min price */}
                        <div className="p-2">

                            <input
                                type="text"
                                placeholder="Min Price"
                                {...register("MinPrice")}
                                className="border p-2 w-full rounded"
                            />
                            {errors.MinPrice && <p className="text-red-500">{errors.MinPrice.message}</p>}
                        </div>

                        <div className="p-2">

                            <input
                                type="text"
                                placeholder="Max Price"
                                {...register("MaxPrice")}
                                className="border p-2 w-full rounded"
                            />
                            {errors.MaxPrice && <p className="text-red-500">{errors.MaxPrice.message}</p>}
                        </div>

                    {/* Submit */}
                    <div className="flex justify-center items-center">
                        <button 
                            type="submit"
                            className="bg-blue-600  hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Apply
                        </button>
                    </div>
                </div>    

            </form>
            <div>
                
            </div>
            
        </div>

        {/* loading */}
        <LoadingProperties/>
        
    </>
  );
}

export default Property;
