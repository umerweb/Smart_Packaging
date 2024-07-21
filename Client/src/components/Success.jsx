import axios from '../axious';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [res, setres] = useState(null)

  const paymentIntent = queryParams.get('payment_intent');
  const clientSecret = queryParams.get('payment_intent_client_secret');
  const redirectStatus = queryParams.get('redirect_status');

  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmountprice = useSelector(state => state.cart.totalAmount);
  const lastprice = () => {
    if (totalAmountprice < 500) {
      const total = totalAmountprice + 200;
      return total

    } else {
      return totalAmountprice
    }

  }
  const totalAmount = lastprice()


  const userId = "29222922627862";
  const paymentMethod = "card";

  //console.log(paymentIntent, clientSecret)

  const Data = localStorage.getItem('formData');
  //console.log(storedObjectString)
  const userData = JSON.parse(Data);
  //console.log(userData)


  const SaveOrder = async () => {

    try {
      //console.log(cartItems, totalAmount, totalQuantity, paymentIntent, clientSecret, userId , paymentMethod)
      const idk = await axios.post('/order/ordersuccess', { cartItems, totalAmount, totalQuantity, paymentIntent, clientSecret, userId, userData, paymentMethod })
        .then((response) => setres(response.data.order))
        .catch((error) => console.log(error))
      //console.log(res)
      if (idk) {
        localStorage.removeItem('formData');


      }


    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      SaveOrder();

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






  return (
    <div>
      <h1> <p>Payment {redirectStatus}</p></h1>

      {res !== null &&
        <p> Your Order id is: {res._id}</p>



      }




    </div>
  );
};

export default Success;
