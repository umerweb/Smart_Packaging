import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/user/user';
import Profile from './account/profile';
import Address from './account/address';
import Orders from './account/orders';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  useEffect(() => {
    if (user === null) {
      navigate('/')
    }

  }, [])
  const userlogout = () => {
    if (window.confirm("Are you sure you want to Logout?")) {
      dispatch(logout());
      navigate('/')

    }


  }
  const [activeTab, setActiveTab] = useState('profile');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Profile />

        );
      case 'addressBook':
        return (
          <Address />
        );

      case 'myReturns':
        return (
          <Orders />
        );


      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Menu */}
      <div className="md:hidden bg-white p-4 shadow-md">
        <button
          className="w-full text-left text-gray-700 px-4 py-2 rounded border border-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </button>
        {isMenuOpen && (
          <div className="mt-2 space-y-2">
            <button
              className={`block text-left w-full px-4 py-2 text-gray-700 rounded ${activeTab === 'profile' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
              onClick={() => { setActiveTab('profile'); setIsMenuOpen(false); }}
            >
              My Profile
            </button>
            <button
              className={`block text-left w-full px-4 py-2 text-gray-700 rounded ${activeTab === 'addressBook' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
              onClick={() => { setActiveTab('addressBook'); setIsMenuOpen(false); }}
            >
              Address Book
            </button>

            <button
              className={`block text-left w-full px-4 py-2 text-gray-700 rounded ${activeTab === 'myReturns' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
              onClick={() => { setActiveTab('myReturns'); setIsMenuOpen(false); }}
            >
              Orders
            </button>
            <button
              className={`block text-left w-full px-4 py-2 text-gray-700 round hover:bg-gray-100'}`}
              onClick={() => { userlogout() }}
            >
              Logout
            </button>


          </div>
        )}
      </div>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col bg-white w-1/4 p-6 shadow-md h-full">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Manage My Account</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <button
                  className={`block text-left w-full px-4 py-2 text-gray-700 rounded ${activeTab === 'profile' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  className={`block text-left w-full px-4 py-2 text-gray-700 rounded ${activeTab === 'addressBook' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('addressBook')}
                >
                  Address Book
                </button>
              </li>

            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <button
                  className={`block text-left w-full px-4 py-2 text-gray-700 rounded ${activeTab === 'myReturns' ? 'bg-red-50 text-red-500' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('myReturns')}
                >
                  Orders
                </button>
              </li>
              <li>
                <button
                  className={`block text-left w-full px-4 py-2 text-gray-700 rounded hover:bg-gray-100'}`}
                  onClick={() => { userlogout() }}
                >
                  Logout
                </button>
              </li>

            </ul>
          </div>
          <div>

          </div>
        </div>
      </nav>
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="container mx-auto bg-white p-6 rounded shadow-md">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
