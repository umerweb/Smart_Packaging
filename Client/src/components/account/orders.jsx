import { useSelector } from "react-redux";
import axios from '../../axious';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Orders = () => {

  const user = useSelector(state => state.user.user);
  const id = user._id;
  const [orders, setorders] = useState([])

  const fetchOrder = async () => {
    try {
      const order = await axios.post('/auth/getorders', { id })

      console.log(order.data.orders)
      setorders(order.data.orders)

    } catch (error) {
      console.log(error.data.order)

    }

  }
  useEffect(() => {
    fetchOrder();
  }, [])


  return (
    <div>
      {user !== null &&
        <>
          {orders.length > 0 ? (<>

            <div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="px-4 py-2 text-left text-gray-600">Order Id</th>
                      <th className="px-4 py-2 text-left text-gray-600">Quantity</th>
                      <th className="px-4 py-2 text-left text-gray-600">Price</th>
                      <th className="px-4 py-2 text-left text-gray-600">Status</th>
                      <th className="px-4 py-2 text-left text-gray-600">Date & Time</th>
                      <th className="px-4 py-2 text-left text-gray-600">More Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order._id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{order._id}</td>
                          <td className="px-4 py-2">{order.totalQuantity}</td>
                          <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                          <td className="px-4 py-2 capitalize">{order.orderStatus}</td>
                          <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                          <td className="px-4 py-2">
                            <Link to={`/order/info/${order._id}`} className="text-blue-500 hover:underline">
                              More Info
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </>) : (<>
            <p>Nah, You haven&#39;t ordered anything yet</p>

          </>)}

        </>
      }

    </div>
  )
}

export default Orders
