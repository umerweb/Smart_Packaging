import { useState, useEffect, useRef } from "react";
import axiousinstance from '../axious';
import { Link  } from 'react-router-dom';
import React from "react";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../store/cart/cart';


const Home = () => {

    const [category, setcategory] = useState([]);

    const [remainingTime, setRemainingTime] = useState('');
    const [latestproducts, setlatestproducts] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [newcategory, setNewCategory] = useState([]);
    const [firstCategory, setFirstCategory] = useState(null);
    const [secondCategory, setSecondCategory] = useState(null);
    const [thirdCategory, setThirdCategory] = useState(null);
    const [fourthCategory, setFourthCategory] = useState(null);

   

    const dispatch = useDispatch();
    const prodref = useRef();
    const catref = useRef();
    const cartBtnRefs = useRef([]);
    const cartBtnRefs2 = useRef([]);


  


    
    

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
    const scrolleft2 = () => {


        catref.current.scrollBy({
            left: -300, // Adjust this value to change the scroll distance
            behavior: 'smooth'
        });

    }
    const scrollright2 = () => {

        catref.current.scrollBy({
            left: 300, // Adjust this value to change the scroll distance
            behavior: 'smooth'
        });

    }

    // Initialize the refs array
    cartBtnRefs.current = latestproducts.map((_, i) => cartBtnRefs.current[i] ?? React.createRef());

    const displayBtn = (index) => {
        if (cartBtnRefs.current[index] && cartBtnRefs.current[index].current) {
            cartBtnRefs.current[index].current.classList.remove("hidden");
            cartBtnRefs.current[index].current.classList.add("show");
        }
    }

    const hideBtn = (index) => {
        if (cartBtnRefs.current[index] && cartBtnRefs.current[index].current) {
            cartBtnRefs.current[index].current.classList.remove("show");
            cartBtnRefs.current[index].current.classList.add("hidden");
        }
    }
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









    // Function to calculate remaining time until 3 PM
    const calculateRemainingTime = () => {
        const now = new Date(); // Current date and time
        const targetTime = new Date(); // Target time at 3 PM
        targetTime.setHours(15, 0, 0, 0); // Set target time to 3 PM

        // Calculate remaining time until 3 PM
        let remainingMilliseconds = targetTime - now;

        // If the target time has already passed for today, move it to tomorrow
        if (remainingMilliseconds < 0) {
            targetTime.setDate(targetTime.getDate() + 1);
            remainingMilliseconds = targetTime - now;
        }

        // Convert remaining time to hours, minutes, and seconds
        const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);

        return <div className="flex gap-3 items-center">

            <div className="flex flex-col justify-center items-center">
                <p className="ubuntu text-sm font-semibold">Hours</p><p className="fontc text-5xl font-bold">{remainingHours}</p>

            </div><p className="text-red-600 font-bold text-2xl mt-4">:</p>
            <div className="flex flex-col justify-center items-center">
                <p className="ubuntu text-sm font-semibold">Minutes</p><p className="fontc text-5xl font-bold">{remainingMinutes}</p>
            </div><p className="text-red-600 font-bold text-2xl mt-4">:</p>
            <div className="flex flex-col justify-center items-center">
                <p className="ubuntu text-sm font-semibold">Seconds</p><p className="fontc text-5xl font-bold">{remainingSeconds}</p>
            </div>
        </div>;
    }



    const fetchcats = () => {
        try {axiousinstance.get('/cat/cat')
            .then(response => {
                console.log(response.data)
                setcategory(response.data)
            })
            .catch(error => {
                console.log(error)
            })
            
        } catch (error) {
            console.log(error)
            
        }
        


    }





    const fetchlatestproduct = () => {
        try {
            axiousinstance.get('/product/prod')
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
    const addToCartHandler =  async (id) => {
        console.log(id)
        
        try {
            const response = await axiousinstance.get(`/product/id/${id}`);
            const productData = response.data;
            console.log(productData)
            const itemToAdd = {
                id: productData._id,
                name: productData.name,
                price: productData.discount || productData.price,
                variations: {},
                quantity: 1,
                currency: productData.currency,  // Add currency
                mainImgSrc: productData.mainImgSrc,
                
              };
              //setSelectedVariations({});
          
              console.log('Adding to cart:', itemToAdd);
              dispatch(addItemToCart(itemToAdd));
            
    
            
          } catch (error) {
            console.log(error);
          }
       
    
      };

    useEffect(() => {
        fetchlatestproduct();
        fetchcats();





    }, [])
      
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiousinstance.get('/cat/newcat');
                console.log(response.data); // Ensure response data structure matches expectations

                // Assuming response.data is an array of exactly four objects
                if (response.data.length >= 1) {
                    setFirstCategory(response.data[0]);
                }
                if (response.data.length >= 2) {
                    setSecondCategory(response.data[1]);
                }
                if (response.data.length >= 3) {
                    setThirdCategory(response.data[2]);
                }
                if (response.data.length >= 4) {
                    setFourthCategory(response.data[3]);
                }

                // Optionally, set the entire array
                setNewCategory(response.data);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);






    useEffect(() => {

        // Calculate remaining time until 3 PM
        const timer = setInterval(() => {
            setRemainingTime(calculateRemainingTime());
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval on unmount
    }, []); // Run only once after component mount


    const PercentageCalculator = (part, total) => {
        const percentage = ((part / total) * 100).toFixed(0);
        return percentage
    }



    return (
        <div className="min-h-screen">
          



            {/* FIRST SECTION SLIDER AND CATEGORIES */}

            <div className="flex justify-around items-start">




                <div className=" mt-10 w-[50vw]">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active h-[50vh]" style={{ backgroundImage: "url(/s1.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>

                            </div>
                            <div className="carousel-item h-[50vh]" style={{ backgroundImage: "url(/s2.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>
                            </div>
                            <div className="carousel-item h-[50vh]" style={{ backgroundImage: "url(/s3.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>
                            </div>
                        </div>

                    </div>

                </div>
                <div id="sidebar" className=" w-[25vw] border-l-2 border-l-slate-100">
                    <ul className="mt-8 pl-10 gap-3 flex flex-col justify-center items-start mb-5">
                        {category.map(cats => (
                            <Link className="outline-none" key={cats._id} to={`/catalog/?cat=${cats.cat}`}>  <li className="text-m ubuntu text-black font-semibold">{cats.cat}</li></Link>

                        ))}

                    </ul>
                </div>
            </div>


            {/* SECOND SECTION TIMER */}


            <div className="flex flex-col justify-around mt-9   ">


                <div className="flex pl-20 pr-20 justify-between items-center mb-16">
                    <div className="flex justify-center items-center">

                        <p className="fontp text-2xl font-extrabold">Same Day Delivery</p>
                        <div className="pl-5">{remainingTime}</div></div>



                </div>

                <div className="flex justify-between items-center w-full pl-20 pr-20">
                    <div className="flex justify-between items-center">
                        <div className="color flex justify-center items-center bg-red-600 w-[2vw] h-[7vh] rounded-sm"></div>
                        <div className="h-[7vh] mt-2 flex justify-center items-start"><p className="font-bold fontp text-red-600 pl-2 ">Latest Products</p></div>

                    </div>

                    <div className="flex gap-3">
                        <div className="bg-slate-300 cursor-pointer rounded-full pr-2 pl-2 pb-1 pt-1" onClick={scrolleft}><i className="fa-solid fa-less-than text-lg font-semibold text-gray-600"></i></div>
                        <div className="bg-slate-300 cursor-pointer rounded-full pr-2 pl-2 pb-1 pt-1" onClick={scrollright}><i className="fa-solid fa-greater-than text-lg font-semibold text-gray-600"></i></div>

                    </div>



                </div>


            </div>



            {/* THIRD SECTION PRODUCT COUROSAL */}
            <div ref={prodref} className="flex mt-14 gap-20 justify-evenly items-start overflow-x-hidden pl-20 pr-20">
                {latestproducts.map((product, index) => (
                    <div key={product._id} className="min-w-[18vw] flex flex-col   ">
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
                                :(<><button onClick={()=> addToCartHandler(product._id)} className="text-white   font-semibold text-md">ADD TO CART</button></>) }
                                

                            </div>

                        </div>
                        <div className="mt-2 flex flex-col justify-center h-32">
                            <Link className="deco" to={`/product/mainproduct/${product._id}`}><p className="text-md fontp font-bold">{product.name.substring(0, 50)}</p></Link>
                            <div className="flex gap-4  justify-start">
                                {product.discount ? (<p className="text-lg line-through text-red-600 font-semibold">{product.currency}{product.price}</p>) :
                                    (<p className="text-lg  text-red-600 font-semibold">{product.currency}{product.price}</p>)}
                                {product.discount && <p className="text-lg text-gray-900 font-semibold">{product.currency}{product.discount}</p>}

                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="flex w-full mb-6 pl-20 pr-20 justify-center items-center"><Link to='/catalog'><p className=" text-white text-lg font-semibold flex pl-3 pr-3 pt-2 pb-2 rounded-sm bg-red-500">See All products</p></Link></div>

            <div className="flex w-full justify-center items-center"><hr className="w-[90%] border-gray-300 " /></div>

            {/*    FOURTH SECTION  CATEGORIES  */}


            <div className="flex w-full mt-14 mb-8 justify-between items-center pl-20 pr-20">


                <div className="flex justify-between items-center">
                    <div className="color flex justify-center items-center bg-red-600 w-[2vw] h-[7vh] rounded-sm"></div>
                    <div className="h-[7vh] mt-2 flex justify-center items-start"><p className="font-bold fontp text-red-600 pl-2 ">Latest Products</p></div>

                </div>




                <div className="flex gap-3">
                    <div className="bg-slate-300 cursor-pointer rounded-full pr-2 pl-2 pb-1 pt-1" onClick={scrolleft2}><i className="fa-solid fa-less-than text-lg font-semibold text-gray-600"></i></div>
                    <div className="bg-slate-300 cursor-pointer rounded-full pr-2 pl-2 pb-1 pt-1" onClick={scrollright2}><i className="fa-solid fa-greater-than text-lg font-semibold text-gray-600"></i></div>

                </div>


            </div>


            <div ref={catref} className="flex mb-12 gap-14 justify-around items-center pr-20 pl-20 w-full overflow-x-hidden">
                {category.map((cat) => (
                    <Link className="hover:decoration-none text-slate-900 ubuntu font-semibold" key={cat._id} to={`/catalog/?cat=${cat.cat}`} >
                        <div className="flex pt-3 justify-between items-center flex-col min-w-[16vw] h-[29vh] border-2 border-black"  >
                            <img src={`${cat.cat}.png`} width="100px" alt={cat.cat} />

                            <p>{cat.cat}</p>
                        </div>
                    </Link>
                ))}
            </div>


            {/*            Fift   section ALL PRODUCTS              */}

            <div className="flex flex-col justify-around mt-9   ">




                <div className="flex justify-between items-center w-full pl-20 pr-20">
                    <div className="flex justify-between items-center mt-5">
                        <div className="color flex justify-center items-center bg-red-600 w-[2vw] h-[7vh] rounded-sm"></div>
                        <div className="h-[7vh] mt-2 flex justify-center items-start"><p className="font-bold fontp text-red-600 pl-2 ">Ours Products</p></div>


                    </div>






                </div>


            </div>


            <div className="pl-20 mt-4 pr-20"><p className="font-extrabold text-slate-900 text-3xl fontc">Explore ALL Products</p></div>

            <div className="flex flex-wrap mt-14 gap-6 justify-evenly items-start pl-20 pr-20">
                {latestproducts.map((product, index) => (
                    <div key={product._id} className="min-w-[18vw]  max-w-[18vw] flex flex-col   ">
                        <div onMouseEnter={() => displayBtn(index)}
                            onMouseLeave={() => hideBtn(index)} className="w-full max-h-[40vh] flex justify-between flex-col h-64 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${product.mainImgSrc})`, backgroundPosition: "center" }}>
                            <div className="flex justify-between p-3">
                                <div className="flex justify-start items-start">
                                    {product.discount && <p className="bg-red-500 rounded-md p-1 text-sm text-white ubuntu">{PercentageCalculator(product.discount, product.price)}% -OFF</p>}


                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="bg-slate-200 hover:bg-red-500 pl-2 pr-2 pt-1 pb-1 cursor-pointer rounded-full "><i className="fa-regular hover:text-white fa-heart text-md text-black "></i></div>
                                    <Link to={`/product/mainproduct/${product._id}`}><div className="bg-slate-200 hover:bg-red-500 cursor-pointer pl-2 pr-2 pt-1 pb-1 rounded-full "><i className="fa-regular hover:text-white fa-eye text-md text-black"></i></div></Link>

                                </div>



                            </div>


                            <div ref={cartBtnRefs.current[index]} className="hidden justify-center items-center pt-2 pb-2 w-full bg-gray-800">
                            {product.variations && product.variations.length > 0 ? 
                                (<><button className="text-white   font-semibold text-md"><Link className="dec text-slate-50 hover:text-slate-50" to={`/product/mainproduct/${product._id}`}>SELECT OPTIONS</Link></button></>)
                                :(<><button onClick={()=> addToCartHandler(product._id)} className="text-white   font-semibold text-md">ADD TO CART</button></>) }

                            </div>

                        </div>
                        <div className="mt-2 flex flex-col justify-center h-32">
                            <Link className="deco" to={`/product/mainproduct/${product._id}`}><p className="text-md fontp font-bold">{product.name.substring(0, 50)}</p></Link>
                            <div className="flex gap-4  justify-start">
                                {product.discount ? (<p className="text-lg line-through text-red-600 font-semibold">{product.currency}{product.price}</p>) :
                                    (<p className="text-lg  text-red-600 font-semibold">{product.currency}{product.price}</p>)}
                                {product.discount && <p className="text-lg text-gray-900 font-semibold">{product.currency}{product.discount}</p>}

                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex w-full mb-6 pl-20 pr-20 justify-center items-center"><Link to='/catalog'><p className=" text-white text-lg font-semibold flex pl-3 pr-3 pt-2 pb-2 rounded-sm bg-red-500">See All products</p></Link></div>
            </div>


            {/*                  SECTION SIXTH  NEW ARRIVAL NEW CATEGORIES             */}

            <div className="flex pl-20 pr-20">

                <div className="flex justify-between items-center w-full ">
                    <div className="flex justify-between items-center mt-5">
                        <div className="color flex justify-center items-center bg-red-600 w-[2vw] h-[7vh] rounded-sm"></div>
                        <div className="h-[7vh] mt-2 flex justify-center items-start"><p className="font-bold fontp text-red-600 pl-2 ">Featured</p></div>


                    </div>






                </div>

            </div>
            <div className="pl-20 mt-4 pr-20"><p className="font-extrabold text-slate-900 text-3xl fontc">New Arrival</p></div>
            {firstCategory && <div className="flex pr-20 pl-20 gap-6 w-full h-[95vh] mb-12">
                <div className="flex flex-col p-10 justify-end items-start w-[50%] bg-slate-700" style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${firstCategory && firstCategory.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <p className="font-bold text-slate-50 fontp text-4xl drop-shadow-2xl"> {firstCategory.cat}</p>
                    <p className="font-bold text-slate-50 fontp text-xl drop-shadow-2xl">{firstCategory.tagline}</p>
                    <Link to={`/catalog/?cat=${firstCategory.cat}`}><button className="text-slate-50 ubuntu text-sm underline drop-shadow-5xl">SHOP NOW</button></Link>


                </div>
                <div className="flex w-[50%] flex-col  gap-6  " >

                    <div className="flex h-[50%] flex-col p-10 justify-end items-start bg-gray-500" style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${secondCategory && secondCategory.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <p className="font-bold text-slate-50 fontp text-2xl drop-shadow-2xl"> {secondCategory.cat}</p>
                        <p className="font-bold text-slate-50 fontp text-md drop-shadow-2xl">{secondCategory.tagline}</p>
                        <Link to={`/catalog/?cat=${secondCategory.cat}`}><button className="text-slate-50 ubuntu text-sm underline drop-shadow-5xl">SHOP NOW</button></Link>
                    </div>
                    <div className="flex h-[50%] gap-6 ">
                        <div className="flex w-[50%] flex-col p-3 justify-end items-start bg-red-400" style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${thirdCategory && thirdCategory.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <p className="font-bold text-slate-50 fontp text-lg drop-shadow-2xl"> {thirdCategory.cat}</p>
                            <p className=" text-slate-50 fontp text-md drop-shadow-2xl">{thirdCategory.tagline}</p>
                            <Link to={`/catalog/?cat=${thirdCategory.cat}`}><button className="text-slate-50 ubuntu text-sm underline drop-shadow-5xl">SHOP NOW</button></Link>
                        </div>
                        <div className="flex w-[50%] flex-col p-3 justify-end items-start bg-amber-900" style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${fourthCategory && fourthCategory.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <p className="font-bold text-slate-50 fontp text-lg drop-shadow-2xl"> {fourthCategory.cat}</p>
                            <p className=" text-slate-50 fontp text-md drop-shadow-2xl">{fourthCategory.tagline}</p>
                            <Link to={`/catalog/?cat=${fourthCategory.cat}`}><button className="text-slate-50 ubuntu text-sm underline drop-shadow-5xl">SHOP NOW</button></Link>
                        </div>
                    </div>



                </div>

            </div>}


            {/*                    LAST SECTION FEATURES                        */}


            <div className="flex justify-center gap-28 items-center pr-20 pl-20 h-[50vh]">


                <div className="flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center rounded-full bg-black w-24 h-24 p-2">
                        <div className="flex justify-center items-center rounded-full bg-gray-400 w-full h-full">
                            <img src="truck.png" alt="" width="45px" />
                        </div>
                    </div>

                    <p className=" mt-3 font-bold text-lg">FREE AND FAST DELIVERY</p>
                    <p className="text-md mt-[-15px] font-semibold">Free delivery for all orders over $140</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center rounded-full bg-black w-24 h-24 p-2">
                        <div className="flex justify-center items-center rounded-full bg-gray-400 w-full h-full">
                            <img src="247.png" alt="" width="45px" />
                        </div>
                    </div>
                    <p className=" mt-3 font-bold text-lg">24/7 CUSTOMER SERVER</p>
                    <p className="text-md mt-[-15px] font-semibold">Free 24/7 friendly support</p>
                </div>
                <div className="flex justify-center items-center flex-col">
                    <div className="flex justify-center items-center rounded-full bg-black w-24 h-24 p-2">
                        <div className="flex justify-center items-center rounded-full bg-gray-400 w-full h-full">
                            <img src="tick.png" alt="" width="45px" />
                        </div>
                    </div>
                    <p className=" mt-3 font-bold text-lg">MONEY BACK GARANTEE</p>
                    <p className="text-md mt-[-15px] font-semibold">We return money in 30 days</p>
                </div>
            </div>



















        </div>
    )
}

export default Home
