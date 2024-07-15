import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);


  const shipping = () => {

    if(totalAmount >= 500){
      let shippingAmount = "Free Shipping";
      return shippingAmount;

    }else{
      let shippingAmount = 200
     return shippingAmount
    }
  }

  const lastTotal = () => {
    if(totalAmount >= 500){
      return totalAmount
    }
    else{
      let total = totalAmount + shipping()
      return total
    }
  }

 

  console.log(cartItems, totalAmount, totalQuantity)

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

  const onSubmit = async (formData) => {
    console.log(formData); // Handle form submission
  };

  return (
    <div className="flex w-full pt-10 pb-10 h-full">
      <div className="flex w-[50vw] flex-col justify-center items-center ">
        <form className="flex justify-center items-start flex-col" onSubmit={handleSubmit(onSubmit)}>
          <p className="font-semibold text-2xl mb-4 ubuntu">Billing Details</p>

          {/* Full Name */}
          <div className="flex flex-col pb-3">
            <label htmlFor="name" className="text-gray-500 font-semibold">Full Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Required",
                minLength: { value: 10 },
                maxLength: { value: 40 }
              })}
              className="input w-[35vw] p-2 shadow-sm"
            />
            {errors.name?.type === "required" && <span className="text-gray-500 text-sm">{errors.name.message}</span>}
            {errors.name?.type === "minLength" && <span className="text-gray-500 text-sm">Min Length is 10</span>}
            {errors.name?.type === "maxLength" && <span className="text-gray-500 text-sm">Max Length is 40</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col pb-3">
            <label htmlFor="email" className="text-gray-500 font-semibold">Email</label>
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
              className="input w-[35vw] p-2 shadow-sm"
            />
            {errors.email?.type === "required" && <span className="text-gray-500 text-sm">{errors.email.message}</span>}
            {errors.email?.type === "pattern" && <span className="text-gray-500 text-sm">{errors.email.message}</span>}
            {errors.email?.type === "minLength" && <span className="text-gray-500 text-sm">Min Length is 10</span>}
          </div>

          {/* Contact Number */}
          <div className="flex flex-col pb-3">
            <label htmlFor="contactNumber" className="text-gray-500 font-semibold">Contact Number</label>
            <input
              type="number"
              id="contactNumber"
              {...register("contactNumber", {
                required: "Required",
                minLength: { value: 10 },
                maxLength: { value: 40 }
              })}
              className="input w-[35vw] p-2 shadow-sm"
            />
            {errors.contactNumber?.type === "required" && <span className="text-gray-500 text-sm">{errors.contactNumber.message}</span>}
            {errors.contactNumber?.type === "minLength" && <span className="text-gray-500 text-sm">Min Length is 10</span>}
            {errors.contactNumber?.type === "maxLength" && <span className="text-gray-500 text-sm">Max Length is 40</span>}
          </div>



          {/* Country */}
          <div className="flex flex-col pb-3">
            <label htmlFor="country" className="text-gray-500 font-semibold">Country</label>
            <Select
              options={countries}
              onChange={handleCountryChange}
              className="input w-[35vw] p-2 shadow-sm"
            />
            <input
              type="hidden"
              {...register('country', { required: "Required" })}
            />
            {errors.country && <span className="text-gray-500 text-sm">{errors.country.message}</span>}
          </div>

          {/* City */}
          {selectedCountry && (
            <div className="flex flex-col pb-3">
              <label htmlFor="city" className="text-gray-500 font-semibold">City</label>
              <Select
                options={cities}
                onChange={handleCityChange}
                className="input w-[35vw] p-2 shadow-sm"
              />
              <input
                type="hidden"
                {...register('city', { required: "Required" })}
              />
              {errors.city && <span className="text-gray-500 text-sm">{errors.city.message}</span>}
            </div>
          )}

          {/* Street Address */}
          <div className="flex flex-col pb-3">
            <label htmlFor="address" className="text-gray-500 font-semibold">Street Address</label>
            <input
              type="text"
              id="address"
              {...register("address", {
                required: "Required",
                minLength: { value: 10 },
                maxLength: { value: 80 }
              })}
              className="input w-[35vw] p-2 shadow-sm"
            />
            {errors.address?.type === "required" && <span className="text-gray-500 text-sm">{errors.address.message}</span>}
            {errors.address?.type === "minLength" && <span className="text-gray-500 text-sm">Min Length is 10</span>}
            {errors.address?.type === "maxLength" && <span className="text-gray-500 text-sm">Max Length is 80</span>}
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="flex w-[50vw] justify-center items-center ">
        <div className='flex flex-col'>
          <div className='flex w-[40vw] pl-20 font-semibold items-center justify-between  border-b'>

            <p className='flex-1 text-left text-xs'>Product</p>
            <p className='flex-1 text-center text-xs'>Price</p>
            <p className='flex-1 text-center text-xs'>x</p>
            <p className='flex-1 text-center text-xs'>Quantity</p>
            <p className='flex-1 text-center text-xs'>Subtotal</p>
          </div>
          {cartItems.map((item) => {
            const uniqueKey = `${item.id}-${JSON.stringify(item.variations)}`;
            const limitedName = item.name.split(' ').slice(0, 5).join(' '); // Limit to 5 words
            return (
              <div key={uniqueKey} className='flex w-[40vw] items-center justify-between p-1 border-b'>
                <div className='flex items-center flex-1'>
                  <img src={item.img} alt={item.name} className='w-10 h-10 object-cover rounded mr-2' />
                  <p className='font-semibold text-xs line-clamp-3 overflow-hidden text-ellipsis w-40'>{limitedName}</p>
                </div>

                <p className='flex-1 text-center text-xs'>{item.currency}{item.price}</p>
                <p className='flex-1 text-center text-xs'>x</p>
                <p className='flex-1 text-center text-xs'>{item.quantity}</p>
                <p className='flex-1 text-center text-xs'>{item.currency}{(item.price * item.quantity).toFixed(2)}</p>
              </div>

            );
          })}
           <div className='flex w-[40vw] pt-1 pl-4 pr-4  font-semibold items-center justify-between  border-b'>
            <p className='flex text-left text-xs'>Total Quantity:</p>
            <p className='flex text-left text-xs'>{totalQuantity}</p>

          </div>
          <div className='flex w-[40vw] pt-1 pl-4 pr-4  font-semibold items-center justify-between  border-b'>
            <p className='flex text-left text-xs'>Shipping:</p>
            <p className='flex text-left text-xs'>{shipping()}</p>

          </div>
          <div className='flex w-[40vw] pt-2 pl-4 pr-4  font-semibold items-center justify-between  '>
            <p className='flex text-left text-xs'>Total Amount:</p>
            <p className='flex text-left text-xs'>${lastTotal()  }</p>

          </div>

          <div className='flex w-[40vw] pt-2 pl-4 pr-4  font-semibold items-center justify-between  '>
            

          </div>
         

        </div>


      </div>
    </div>
  );
};

export default Checkout;
