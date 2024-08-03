import { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import axious from '../axious'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import CheckoutForm from './checkoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from 'react-router-dom';


const stripePromise = loadStripe("pk_test_51PcBdIJ4MtESgtQC7AdmDIU5x4S1sXV7VszOm47BXm9nQSBgM5Zl3G1xjH6I0ulR4LD3zP0zfyqKiy4sifXh330e00aKQV00CP");

const Checkout = () => {
  const user = useSelector(state => state.user.user)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [addressdata, setaddressdata] = useState(false);
  const [existingaddress, setexistingaddress] = useState([]);
  const [currentadd, setcurrentadd] = useState(null)



  const cardPymntref = useRef()
  const codpyref = useRef()



  const io = document.getElementById('io');
  const io2 = document.getElementById('io2')
  const fun1 = () => {

    io.style.display = "flex";
    io2.style.display = "none";

  }
  const fun2 = () => {

    io2.style.display = "flex"
    io.style.display = "none";

  }







  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);


  const shipping = () => {

    if (totalAmount >= 500) {
      let shippingAmount = "Free Shipping";
      return shippingAmount;

    } else {
      let shippingAmount = 200
      return shippingAmount
    }
  }

  const lastTotal = () => {
    if (totalAmount >= 500) {
      return totalAmount
    }
    else {
      let total = totalAmount + shipping()
      return total
    }
  }
  const amount = lastTotal()


  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    axious.post("/order/payment", { amount: amount }) // Example amount
      .then((response) => setClientSecret(response.data.clientSecret))
      .catch((error) => console.error("Error fetching client secret:", error));

  }, [amount]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };





  const onSubmit = async (formData) => {

    localStorage.setItem('formData', JSON.stringify(formData));

    setaddressdata(true)

    const data = localStorage.getItem('formData');

    setcurrentadd(JSON.parse(data))
    console.log("mystate", currentadd)



    //console.log(formData)

    // console.log("Address data",addressdata)



  };


  const handleexistingaddress = (e) => {
    const selectedId = e.target.value;
    const selectedAddressObj = existingaddress.find(address => address._id === selectedId);
    localStorage.setItem('formData', JSON.stringify(selectedAddressObj))
    const data = localStorage.getItem('formData');

    setcurrentadd(JSON.parse(data))
    console.log("mystate", currentadd)
  }











  //console.log(cartItems, totalAmount, totalQuantity)

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


  useEffect(() => {
    if (user !== null) {
      const userdata = user.address
      setexistingaddress(userdata)
      //console.log(existingaddress)

    }
  }, [])




  return (
    <div className="flex flex-col md:flex-row w-full pt-10 pb-10 h-full bg-slate-50">
      <div className="flex w-[100%] md:w-[50vw] flex-col justify-center md:mb-[0] mb-10 items-center ">

        <form className="flex w-[80%] justify-center items-start flex-col" onSubmit={handleSubmit(onSubmit)} >
          <p className="font-semibold text-2xl mb-4 ubuntu">Billing Details</p>
          {user !== null && existingaddress.length > 1 &&


            <div className='w-[100%] md:pr-14'>
              <p className='text-md font-medium text-red-500'>Use Existing Address</p>
              <select className='w-[100%] cursor-pointer pl-2 h-10' name="address" id="" onChange={handleexistingaddress}>
                <option value="">Select Option</option>
                {existingaddress.map((data) => (

                  <option className='cursor-pointer' key={data._id} value={data._id}>{data.name}</option>


                ))}

              </select>
            </div>

          }
          {user !== null && existingaddress.length > 1 &&
            <p className='text-md font-medium text-red-500 mt-4'>Add new Adrees manually</p>}
          {/* Full Name */}
          <div className="flex w-[100%] flex-col pb-3">
            <label htmlFor="name" className="text-gray-500 font-semibold">Full Name</label>
            <input

              type="text"
              id="name"
              {...register("name", {
                required: "Required",
                minLength: { value: 10 },
                maxLength: { value: 40 }
              })}
              className="input w-[100%] md:w-[35vw] p-2 shadow-sm"
            />
            {errors.name?.type === "required" && <span className="text-red-500 font-semibold text-sm">{errors.name.message}</span>}
            {errors.name?.type === "minLength" && <span className="text-red-500 font-semibold text-sm">Min Length is 10</span>}
            {errors.name?.type === "maxLength" && <span className="text-red-500 font-semibold text-sm">Max Length is 40</span>}
          </div>

          {/* Email */}
          <div className="flex w-[100%] flex-col pb-3">
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
              className="input w-[100%] md:w-[35vw] p-2 shadow-sm"
            />
            {errors.email?.type === "required" && <span className="text-red-500 font-semibold text-sm">{errors.email.message}</span>}
            {errors.email?.type === "pattern" && <span className="text-red-500 font-semiboldtext-sm">{errors.email.message}</span>}
            {errors.email?.type === "minLength" && <span className="text-red-500 font-semibold text-sm">Min Length is 10</span>}
          </div>

          {/* Contact Number */}
          <div className="flex w-[100%] flex-col pb-3">
            <label htmlFor="contactNumber" className="text-gray-500 font-semibold">Contact Number</label>
            <input
              type="number"
              id="contactNumber"
              {...register("contactNumber", {
                required: "Required",
                minLength: { value: 10 },
                maxLength: { value: 40 }
              })}
              className="input w-[100%] md:w-[35vw] p-2 shadow-sm"
            />
            {errors.contactNumber?.type === "required" && <span className="text-red-500 font-semibold text-sm">{errors.contactNumber.message}</span>}
            {errors.contactNumber?.type === "minLength" && <span className="text-red-500 font-semibold text-sm">Min Length is 10</span>}
            {errors.contactNumber?.type === "maxLength" && <span className="text-red-500 font-semibold text-sm">Max Length is 40</span>}
          </div>



          {/* Country */}
          <div className="flex w-[100%] flex-col pb-3">
            <label htmlFor="country" className="text-gray-500 font-semibold">Country</label>
            <Select
              options={countries}
              onChange={handleCountryChange}
              className="input w-[100%] md:w-[35vw] p-2 shadow-sm"
            />
            <input
              type="hidden"
              {...register('country', { required: "Required" })}
            />
            {errors.country && <span className="text-red-500 font-semibold text-sm">{errors.country.message}</span>}
          </div>

          {/* City */}
          {selectedCountry && (
            <div className="flex w-[100%] flex-col pb-3">
              <label htmlFor="city" className="text-gray-500 font-semibold">City</label>
              <Select
                options={cities}
                onChange={handleCityChange}
                className="input w-[100%] md:w-[35vw] p-2 shadow-sm"
              />
              <input
                type="hidden"
                {...register('city', { required: "Required" })}
              />
              {errors.city && <span className="text-red-500 font-semibold text-sm">{errors.city.message}</span>}
            </div>
          )}

          {/* Street Address */}
          <div className="flex w-[100%] flex-col pb-3">
            <label htmlFor="address" className="text-gray-500 font-semibold">Street Address</label>
            <input
              type="text"
              id="address"
              {...register("address", {
                required: "Required",
                minLength: { value: 10 },
                maxLength: { value: 80 }
              })}
              className="input w-[100%] md:w-[35vw] p-2 shadow-sm"
            />
            {errors.address?.type === "required" && <span className="text-red-500 font-semibold text-sm">{errors.address.message}</span>}
            {errors.address?.type === "minLength" && <span className="text-red-500 font-semibold text-sm">Min Length is 10</span>}
            {errors.address?.type === "maxLength" && <span className="text-red-500 font-semibold text-sm">Max Length is 80</span>}
          </div>

          <div className="flex justify-start items-center">

            <input type="submit" className='bg-red-600 pt-2 pb-2 pl-3 pr-3 text-slate-50 font-semibold cursor-pointer text-md' value="Confirm Address" />
            {addressdata && <><i className="fa-regular ml-2 transi text-red-600  text-2xl fa-circle-check"></i></>}
          </div>


        </form>
      </div>
      <div className="flex w-[100%]  md:w-[50vw] justify-center items-center ">
        <div className='flex flex-col border-2 w-[100%] md:w-[90%] bg-white border-gray-700 p-3'>
          <p className='self-center text-lg font-semibold '>Order Summary</p>
          <div className='flex  md:w-[40vw] md:pl-20 font-semibold items-center justify-between  border-b'>

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
              <div key={uniqueKey} className='flex md:w-[40vw] items-center justify-between p-1 border-b'>
                <div className='flex items-center flex-1'>
                  <img src={item.img} alt={item.name} className='w-10 md:flex hidden h-10 object-cover rounded mr-2' />
                  <p className='font-semibold text-xs text-wrap line-clamp-4 overflow-hidden text-ellipsis md:w-40'>{limitedName}</p>
                </div>

                <p className='flex-1 text-center text-xs'>{item.currency}{item.price}</p>
                <p className='flex-1 text-center text-xs'>x</p>
                <p className='flex-1 text-center text-xs'>{item.quantity}</p>
                <p className='flex-1 text-center text-xs text-red-500 font-medium'>{item.currency}{(item.price * item.quantity).toFixed(2)}</p>
              </div>

            );
          })}
          <div className='flex md:w-[40vw] pt-1 pl-4 pr-4  font-semibold items-center justify-between  border-b'>
            <p className='flex text-left text-xs'>Total Quantity:</p>
            <p className='flex text-left text-xs'>{totalQuantity}</p>

          </div>
          <div className='flex md:w-[40vw] pt-1 pl-4 pr-4  font-semibold items-center justify-between  border-b'>
            <p className='flex text-left text-xs'>Total Price:</p>
            <p className='flex text-left text-xs'>{totalAmount}</p>

          </div>
          <div className='flex md:w-[40vw] pt-1 pl-4 pr-4  font-semibold items-center justify-between  border-b'>
            <p className='flex text-left text-xs'>Shipping:</p>
            <p className='flex text-left text-xs'>{shipping() >= 1 ? (<>${shipping()}</>) : (<>{shipping()}</>)}</p>

          </div>
          <div className='flex md:w-[40vw] pt-2 pl-4 pr-4  font-semibold items-center justify-between  '>
            <p className='flex text-left text-xs'>Total Amount:</p>
            <p className='flex text-left text-lg text-red-500'>${lastTotal()}</p>

          </div> {currentadd !== null && <>
          <div className='px-4 bg-slate-100 pb-1 pt-4'>
           
              <div className='flex flex-col'>

                <div className='flex  mt-[-10px]'>
                  <p className='text-sm font-medium'>{currentadd.name}</p>
                </div>
                <div className='flex mt-[-10px]'>
                  <p className='text-sm font-normal pr-4'>{currentadd.email}</p>
                  <p className='text-sm font-normal'>{currentadd.contactNumber}</p>
                </div>
                <div className='flex mt-[-10px]'>
                  <p className='text-sm font-normal'>{currentadd.address} , </p>
                  <p className='text-sm font-normal'> {currentadd.city} , </p>
                  <p className='text-sm font-normal'> {currentadd.country}</p>

                </div>


              </div>
          
          </div>  </>}

          <div className='flex md:w-[40vw] pt-2 pl-4 pr-4 flex-col  font-semibold items-center justify-between  '>
            {currentadd !== null ? (<><div className='flex flex-col gap-0 justify-start items-center w-[100%]'>
              <div className="flex gap-2 justify-between items-center w-full">
                <div className='flex items-center gap-2'>
                  <input type="radio" name="payment" id="cardpy" />
                  <label onClick={() => { fun1() }} className='text-sm cursor-pointer pt-1 font-semibold' htmlFor="cardpy">Card Payment</label></div>
                <img src="cards.png" className='md:w-52 w-40' height="100px" alt="" />

              </div>
              <div className="flex gap-2 justify-start items-center w-full">
                <input className='w-3' type="radio" name="payment" id="codpay" />
                <label onClick={() => { fun2() }} className='text-sm cursor-pointer pt-1 font-semibold' htmlFor="codpay">Cash on Delivery</label>

              </div>

            </div></>) : (<>PLease Select or add an Address</>)}

            <div className="flex justify-start items-center w-[100%]">

              <div ref={cardPymntref} id='io' className='none trsit'>
                {clientSecret && (
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                )}
              </div>
              <div ref={codpyref} id='io2' className='none trsit  flex-col justify-center items-start w-[100%]'>
                <p className='font-semibold text-sm text-red-500'>Pay upon Delievry with Cash</p>

                <Link className='text-md pt-1 pb-1 pl-3 pr-3 rounded-sm dec font-semibold bg-slate-900 text-white' to="/success?redirect_status=succeeded&payment_intent=cod&payment_intent_client_secret=cod7676768" >PROCEED</Link>

              </div>

            </div>









          </div>


        </div>


      </div>
    </div>
  );
};

export default Checkout;
