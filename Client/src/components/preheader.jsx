import { Link } from 'react-router-dom';

const preheader = () => {
  return (
    <div>
        <div className='bg-black flex flex-col md:flex-row px-1 py-2 justify-center items-center min-h-8'>
            <span className='text-white fontp font-normal text-xs  md:text-md '>Summer Sale For All products And Free Express Delivery - OFF 50%!</span>
            <Link className='fontp text-white ml-3 underline text-xs md:text-md' to="/">Shop Now</Link>
        </div>
      
    </div>
  )
}

export default preheader
