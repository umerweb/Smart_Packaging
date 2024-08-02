import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../axious";

// eslint-disable-next-line react/prop-types
const OrderInfo = () => {
    const [res, setSelectedOrder] = useState(null);
    const { id } = useParams();
    //console.log(id)

    const fetchOrder = async () => {
        try {
            const order = await axios.post('/auth/getinfo', { id })

            console.log(order.data.orders)
            setSelectedOrder(order.data.orders)

        } catch (error) {
            console.log(error.data.order)

        }

    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <div>

            <div className="min-h-screen my-9 flex flex-col justify-center items-center bg-white">
                <div className=" p-6 rounded-lg shadow-md ">
                    <h1 className="text-2xl font-bold text-red-500 mb-4 text-center">Order Info</h1>
                    {res !== null && (<>
                        <p className="text-lg text-gray-800 text-center">Your Order ID is: <span className="font-semibold">{res._id}</span></p>
                        <div className='flex flex-row-reverse gap-16'>

                            <div className='flex flex-col'>

                                <p className='text-lg text-red-500 font-semibold'>Order Details</p>
                                <p className="mb-2"><strong>Total Quantity:</strong> {res.totalQuantity}</p>
                                <p className="mb-2"><strong>Total Amount:</strong> ${res.totalAmount}</p>
                                <p className="mb-2"><strong>Payment Method:</strong> {res.paymentMethod}</p>
                                <p className="mb-2"><strong>Order Status:</strong> {res.orderStatus}</p>
                                <p className="mb-4"><strong>Order Date:</strong> {new Date(res.createdAt).toLocaleString()}</p>

                                <p className='text-lg text-red-500 font-semibold'>Address Details</p>
                                <p className="mb-2"><strong>Name:</strong> {res.userData.name}</p>
                                <p className="mb-2"><strong>Email:</strong> {res.userData.email}</p>
                                <p className="mb-2"><strong>Country:</strong> {res.userData.country}</p>
                                <p className="mb-2"><strong>City:</strong> {res.userData.city}</p>
                                <p className="mb-2"><strong>Address:</strong> {res.userData.address}</p>
                                <p className="mb-2"><strong>Contact Number:</strong> {res.userData.contactNumber}</p>
                            </div>

                            <div className="flex">
                                <div className="space-y-4">
                                    <p className="text-lg text-red-500 font-semibold">Product Details</p>
                                    {res.cartItems.map(item => (
                                        <div key={item.id} className="flex items-center space-x-2 p-2 border rounded-md">
                                            <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                            <div className="flex flex-col flex-1">
                                                <p className="text-sm font-semibold">{item.name}</p>
                                                <p className="text-xs"><strong>Price:</strong> {item.currency}{item.price}</p>
                                                <p className="text-xs"><strong>Quantity:</strong> {item.quantity}</p>
                                                <p className="text-xs"><strong>Subtotal:</strong> {item.currency}{(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>



                    </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
