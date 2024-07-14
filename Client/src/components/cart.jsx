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
                      <button onClick={() => handleQuantityChange(item, item.quantity - 1)} className='w-10 border-2 border-gray-700'>-</button>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))} className=" w-14 border-t-2 border-b-2 text-center border-gray-700 " />
                      <button onClick={() => handleQuantityChange(item, item.quantity + 1)} className='w-10 border-2 border-gray-700'>+</button>
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
            <Link to="/" className=' mt-4 border-2 border-gray-500 font-semibold rounded-md  text-gray-800 pl-3 pr-3 pb-2 pt-2'>Return to Shop </Link>
            <div className="flex justify-center gap-4 items-center">
              <input type="text" placeholder='Coupon Code' className='min-w-[30-vw] pl-3 h-[8vh] mt-2 border-2 border-gray-500 rounded-md' />
              <p className='bg-red-500 mt-4 rounded-md h-[8vh]  text-white pl-3 pr-3 pb-2 pt-2'>Apply Coupon</p>
            </div>
            </div>
            <div className="totoldata border-2 p-4 border-gray-800">
              <p className='font-bold ubuntu text-lg'>Cart Totals</p>
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Total Quantity:</p><span>${totalQuantity}</span></div>
              <hr className='mt-1 mb-1' />
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Shipping:</p>{totalAmount >= 500 ? (<span>free shipping</span>):(<span>$290</span>)}</div>
              <hr className='mt-1 mb-1' />
              
              <div className='flex justify-between min-w-[30vw]'><p className='font-semibold'>Total Amount:</p> <span>${totalAmount}</span></div>
              <button className='bg-red-500 mt-4  text-white pl-3 pr-3 pb-2 pt-2'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      )}




    </div>
  );
};

export default CartPage;
{/* <div className="container mx-auto p-4">
<h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
{cartItems.length === 0 ? (
  <p>Your cart is empty.</p>
) : (
  <div>
    {cartItems.map((item) => {
      // Create a unique key by combining ID and variation IDs
      const uniqueKey = `${item.id}-${JSON.stringify(item.variations)}`;
      return (
        <div key={uniqueKey} className="mb-4">
          <p className="text-xl font-semibold">{item.name}</p>
          <p className="text-lg">Price: {item.price}</p>
          {item.variations && Object.keys(item.variations).length > 0 && (
            <ul className="list-disc ml-6">
              {Object.keys(item.variations).map(variationId => (
                <li key={variationId}>
                  <span className="font-semibold">{variationId}: </span>
                  {item.variations[variationId]}
                </li>
              ))}
            </ul>
          )}
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
            className="border border-gray-300 rounded-md p-1 mt-2"
          />
          <button
            className="mt-2 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
            onClick={() => handleRemoveItem(item)}
          >
            Remove
          </button>
          <p className="text-lg">Total Price: {item.totalPrice}</p>
        </div>
      );
    })}
    <div className="mt-4">
      <p className="text-lg font-semibold">Total Quantity: {totalQuantity}</p>
      <p className="text-lg font-semibold">Total Amount: {totalAmount}</p>
      <Link to=''><button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Checkout
      </button></Link>
      <button className="ml-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400">
        Continue Shopping
      </button>
    </div>
  </div>
)}
</div> */}