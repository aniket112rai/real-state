import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProperty = () => {
  const { propertyId } = useParams();
  console.log(propertyId)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/property/${propertyId}`, {
          withCredentials: true,
        });

        const property = res.data;

        
        reset({
          title: property.title ?? "",
          description: property.description ?? "",
          price: property.price ?? "",
          location: property.location ?? "",
        });

        setImagePreview(property.imageUrl);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    fetchProperty();
  }, [propertyId, reset]);


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  
  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let imageUrl = imagePreview;

      if (data.image && data.image[0]) {
        const base64Image = await convertToBase64(data.image[0]);
        const uploadRes = await axios.post(
          "http://localhost:3000/upload",
          { image: base64Image },
          { withCredentials: true }
        );
        imageUrl = uploadRes.data.url;
      }

      const payload = {
        title: data.title,
        description: data.description,
        price: parseInt(data.price),
        location: data.location,
        imageUrl,
      };

      await axios.put(`http://localhost:3000/property/${propertyId}`, payload, {
        withCredentials: true,
      });

      setUploading(false);
      navigate("/myproperty");
    } catch (error) {
      console.error("Error updating:", error);
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white shadow-md rounded-xl space-y-4 w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Edit Property
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        {/* Description */}
        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          {...register("location", { required: "Location is required" })}
          className="border p-2 w-full rounded"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="border p-2 w-full rounded"
          onChange={(e) => {
            if (e.target.files[0]) {
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {uploading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
