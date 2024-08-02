import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const [subs, setsubs] = useState('');

    const handlechange = (e) => {
        setsubs(e.target.value);
    }

    const currentYear = new Date().getFullYear();
    return (
        <div className="-mb-20">
            <div className="flex flex-col justify-center items-center min-h-[65vh] bg-slate-950 px-4 md:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-around items-start w-full gap-8 md:gap-16">

                    <div className="flex flex-col gap-4">
                        <p className="fontp text-2xl font-bold text-white">Exclusive</p>
                        <p className="ubuntu text-lg font-normal text-white">Subscribe</p>
                        <p className="fontp text-sm text-white">Get 10% your first Order</p>
                        <div className="searchbar2 flex items-center gap-2">
                            <input 
                                type="email"
                                onChange={handlechange}
                                value={subs}
                                placeholder="Enter Your Email"
                                className="p-2 border-none rounded-md" // Preserve your design here
                            />
                            <i className="fa-regular fa-paper-plane text-slate-300 text-lg cursor-pointer"></i>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="fontp text-2xl font-bold text-white">Support</p>
                        <p className="fontp text-sm text-white">Myntgatan 7, Skelleftea, 931 48 <br /> Northern Norrland, Sweden</p>
                        <p className="fontp text-sm text-white">info@smartpackaging.com</p>
                        <p className="fontp text-sm text-white">+9992 90902 8292 2920</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="fontp text-2xl font-bold text-white">Account</p>
                        <Link to=""> <p className="fontp text-md text-white">Account</p></Link>
                        <Link to=""> <p className="fontp text-md text-white">Login/Register </p></Link>
                        <Link to=""> <p className="fontp text-md text-white">Cart</p></Link>
                        <Link to=""> <p className="fontp text-md text-white">Shop</p></Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="fontp text-2xl font-bold text-white">Quick Links</p>
                        <Link to=""> <p className="fontp text-md text-white">Privacy Policy</p></Link>
                        <Link to=""> <p className="fontp text-md text-white">Terms of use </p></Link>
                        <Link to=""> <p className="fontp text-md text-white">FAQs</p></Link>
                        <Link to=""> <p className="fontp text-md text-white">Contact</p></Link>
                        <Link to=""> <p className="fontp text-md text-white">About</p></Link>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <p className="fontp text-2xl font-bold text-white text-center">Download App</p>
                        <p className="fontp text-sm text-gray-400 text-center">Save $3 with App new user only</p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                            <img src="qr.png" className="w-24" alt="" />
                            <div className="flex flex-col items-center">
                                <img src="google.png" className="w-40" alt="" />
                                <img src="appstore.png" alt="" className="w-40" />
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <img src="fb.png" alt="" className="w-9" />
                            <i className="fa-brands fa-instagram text-white text-3xl"></i>
                            <img src="twit.png" alt="" className="w-9" />
                            <i className="fa-brands fa-linkedin-in text-white text-3xl"></i>
                        </div>
                    </div>

                </div>
            </div>
            <p className="text-gray-500 text-center bg-slate-950 pb-12"> &copy; {currentYear} Smart Packaging. All rights reserved.</p>
        </div>
    )
}

export default Footer;
