import { useForm } from "react-hook-form";
import axious from "../axious";
import { toast } from "react-hot-toast";
import { setUser } from "../store/user/user";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const Login = ({ handleRegisterForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData)
    try {
      const response = await axious.post('/auth/ver', formData)

      //console.log(response)
      const { token, userId } = response.data;


      // Store the token in localStorage or cookies
      localStorage.setItem('token', token);



      ///console.log(userId)

      const userData = await axious.get(`/auth/getuser/${userId}`)
      const data = userData.data.userData;
      //console.log(data)

      const st = dispatch(setUser(data))

      if (st) {
        toast.success(response.data.user)
        reset();
        navigate('/')
      }





    } catch (error) {
      console.log(error)
      toast.error(error.response.data.user)

    }

  }
  return (
    <div className="flex justify-center w-[60%]  flex-col items-start">


      <p className="text-2xl font-semibold pb-2 pr-2 text-slate-700 ">Login to Smart Packaging</p>
      <p className="text-sm font-medium pr-2 text-slate-700 pb-4">Enter your Details Below</p>
      <form className="w-[25vw] gap-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col pr-2 py-2    bor-b border-slate-300">
          <input type="text"
            className="border-none outline-none   w-[100%]"
            placeholder="Email or Username"
            id="usermail"
            {...register("usermail", {
              required: "Required",
              minLength: { value: 6 },
              maxLength: { value: 50 }
            })}
          />


        </div>
        {errors.usermail?.type === "required" && <span className="text-gray-700 font-semibold text-sm">{errors.usermail.message}</span>}
        {errors.usermail?.type === "minLength" && <span className="text-gray-700 font-semibold text-sm">Min Length is 6</span>}
        {errors.usermail?.type === "maxLength" && <span className="text-gray-700 font-semibold text-sm">Max Length is 80</span>}
        <div className="flex pr-2 py-2  bor-b border-slate-300">
          <input type="text"
            className="border-none outline-none   w-[100%]"
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "Required"

            })}
          />


        </div>
        {errors.password?.type === "required" && <span className="text-gray-700 font-semibold text-sm">{errors.password.message}</span>}

        <div className="flex justify-between items-center">
          <button
            className=' bg-red-500  text-white px-5 py-2  text-xs font-semibold  rounded-sm hover:bg-red-400'
            type="submit"

            title="Direct Checkout"
          >
            Sign In
          </button>
          <p className="pt-2 text-sm font-normal text-red-500 cursor-pointer">Forget Password?</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm text-slate-700">New User? <span className="cursor-pointer text-slate-800 font-medium hover:text-rose-500" onClick={handleRegisterForm}>Create your account now</span></p>

        </div>


      </form>

    </div>
  )
}

export default Login
