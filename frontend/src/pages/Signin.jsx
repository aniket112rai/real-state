
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useContext/useAuth';

const Signin = () => {
  const navigate=useNavigate()
  const { login }=useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    try {
      await login(data.email,data.password)
      navigate("/")
      
    } catch (error) {
      console.error("signin failed:", error.response?.data || error.message);
      alert("signin failed")
    }
  };
  return (
    <div className=' absolute top-0 left-0 right-0 -z-10 bg-gray-200 '>
      <div className=' w-full h-screen  flex justify-center items-center'>
        <div>
          <div className="w-full min-h-screen flex justify-center items-center ">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl border-gray-100 border-2">
              <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Signin
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                

                {/* Email */}
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required"
                    })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Signin
                </button>
                  <div className='text-xs px-2'>Doesn't have an account? <span onClick={()=>navigate("/signup")} className='text-blue-700 underline cursor-pointer'>Register</span></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
