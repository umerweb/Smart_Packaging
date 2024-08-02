import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/user"

import axios from '../../axious';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const onsubmit = async (formData) => {
        setisLoading(true)

        const form = {
            ...(formData.id && { id: user._id }),
            ...(formData.name && { name: formData.name }),
            ...(formData.number && { number: formData.number }),
            ...(formData.password && { password: formData.password }),
            ...(formData.oldpassword && { oldpassword: formData.oldpassword }),
        };
        console.log(form)

        try {
            const data = await axios.put('/auth/update', form);

            console.log(data);

            if (data.data.password === false) {
                toast.error("Old Password is incorrect")
                setisLoading(false);
            } else {
                toast.success(data.data.message)
                setisLoading(false);
                reset();
                dispatch(setUser(data.data.updatedUser))
            }

        } catch (error) {
            console.log(error)
            setisLoading(false)

        }

    }
    const password = watch("password");
    return (
        <div className="px-5">

            {user !== null &&

                <>
                    <p className="font-semibold text-2xl text-red-500">Edit Your Profile</p>
                    <form onSubmit={handleSubmit(onsubmit)}>

                        <div className="flex mb-2 flex-col md:flex-row gap-16 justify-between">
                            <div className="flex flex-col w-[100%]">
                                <label className="font-medium" htmlFor="name">Name</label>
                                <input type="text"

                                    id="name"
                                    title="name"
                                    className="px-3 py-2 int bg-slate-100 placeholder:text-slate-800 placeholder:font-normal placeholder:text-md"
                                    defaultValue={user.name}
                                    {...register("name", {

                                        minLength: { value: 9, message: "Min Length is 9" },
                                        maxLength: { value: 50, message: "Max Length is 50" }
                                    })}
                                />
                                {errors.name && <span className="text-gray-700 font-semibold text-sm">{errors.name.message}</span>}
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <label className="font-medium" htmlFor="email">Email</label>
                                <input type="text"
                                    value={user.email}
                                    id="email"
                                    title="email"
                                    className="px-3 py-2 int cursor-not-allowed caret bg-slate-100 placeholder:text-slate-800 placeholder:font-normal placeholder:text-md"


                                />
                                <p className="text-xs font-medium">Email cannot be changed</p>

                            </div>

                        </div>

                        <div className="flex gap-16 flex-col md:flex-row  justify-between">
                            <div className="flex flex-col rm w-[100%]">
                                <label className="font-medium" htmlFor="number">Number</label>
                                <input type="number"
                                    defaultValue={user.number}
                                    id="number"
                                    title="number"
                                    className="px-3 py-2 int  bg-slate-100 placeholder:text-slate-800 placeholder:font-normal placeholder:text-md"

                                    {...register("number", {

                                        minLength: { value: 10, message: "Min Length is 10" },
                                        maxLength: { value: 15, message: "Max Length is 15" }
                                    })}
                                />
                                {errors.number && <span className="text-gray-700 font-semibold text-sm">{errors.number.message}</span>}
                            </div>
                            <div className="flex flex-col w-[100%]">
                                <label className="font-medium" htmlFor="username">Username</label>
                                <input type="text"
                                    value={user.username}
                                    id="email"
                                    title="email"
                                    className="px-3 py-2 int caret cursor-not-allowed bg-slate-100 placeholder:text-slate-800 placeholder:font-normal placeholder:text-md"


                                />
                                <p className="text-xs font-medium">Username cannot be changed</p>

                            </div>

                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium" htmlFor="oldpassword">Password Changes</label>
                            <input
                                type="password"
                                className="px-3 py-2 bg-slate-100 int placeholder:text-slate-500 placeholder:font-normal placeholder:text-md"
                                placeholder="Current Password"

                                id="oldpassword"
                                {...register("oldpassword")}
                            />
                            {errors.oldpassword && <span className="text-gray-700 font-semibold text-sm">{errors.oldpassword.message}</span>}
                            <input
                                type="password"
                                className="px-3 py-2 bg-slate-100 int placeholder:text-slate-500 placeholder:font-normal placeholder:text-md mt-2"
                                placeholder="New Password"

                                id="password"
                                {...register("password")}
                            />
                            {errors.password && <span className="text-gray-700 font-semibold text-sm">{errors.password.message}</span>}
                            <input
                                type="password"
                                className="px-3 py-2 int bg-slate-100 placeholder:text-slate-500 placeholder:font-normal placeholder:text-md mt-2"
                                placeholder="Confirm Password"

                                id="cnpassword"
                                {...register("cnpassword", {

                                    validate: value => value === password || "Passwords do not match"
                                })}
                            />
                            {errors.cnpassword && <span className="text-gray-700 font-semibold text-sm">{errors.cnpassword.message}</span>}
                        </div>
                        <input type="hidden" value={user._id} {...register("id")} className="hidden" />
                        <button onClick={() => reset()} className=" mr-4 px-4 outline-none border-none py-2 mt-4 bg-slate-500 hover:bg-slate-400 text-white font-medium" type="submit">Cancel</button>
                        {isLoading ? (<><button className=" outline-none border-none px-4 py-2 mt-4 bg-red-400 cursor-progress text-white font-medium">
                            <i className="fa fa-spinner fa-spin"></i>Saving
                        </button></>) : (<>
                            <button className="px-4 outline-none border-none py-2 mt-4 bg-red-500 hover:bg-red-400 text-white font-medium" type="submit">Save Changes</button></>)}




                    </form>
                </>
            }




        </div>
    )
}

export default Profile
