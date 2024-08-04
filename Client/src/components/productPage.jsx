import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import axios from "../axious"; // Corrected axios import
import { addItemToCart } from '../store/cart/cart'; // Corrected import
import { Link } from "react-router-dom";
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [latestproducts, setlatestproducts] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [isloading2, setisoading2] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartBtnRefs2 = useRef([]);
  const prodref = useRef();



  const fetchlatestproduct = () => {
    try {
      axios.get('/product/prod')
        .then(response => {


          setlatestproducts(response.data.product)
          //console.log(latestproducts)
        })
        .catch(error => {
          console.log(error)
        })

    } catch (error) {
      console.log(error)

    }


  }
  useEffect(() => {
    fetchlatestproduct();






  }, [])
  cartBtnRefs2.current = latestproducts.map((_, i) => cartBtnRefs2.current[i] ?? React.createRef());
  const displayBtn2 = (index) => {
    if (cartBtnRefs2.current[index] && cartBtnRefs2.current[index].current) {
      cartBtnRefs2.current[index].current.classList.remove("hidden");
      cartBtnRefs2.current[index].current.classList.add("show");
    }
  }

  const hideBtn2 = (index) => {
    if (cartBtnRefs2.current[index] && cartBtnRefs2.current[index].current) {
      cartBtnRefs2.current[index].current.classList.remove("show");
      cartBtnRefs2.current[index].current.classList.add("hidden");
    }
  }
  const scrolleft = () => {

    prodref.current.scrollBy({
      left: -300, // Adjust this value to change the scroll distance
      behavior: 'smooth'
    });


  }
  const scrollright = () => {
    prodref.current.scrollBy({
      left: 300, // Adjust this value to change the scroll distance
      behavior: 'smooth'
    });


  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/id/${id}`);
        const productData = response.data;
        setProduct(productData);

        const initialVariations = {};
        productData.variations.forEach(variation => {
          initialVariations[variation.name] = null;
        });
        setSelectedVariations(initialVariations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleVariationChange = (variationName, value) => {
    setSelectedVariations({
      ...selectedVariations,
      [variationName]: value
    });
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  const addToCartHandler = () => {
    setisoading2(true)
    const variationIds = Object.keys(selectedVariations).map(key => `${key}:${selectedVariations[key]}`).join('|');
    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: product.discount || product.price,
      variations: selectedVariations,
      quantity: selectedQuantity,
      currency: product.currency,  // Add currency
      mainImgSrc: product.mainImgSrc,
      variationId: variationIds, // Add variation IDs for uniqueness
    };
    //setSelectedVariations({});
    setisoading2(false)
    console.log('Adding to cart:', itemToAdd);
    dispatch(addItemToCart(itemToAdd));


  };
  const addToCartHandlerandcheckout = () => {
    setisLoading(true)
    const variationIds = Object.keys(selectedVariations).map(key => `${key}:${selectedVariations[key]}`).join('|');
    const itemToAdd = {
      id: product._id,
      name: product.name,
      price: product.discount || product.price,
      variations: selectedVariations,
      quantity: selectedQuantity,
      currency: product.currency,  // Add currency
      mainImgSrc: product.mainImgSrc,
      variationId: variationIds, // Add variation IDs for uniqueness
    };
    //setSelectedVariations({});

    console.log('Adding to cart and redirecting:', itemToAdd);
    dispatch(addItemToCart(itemToAdd));
    setisLoading(false)
    navigate("/checkout")

  };


  const PercentageCalculator = (part, total) => {
    return ((part / total) * 100).toFixed(0);
  };

  const isAddToCartDisabled = Object.values(selectedVariations).some(value => value === null);

  if (!product) {
    return <SkeletonTheme baseColor="#c1c1c1" highlightColor="#828282">
      <div className="flex flex-col">
        <div className="flex px-16 py-10 md:gap-32  justify-between items-start">
          <div className="flex min-w-[45%] gap-2 min-h-[90vh]">
            <div className="flex flex-col min-w-[30%]">
              <div className="flex min-w-[100%] min-h-[30%] "><Skeleton width="12vw" height="26vh" /></div>
              <div className="flex  min-w-[100%] min-h-[30%]"><Skeleton width="12vw" height="26vh" /></div>
              <div className="flex  min-w-[100%] min-h-[30%]"><Skeleton width="12vw" height="26vh" /></div>
            </div>
            <div className="flex min-w-[70%]">
              <Skeleton width="35vw" height="80vh" />
            </div>
          </div>
          <div className="flex flex-col  min-w-[45%]">
            <Skeleton width="35vw" className="mb-2" height="6vh" />
            <Skeleton width="25vw" className="mb-2" height="4vh" />
            <Skeleton width="6vw" className="mb-2" height="7vh" />
            <Skeleton width="35vw" className="mb-2" height="25vh" />
            <Skeleton width="35vw" className="mb-2" height="1vh" />
            <div className="flex gap-10">
              <Skeleton width="10vw" className="mb-2" height="6vh" />
              <Skeleton width="10vw" className="mb-2" height="6vh" />
              <Skeleton width="9vw" className="mb-2" height="6vh" />

            </div>
            <Skeleton width="35vw" className="mb-2" height="17vh" />
          </div>



        </div>
        <div className="flex  justify-around mb-5">
          <div className="flex flex-col">
            <Skeleton className="mb-1" width="200px" height="180px" />
            <Skeleton width="80px" height="20px" />
            <Skeleton width="160px" height="20px" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="mb-1" width="200px" height="180px" />
            <Skeleton width="80px" height="20px" />
            <Skeleton width="160px" height="20px" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="mb-1" width="200px" height="180px" />
            <Skeleton width="80px" height="20px" />
            <Skeleton width="160px" height="20px" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="mb-1" width="200px" height="180px" />
            <Skeleton width="80px" height="20px" />
            <Skeleton width="160px" height="20px" />
          </div>




        </div>
      </div>
    </SkeletonTheme>;
  }
  const incrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  return (
    <div className="flex bg-slate-50 flex-col">
      <div className="flex flex-col md:flex-row w-[100%] justify-between bg-slate-50">
        <div className="flex  md:w-[55vw] mx-8 gap-2 md:gap-3  justify-end min-h-[80vh]">
          <div className="flex flex-col gap-2 md:gap-3 justify-center items-start">
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} - ${index}`}
                className="w-36 h-32   shadow-md "
              />
            ))}

          </div>

          <div className="flex flex-col justify-center items-start">
            <img
              src={product.mainImgSrc}
              alt={product.name}
              className="md:w-[40vw] w-[75vw] h-[69vh]  shadow-md"
            />

          </div>
        </div>


        <div className="flex md:w-[45vw] px-8 min-h-[80vh] items-start justify-center flex-col ">

          <div className="name ">
            <p className="text-slate-900 font-semibold text-xl">{product.name}</p>
          </div>

          <div className="ratingXstock flex justify-start  w-[100%] items-center">
            <div className="rating flex  pr-2 justify-center items-center" >
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.545l6.57-.955L10 .525l2.941 6.065 6.571.955-4.756 4.998 1.122 6.545z" />
                </svg>
              ))}
              <svg className="w-5 h-5 pr-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.545l6.57-.955L10 .525l2.941 6.065 6.571.955-4.756 4.998 1.122 6.545z" />
              </svg>

              <span className=" text-gray-500">
                {"(150+ reviews)"}
              </span>
            </div>
            <div className="boderr"></div>
            <div className="stock flex   ">
              {product.sku >= 1 && <span className="text-green-300 font-semibold">In Stock</span>}
              {product.sku === 0 && <span className="text-red-400 font-semibold">Out of Stock</span>}
            </div>
          </div>


          <div className="price mt-2 flex w-[100%] justify-between ">


            <div className="flex gap-4">{product.discount ? (
              <p className="text-2xl line-through text-red-600 font-semibold">{product.currency}{product.price}</p>
            ) : (
              <p className="text-2xl text-red-600 font-semibold">{product.currency}{product.price}</p>
            )}
              {product.discount && (
                <p className="text-2xl text-gray-900 font-semibold">{product.currency}{product.discount}</p>
              )}</div>

            <div>
              {product.discount && (
                <p className="bg-red-500 rounded-md p-1 text-sm text-white">
                  {PercentageCalculator(product.discount, product.price)}% OFF
                </p>
              )}</div>


          </div>

          <div className="flex text-md font-normal">
            {product.shortDesc}
          </div>


          <hr className="w-[100%] text-slate-700" />

          <div className="variations flex w-[100%] justify-start gap-3">
            {product.variations && product.variations.length > 0 && (
              product.variations.map(variation => (
                <div key={variation._id.$oid} className="mb-4">
                  <label htmlFor={variation.name} className="block text-sm font-medium text-gray-700">
                    {variation.name}
                  </label>
                  <select
                    id={variation.name}
                    name={variation.name}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={selectedVariations[variation.name] || ""}
                    onChange={(e) => handleVariationChange(variation.name, e.target.value)}
                  >
                    <option value="" disabled>Select {variation.name}</option>
                    {variation.values[0].split(',').map((value, index) => (
                      <option key={`${variation.name}-${index}`} value={value.trim()}>
                        {value.trim()}
                      </option>
                    ))}
                  </select>
                </div>
              ))
            )}


          </div>

          <div className="flex justify-center items-center">



            <div className='flex-1  text-center pl-2 rm '>
              <button onClick={decrementQuantity} className='md:w-10 w-6 hover:bg-red-500 hover:text-white py-1 border-2 border-gray-700'>-</button>
              <input type="number" name="quantity" id="quantity" min="1" value={selectedQuantity} onChange={handleQuantityChange} className=" py-1 w-7 md:w-14 border-t-2 border-b-2 text-center border-gray-700 " />
              <button onClick={incrementQuantity} className='md:w-10 w-6 hover:bg-red-500 hover:text-white  border-2 py-1 border-gray-700'>+</button>
            </div>
            {isLoading ? (<>  <button
              className={` bg-red-500 text-white px-5 py-2 ml-2 text-xs md:text-sm font-semibold  rounded-sm hover:bg-red-400 focus:outline-none ${isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}

              title="Direct Checkout"
            >
              <i className="fa fa-spinner fa-spin"></i>Processing
            </button></>) : (<>  <button
              className={` bg-red-500 text-white px-5 py-2 ml-2 text-xs md:text-sm font-semibold  rounded-sm hover:bg-red-400 focus:outline-none ${isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={addToCartHandlerandcheckout}
              disabled={isAddToCartDisabled}
              title="Direct Checkout"
            >
              BUY NOW
            </button></>)}

            {isloading2 ? (
              <>
                <button
                  title="ADD TO CART"

                  className={` bor flex  border-gray-700  px-1 hover:bg-red-500 ml-3  ${isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <span className="w-5 h-8 pl-[20px] flex justify-center items-center"><i className="fa fa-spinner fa-spin"></i> </span>
                </button>

              </>) :
              (<>
                <button
                  title="ADD TO CART"
                  onClick={addToCartHandler}
                  disabled={isAddToCartDisabled}
                  className={` bor border-gray-700  px-1 hover:bg-red-500 ml-3  ${isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <img src="/bag.png" className="w-8" />
                </button>

              </>)}




          </div>



        </div>





      </div >


      <div className="flex flex-col mt-10 p-10 px-4 bg-slate-50">



        <div className="flex justify-between items-center w-full md:pr-20 pr-4 pl-4 md:pl-20">
          <div className="flex justify-between items-center">
            <div className="color flex justify-center items-center bg-red-600 w-[2vw] h-[7vh] rounded-sm"></div>
            <div className="h-[7vh] mt-2 flex justify-center items-start"><p className="font-bold fontp text-red-600 pl-2 ">Related Products</p></div>

          </div>

          <div className="flex gap-3">
            <div className="bg-slate-300 cursor-pointer rounded-full pr-2 pl-2 pb-1 pt-1" onClick={scrolleft}><i className="fa-solid fa-less-than text-lg font-semibold text-gray-600"></i></div>
            <div className="bg-slate-300 cursor-pointer rounded-full pr-2 pl-2 pb-1 pt-1" onClick={scrollright}><i className="fa-solid fa-greater-than text-lg font-semibold text-gray-600"></i></div>

          </div>



        </div>

        <div ref={prodref} className="flex mt-14 gap-20 justify-evenly items-start overflow-x-hidden md:pr-20 pr-4 pl-4 md:pl-20">
          <div className="flex gap-8 md:gap-16 products">

            {latestproducts.map((product, index) => (
              <div key={product._id} className="md:min-w-[18vw] min-w-[25%] flex flex-col   ">
                <div onMouseEnter={() => displayBtn2(index)}
                  onMouseLeave={() => hideBtn2(index)} className="w-full flex justify-between flex-col h-64 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${product.mainImgSrc})`, backgroundPosition: "center" }}>
                  <div className="flex justify-between p-3">
                    <div className="flex justify-start items-start">
                      {product.discount && <p className="bg-red-500 rounded-md p-1 text-sm text-white ubuntu">{PercentageCalculator(product.discount, product.price)}% -OFF</p>}


                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="bg-slate-200 hover:bg-red-500 pl-2 pr-2 pt-1 pb-1 cursor-pointer rounded-full "><i className="fa-regular hover:text-white fa-heart text-md text-black "></i></div>
                      <Link to={`/product/mainproduct/${product._id}`}><div className="bg-slate-200 hover:bg-red-500 cursor-pointer pl-2 pr-2 pt-1 pb-1 rounded-full "><i className="fa-regular hover:text-white fa-eye text-md text-black"></i></div></Link>

                    </div>



                  </div>


                  <div ref={cartBtnRefs2.current[index]} className="hidden justify-center items-center pt-2 pb-2 w-full bg-gray-800">
                    {product.variations && product.variations.length > 0 ?
                      (<><button className="text-white   font-semibold text-md"><Link className="dec text-slate-50 hover:text-slate-50" to={`/product/mainproduct/${product._id}`}>SELECT OPTIONS</Link></button></>)
                      : (<><button onClick={() => addToCartHandler(product._id)} className="text-white   font-semibold text-md">ADD TO CART</button></>)}


                  </div>

                </div>

                <div className="mt-2 flex flex-col justify-center h-32">
                  <Link className="deco" to={`/product/mainproduct/${product._id}`}><p className="text-md fontp font-bold">{product.name.substring(0, 50)}</p></Link>
                  <div className="rating flex  pr-2 justify-start items-center" >
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.545l6.57-.955L10 .525l2.941 6.065 6.571.955-4.756 4.998 1.122 6.545z" />
                      </svg>
                    ))}
                    <svg className="w-5 h-5 pr-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.545l6.57-.955L10 .525l2.941 6.065 6.571.955-4.756 4.998 1.122 6.545z" />
                    </svg>


                  </div>
                  <div className="flex gap-4  justify-start">
                    {product.discount ? (<p className="text-lg line-through text-red-600 font-semibold">{product.currency}{product.price}</p>) :
                      (<p className="text-lg  text-red-600 font-semibold">{product.currency}{product.price}</p>)}
                    {product.discount && <p className="text-lg text-gray-900 font-semibold">{product.currency}{product.discount}</p>}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductPage;
{/*
   <div className="container mx-auto py-4">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={product.mainImgSrc}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <div className="flex justify-center mt-4">
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${product.name} - ${index}`}
                className="w-1/4 h-auto rounded-lg shadow-md mx-1"
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 px-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex justify-start items-start">
            {product.discount && (
              <p className="bg-red-500 rounded-md p-1 text-sm text-white">
                {PercentageCalculator(product.discount, product.price)}% OFF
              </p>
            )}
          </div>
          {product.discount ? (
            <p className="text-lg line-through text-red-600 font-semibold">{product.currency}{product.price}</p>
          ) : (
            <p className="text-lg text-red-600 font-semibold">{product.currency}{product.price}</p>
          )}
          {product.discount && (
            <p className="text-lg text-gray-900 font-semibold">{product.currency}{product.discount}</p>
          )}
          {product.variations && product.variations.length > 0 && (
            product.variations.map(variation => (
              <div key={variation._id.$oid} className="mb-4">
                <label htmlFor={variation.name} className="block text-sm font-medium text-gray-700">
                  {variation.name}
                </label>
                <select
                  id={variation.name}
                  name={variation.name}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedVariations[variation.name] || ""}
                  onChange={(e) => handleVariationChange(variation.name, e.target.value)}
                >
                  <option value="" disabled>Select {variation.name}</option>
                  {variation.values[0].split(',').map((value, index) => (
                    <option key={`${variation.name}-${index}`} value={value.trim()}>
                      {value.trim()}
                    </option>
                  ))}
                </select>
              </div>
            ))
          )}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={selectedQuantity}
              onChange={handleQuantityChange}
              className="mt-1 block w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>
          <button
            className={`mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none ${isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={addToCartHandler}
            disabled={isAddToCartDisabled}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  */}