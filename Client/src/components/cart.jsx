import { useSelector, useDispatch } from 'react-redux';
import { updateItemQuantity, removeItemFromCart } from '../store/cart/cart'; // Corrected import
import { Link } from 'react-router-dom';


const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);






  console.log('Cart Items:', cartItems);
  console.log('Total Quantity:', totalQuantity);
  console.log('Total Amount:', totalAmount);

  const handleRemoveItem = (item) => {
    dispatch(removeItemFromCart({
      id: item.id,
      variations: item.variations
    }));
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({
        id: item.id,
        variations: item.variations,
        quantity: newQuantity,
      }));
    }
  };

  const shippings = () => {

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
      let total = totalAmount + shippings()
      return total
    }
  }

  return (
    <div className='flex w-full bg-gray-50 overflow-x-hidden'>


      {cartItems.length === 0 ? (

        <div className='flex w-[100vw] h-[70vh] justify-center items-center'>
          <p>Your cart is empty.</p>
        </div>) : (

        <div id='main' className='flex flex-col   '>
          <div className='flex  w-[100vw]  p-16 flex-col '>
            <h2 className='text-xl mb-4 ubuntu font-semibold'>Cart Items</h2>
            <div className='flex font-semibold text-gray-900 mb-4 text-md fontp pt-2 bg-white justify-around items-center shadow-lg  min-h-16'>
              <p className='flex-1 text-center'>Product</p>
              <p className='flex-1 text-center'>Price</p>
              <p className='flex-1 text-center'>Quantity</p>
              <p className='flex-1 text-center'>Sub Total</p>
              <i className="  min-w-[30px]"></i>
            </div>



            {cartItems.map((item) => {
              // Create a unique key by combining ID and variation IDs
              const uniqueKey = `${item.id}-${JSON.stringify(item.variations)}`;
              return (
                <div key={uniqueKey} className='flex  flex-col'>


                  <div className='flex font-semibold  mb-2 text-gray-900 text-md fontp p-3 bg-white justify-around items-center shadow-lg w-full min-h-16'>
                    <div className='flex-1 flex-col'>
                      <div className='flex items-center mb-2'>
                        <img src={item.img} alt={item.name} className="w-10 h-auto mr-2" />
                        <p className="text-md font-semibold">{item.name}</p>
                      </div>
                      {item.variations && Object.keys(item.variations).length > 0 && (
                        <div className="flex mt-1 pl-11">
                          {Object.keys(item.variations).map(variationId => (
                            <span className='text-sm pr-2 text-gray-500' key={variationId}>
                              <span className="font-semibold text-gray-700">{variationId}: </span>
                              {item.variations[variationId]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className='flex-1 text-center'>
                      <p className="text-md">{item.currency}{item.price}</p>
                    </div>
                    <div className='flex-1  text-center pl-2 rm '>
                      <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className='w-10 hover:bg-red-500 hover:text-white border-2 border-gray-700'>-</button>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))} className=" w-14 border-t-2 border-b-2 text-center border-gray-700 " />
                      <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className='w-10 hover:bg-red-500 hover:text-white border-2 border-gray-700'>+</button>
                    </div>
                    <div className='flex-1 text-center'>
                      <div className='flex justify-center items-center space-x-2'>
                        <p >{item.currency}{item.price * item.quantity}</p>

                      </div>
                    </div>
                    <button onClick={() => handleRemoveItem(item)} className='pr-2  text-gray-500 pb-3 rounded'>x</button>

                  </div>
                </div>

              );

            })}



          </div>

        
          <div className='pl-16 mb-8  flex justify-between pr-28 items-start'>
          
            <div className="coupon">
            <Link to="/catalog" className=' mt-4 border-2 border-gray-500 font-semibold rounded-md  text-gray-800 pl-3 pr-3 pb-2 pt-2'>Return to Shop </Link>
            <div className="flex justify-center gap-4 items-center">
              <input type="text" placeholder='Coupon Code' className='min-w-[30-vw] pl-3 h-[8vh] mt-2 border-2 border-gray-500 rounded-md' />
              <p className='bg-red-500 mt-4 rounded-md h-[8vh]  text-white pl-3 pr-3 pb-2 pt-2'>Apply Coupon</p>
            </div>
            </div>
            <div className="totoldata border-2 p-4 border-gray-800">
              <p className='font-bold ubuntu text-lg'>Cart Totals</p>
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Total Quantity:</p><span>{totalQuantity}</span></div>
              <hr className='mt-1 mb-1' />
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Total Price:</p><span>${totalAmount}</span></div>
              <hr className='mt-1 mb-1' />
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Shipping:</p>{shippings() >= 1 ? (<>${shippings()}</>):(<>{shippings()}</>)  }</div>
              <hr className='mt-1 mb-1' />
              
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Total Amount:</p> <span>${lastTotal()}</span></div>
              <Link to="/checkout"><button className='bg-red-500 mt-4  text-white pl-3 pr-3 pb-2 pt-2'>PROCEED TO CHECKOUT</button></Link>
            </div>
          </div>
        </div>
      )}




    </div>
  );
};

export default CartPage;