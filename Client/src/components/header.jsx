import { useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
//  import {logout} from '../store/user/user';


const Header = () => {


  // const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  //const totalAmount = useSelector(state => state.cart.totalAmount);

  const [searchval, setsearchval] = useState('');
  // const [barimg, setbarimg] = useState('left.png')

  const handleChange = (event) => {
    setsearchval(event.target.value);
  };

  // const handlebar = () => {
  //   if (barimg === 'left.png') {
  //       setbarimg('close.png')

  //   }
  //   else(
  //       setbarimg('left.png')
  //   )
  // }

  return (
    <div>
      <div className="flex bg-white items-center justify-around min-h-24 border-b-2 border-b-slate-100">
        <Link className="text-black dec hover:text-red-500" to="/" ><div className="logo fontlogo font-extrabold text-sm sm:text-md md:text-xl">
          Smart Packaging
        </div></Link>
        {/* {user !== null && <div>{user.name}<p><button onClick={()=> dispatch(logout()) }>logout</button></p></div>} */}




        <div className="menu md:flex hidden">
          <ul className="flex gap-5">
            <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to="/"><li>Home</li></Link>

            <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to="/catalog"><li>Shop</li></Link>
            <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to="/about"><li>About</li></Link>
            <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to="/contact"><li>Contact</li></Link>
          </ul>
        </div>
        <div className="iconsearch flex justify-around items-center gap-7">

          <div className="searchbar1 hidden md:flex">
            <input
              type="text"
              placeholder="What are you Looking for?"
              onChange={handleChange}
              value={searchval} />
            <img src="search.png" alt="" className="w-6" />
          </div>
          {user === null ? (<>
            <Link to="/login"><img className="w-5 cursor-pointer" src="user.png" alt="" /></Link>
          </>) : (<>
            <Link to="/account"><img className="w-5 cursor-pointer" src="user.png" alt="" /></Link>
          </>)}
          {/* <div className="flex mr-[-25px]  borb border-black">
          <span className=" mb-[-2px]  border-black text-sm font-medium
          ">${totalAmount}</span>
          </div> */}
          <div className="relative ">
            <Link to="/cart"><img className="w-6 cursor-pointer" src="shopping-cart.png" alt="" /></Link>
            {totalQuantity > 0 &&
              <span className="absolute top-0 right-0 left-4 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalQuantity}
              </span>
            }
          </div>
         
          

          {/* <img className="w-5 cursor-pointer" onClick={handlebar} src={barimg} alt="" /> */}

        </div>
      </div>
    </div>
  )
}

export default Header
