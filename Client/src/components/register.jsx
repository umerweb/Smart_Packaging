import { useForm } from "react-hook-form";
import axious from "../axious";
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Register = ({ handleLoginForm }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

  const onSubmit = async (formData) => {
    //console.log(formData);
    try {
      const response = await axious.post('/auth', formData)
      
      console.log(response)
      toast.success(response.data.user)
      reset();
      navigate('/emailsend')
     
      

      
    } catch (error) {
     
      console.log(error.response.data.user)
      toast.error(error.response.data.user)
      
    }
   
  };

  const password = watch("password");

  return (
    <div className="flex justify-center w-[60%] flex-col mt-6 items-start">
      <p className="text-2xl font-semibold pr-2 text-slate-700">Create an account</p>
      <p className="text-sm font-medium pr-2 text-slate-700 pb-4">Enter your Details Below</p>
      <form className="w-[30vw]  pb-6 gap-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col pr-2 py-2 border-b border-slate-300">
          <input type="text"
            className="border-none outline-none w-[100%]"
            placeholder="Name"
            id="name"
            {...register("name", {
              required: "Required",
              minLength: { value: 9, message: "Min Length is 9" },
              maxLength: { value: 50, message: "Max Length is 50" }
            })}
          />
        </div>
        {errors.name && <span className="text-gray-700 font-semibold text-sm">{errors.name.message}</span>}

        <div className="flex flex-col pr-2 py-2 border-b border-slate-300">
          <input
            type="text"
            className="border-none outline-none w-[100%]"
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 6, message: "Username must be at least 6 characters" },
              maxLength: { value: 15, message: "Username must be at most 15 characters" },
              pattern: { value: /^\S+$/, message: "No spaces are allowed" }
            })}
          />
          
        </div>
        {errors.username && (
            <span className="text-gray-700 font-semibold text-sm">{errors.username.message}</span>
          )}

        <div className="flex flex-col pr-2 py-2 border-b border-slate-300">
          <input type="email"
            className="border-none outline-none w-[100%]"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: "Required",
              minLength: { value: 9, message: "Min Length is 9" },
              maxLength: { value: 50, message: "Max Length is 50" }
            })}
          />
        </div>
        {errors.email && <span className="text-gray-700 font-semibold text-sm">{errors.email.message}</span>}

        <div className="flex flex-col pr-2 py-2 border-b border-slate-300">
          <input type="number"
            className="border-none outline-none w-[100%]"
            placeholder="Phone number"
            id="number"
            {...register("number", {
              required: "Required",
              minLength: { value: 10, message: "Min Length is 10" },
              maxLength: { value: 15, message: "Max Length is 15" }
            })}
          />
        </div>
        {errors.number && <span className="text-gray-700 font-semibold text-sm">{errors.number.message}</span>}

        <div className="flex pr-2 py-2 border-b border-slate-300">
          <input type="password"
            className="border-none outline-none w-[100%]"
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "Required"
            })}
          />
        </div>
        {errors.password && <span className="text-gray-700 font-semibold text-sm">{errors.password.message}</span>}

        <div className="flex pr-2 py-2 border-b border-slate-300">
          <input type="password"
            className="border-none outline-none w-[100%]"
            placeholder="Confirm Password"
            id="cnpassword"
            {...register("cnpassword", {
              required: "Required",
              validate: value =>
                value === password || "Passwords do not match"
            })}
          />
        </div>
        {errors.cnpassword && <span className="text-gray-700 font-semibold text-sm">{errors.cnpassword.message}</span>}

        <div className="flex justify-between w-[100%] items-center">
          <button
            className='bg-red-500 w-[100%] text-white px-5 py-2 text-xs font-semibold rounded-sm hover:bg-red-400'
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div className="flex justify-center items-center">
          <p className="text-sm text-slate-700">Already have an account? <span className="cursor-pointer text-slate-800 font-medium hover:text-rose-500" onClick={handleLoginForm}>Log in</span></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
