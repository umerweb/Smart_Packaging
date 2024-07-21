import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from "../axious"; // Corrected axios import
import { addItemToCart } from '../store/cart/cart'; // Corrected import


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const dispatch = useDispatch();

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
    setSelectedVariations({});

    console.log('Adding to cart:', itemToAdd);
    dispatch(addItemToCart(itemToAdd));

  };

  const PercentageCalculator = (part, total) => {
    return ((part / total) * 100).toFixed(0);
  };

  const isAddToCartDisabled = Object.values(selectedVariations).some(value => value === null);

  if (!product) {
    return <p>Loading...</p>;
  }
  const incrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  return (

    <div className="flex w-[100%] justify-between bg-slate-50">
      <div className="flex  w-[55vw] mx-8 gap-3  justify-end min-h-[80vh]">
        <div className="flex flex-col gap-3 justify-center items-start">
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
            className="w-[40vw] h-[69vh]  shadow-md"
          />

        </div>
      </div>


      <div className="flex w-[45vw] px-8 min-h-[80vh] items-start justify-center flex-col ">

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
            <button onClick={decrementQuantity} className='w-10 border-2 border-gray-700'>-</button>
            <input type="number" name="quantity" id="quantity" min="1" value={selectedQuantity} onChange={handleQuantityChange} className=" w-14 border-t-2 border-b-2 text-center border-gray-700 " />
            <button  onClick={incrementQuantity}   className='w-10 border-2 border-gray-700'>+</button>
          </div>
          <button
            className={` bg-blue-500 text-white  rounded-lg hover:bg-blue-600 focus:outline-none ${isAddToCartDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={addToCartHandler}
            disabled={isAddToCartDisabled}
          >
            Add to Cart
          </button>

        </div>



      </div>

    </div >

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