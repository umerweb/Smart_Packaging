import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from 'react-select';
import axios from "../../axious";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/user/user";
import { toast } from "react-hot-toast"

const Address = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const id = user._id;
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const [isLoading, setisLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const onsubmit = async (formData) => {
        //console.log(formData)
        setisLoading(true)
        try {
            const res = await axios.put('/auth/addaddress', { id, formData })
            console.log(res)
            toast.success("Address Added")
            setisLoading(false)
            reset();


            dispatch(setUser(res.data.user))

        } catch (error) {
            toast.error(error.response.data.error)
            setisLoading(false)

        }


    }
    // Hardcoded countries and their cities
    const countryCityData = {
        USA: ['New York', 'Los Angeles', 'Chicago'],
        Canada: ['Toronto', 'Vancouver', 'Montreal'],
        UK: ['London', 'Manchester', 'Birmingham'],
        Australia: ['Sydney', 'Melbourne', 'Brisbane'],
    };

    useEffect(() => {
        // Prepare country options
        const countryOptions = Object.keys(countryCityData).map(country => ({
            value: country,
            label: country
        }));
        setCountries(countryOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setValue('country', selectedOption ? selectedOption.value : '');

        if (selectedOption) {
            // Set cities based on selected country
            const cityOptions = countryCityData[selectedOption.value].map(city => ({
                value: city,
                label: city
            }));
            setCities(cityOptions);
        } else {
            setCities([]);
        }
    };

    const handleCityChange = (selectedOption) => {
        setValue('city', selectedOption ? selectedOption.value : '');
    };
    const address = user.address;

    return (
        <div className="flex md:flex-row flex-col items-start px-3 py-6 gap-10">
            <div className="md:w-[50%] w-[100%]">
                <form className="flex  justify-center items-start flex-col" onSubmit={handleSubmit(onsubmit)} >
                    <p className="font-semibold text-2xl mb-4 ubuntu">Add Address</p>

                    {/* Full Name */}
                    <div className="flex flex-col w-[100%] pb-3">
                        <label htmlFor="name" className="text-gray-500 font-semibold">Address Title</label>
                        <input

                            type="text"
                            id="name"
                            {...register("name", {
                                required: "Required",
                                minLength: { value: 10 },
                                maxLength: { value: 40 }
                            })}
                            className="input w-[100%] p-2 shadow-sm"
                        />
                        {errors.name?.type === "required" && <span className="text-gray-700 font-semibold text-sm">{errors.name.message}</span>}
                        {errors.name?.type === "minLength" && <span className="text-gray-700 font-semibold text-sm">Min Length is 10</span>}
                        {errors.name?.type === "maxLength" && <span className="text-gray-700 font-semibold text-sm">Max Length is 40</span>}
                    </div>

                    {/* Email */}
                    <div className="flex w-[100%] flex-col pb-3">
                        <label htmlFor="email" className=" text-gray-500 font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address"
                                },
                                minLength: { value: 10 }
                            })}
                            className="input w-[100%] p-2 shadow-sm"
                        />
                        {errors.email?.type === "required" && <span className="text-gray-700 font-semibold text-sm">{errors.email.message}</span>}
                        {errors.email?.type === "pattern" && <span className="text-gray-700 font-semiboldtext-sm">{errors.email.message}</span>}
                        {errors.email?.type === "minLength" && <span className="text-gray-700 font-semibold text-sm">Min Length is 10</span>}
                    </div>

                    {/* Contact Number */}
                    <div className="flex rm w-[100%] flex-col pb-3">
                        <label htmlFor="contactNumber" className=" text-gray-500 font-semibold">Contact Number</label>
                        <input
                            type="number"
                            id="contactNumber"
                            {...register("contactNumber", {
                                required: "Required",
                                minLength: { value: 10 },
                                maxLength: { value: 40 }
                            })}
                            className="input w-[100%] p-2 shadow-sm"
                        />
                        {errors.contactNumber?.type === "required" && <span className="text-gray-700 font-semibold text-sm">{errors.contactNumber.message}</span>}
                        {errors.contactNumber?.type === "minLength" && <span className="text-gray-700 font-semibold text-sm">Min Length is 10</span>}
                        {errors.contactNumber?.type === "maxLength" && <span className="text-gray-700 font-semibold text-sm">Max Length is 40</span>}
                    </div>



                    {/* Country */}
                    <div className="flex w-[100%] flex-col pb-3">
                        <label htmlFor="country" className="text-gray-500  font-semibold">Country</label>
                        <Select
                            options={countries}
                            onChange={handleCountryChange}
                            className="input w-[100%] p-2 shadow-sm"
                        />
                        <input
                            type="hidden"
                            {...register('country', { required: "Required" })}
                        />
                        {errors.country && <span className="text-gray-700 font-semibold text-sm">{errors.country.message}</span>}
                    </div>

                    {/* City */}
                    {selectedCountry && (
                        <div className="flex w-[100%] flex-col pb-3">
                            <label htmlFor="city" className="text-gray-500 font-semibold">City</label>
                            <Select
                                options={cities}
                                onChange={handleCityChange}
                                className="input w-[100%] p-2 shadow-sm"
                            />
                            <input
                                type="hidden"
                                {...register('city', { required: "Required" })}
                            />
                            {errors.city && <span className="text-gray-700 font-semibold text-sm">{errors.city.message}</span>}
                        </div>
                    )}

                    {/* Street Address */}
                    <div className="flex  w-[100%] flex-col pb-3">
                        <label htmlFor="address" className="text-gray-500 font-semibold">Street Address</label>
                        <input
                            type="text"
                            id="address"
                            {...register("address", {
                                required: "Required",
                                minLength: { value: 10 },
                                maxLength: { value: 80 }
                            })}
                            className="input w-[100%] p-2 shadow-sm"
                        />
                        {errors.address?.type === "required" && <span className="text-gray-700 font-semibold text-sm">{errors.address.message}</span>}
                        {errors.address?.type === "minLength" && <span className="text-gray-700 font-semibold text-sm">Min Length is 10</span>}
                        {errors.address?.type === "maxLength" && <span className="text-gray-700 font-semibold text-sm">Max Length is 80</span>}
                    </div>

                    <div className="flex justify-start items-center">
                        {isLoading ? (<>
                            <button className='bg-red-400 outline-none border-none pt-2 pb-2 pl-3 pr-3 text-slate-50 font-semibold cursor-pointer text-md' ><i className="fa fa-spinner fa-spin"></i>Saving</button></>) : (
                            <><button type="submit" className='bg-red-600 outline-none border-none hover:bg-red-400 pt-2 pb-2 pl-3 pr-3 text-slate-50 font-semibold cursor-pointer text-md' >Add Address</button></>
                        )}



                    </div>


                </form>
            </div>
            <div className="flex flex-col min-h-[80vh] md:w-[50%] w-[100%] ">
                <p className="text-xl font-semibold ">Your Addresses</p>
                <span className="text-sm mt-[-10px] text-red-500 mb-3 font-normal">You can add maximum 3 addresses only...</span>

                {address.length === 0 ? (<><div className="md:h-[80vh] h-[20vh] flex justify-center items-center">
                    <p>No addresses found</p>
                    </div></>):(<>
                        {address.map((data) => (
                    <div key={data._id} className="flex flex-col p-4 w-full bg-slate-100 mb-2">

                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex flex-col">
                            <p className="text-sm md:text-base"><span className="font-medium">Title: </span>{data.name}</p>
                            <p className="text-sm md:text-base"><span className="font-medium">Email: </span>{data.email}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm md:text-base"><span className="font-medium">Country: </span>{data.country}</p>
                            <p className="text-sm md:text-base"><span className="font-medium">City: </span>{data.city}</p>
                        </div>
                    </div>
                
                    <p className="text-sm md:text-base mt-2"><span className="font-medium">Contact:</span> {data.contactNumber}</p>
                    <p className="text-sm md:text-base mt-1"><span className="font-medium">Address: </span>{data.address}</p>
                
                </div>
                

                ))}
                    </>)}
                

            </div>

        </div>
    )
}

export default Address
