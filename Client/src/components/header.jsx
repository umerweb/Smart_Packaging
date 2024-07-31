import { useState } from "react";
import {Link} from 'react-router-dom';
 import { useSelector, useDispatch } from "react-redux";
 import {logout} from '../store/user/user';


const Header = () => {

 
  const dispatch = useDispatch();
   const user = useSelector(state => state.user.user);
  
    const [searchval , setsearchval]= useState('');
    const [barimg, setbarimg] = useState('left.png')

    const handleChange = (event) => {
        setsearchval(event.target.value);
      };
    
      const handlebar = () => {
        if (barimg === 'left.png') {
            setbarimg('close.png')
            
        }
        else(
            setbarimg('left.png')
        )
      }
      
  return (
    <div>
      <div className="flex bg-white items-center justify-around min-h-24 border-b-2 border-b-slate-100">
        <Link className="text-black dec hover:text-red-500" to="/" ><div className="logo fontlogo font-extrabold text-xl">
            Smart Packaging 
        </div></Link>
        {user !== null && <div>{user.name}<p><button onClick={()=> dispatch(logout()) }>logout</button></p></div>}
        
        
        
        
        <div className="menu">
            <ul className="flex gap-5">
                  <Link  className="dec hover:text-red-500 text-slate-900 font-semibold" to="/"><li>Home</li></Link> 
                
                <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to="/catalog"><li>Shop</li></Link> 
                <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to=""><li>About</li></Link> 
               <Link className="dec hover:text-red-500 text-slate-900 font-semibold" to=""><li>Contact</li></Link> 
            </ul>
        </div>
        <div className="iconsearch flex justify-around items-center gap-7">

            <div className="searchbar1">
            <input 
             type="text"
             placeholder="What are you Looking for?"
             onChange={handleChange}
             value={searchval} />
             <img src="search.png" alt="" className="w-6" />
             </div>
             {user === null ? (<>
              <Link to="/login"><img className="w-5 cursor-pointer" src="user.png" alt="" /></Link>
             </>):(<>
              <Link to="/account"><img className="w-5 cursor-pointer" src="user.png" alt="" /></Link>
             </>)}
            
             <Link to="/cart"><img className="w-6 cursor-pointer" src="shopping-cart.png" alt="" /></Link>
             <img className="w-5 cursor-pointer" onClick={handlebar} src={barimg} alt="" />

        </div>
      </div>
    </div>
  )
}

export default Header
