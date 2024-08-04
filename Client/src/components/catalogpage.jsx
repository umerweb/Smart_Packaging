import { useState, useEffect } from "react";
import axiosinstance from '../axious';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();

        const searchParams = new URLSearchParams(location.search);
        const cat = searchParams.get('cat');
        if (cat !== null) {
            setSelectedCategory(cat);
        }
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        axiosinstance.get('/product/productall')
            .then(response => {
                if (response.data && Array.isArray(response.data.product)) {
                    setProducts(response.data.product);
                } else {
                    console.error("Unexpected response format for products:", response.data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]);
                setLoading(false);
            });
    };

    const fetchCategories = () => {
        axiosinstance.get('/cat/catall')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error("Unexpected response format for categories:", response.data);
                    setCategories([]);
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setCategories([]);
            });
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        fetchProducts();
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        fetchProducts();
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        fetchProducts();
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        fetchProducts();
    };

    const filterProducts = () => {
        return products.filter(product => {
            const inCategory = selectedCategory ? product.category === selectedCategory : true;
            const inPriceRange = product.price >= (minPrice || 0) && product.price <= (maxPrice || Infinity);
            const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return inCategory && inPriceRange && matchesSearchTerm;
        });
    };

    return (
        <SkeletonTheme baseColor="#c1c1c1" highlightColor="#828282">
            <div className="flex min-h-screen">
                {/* Sidebar Filters */}
                <div className="w-1/4 p-4 border-r">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Search</h3>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Category</h3>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.cat}>{category.cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Price</h3>
                        <div className="flex space-x-2">
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                placeholder="Min"
                                value={minPrice}
                                onChange={handleMinPriceChange}
                            />
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={handleMaxPriceChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Product List */}
                <div className="w-3/4 p-4 overflow-y-auto relative" style={{ height: 'calc(100vh - 2rem)' }}>
                    {loading ? (
                        <div className="flex flex-col">
                            <div className="flex gap-12 mb-5">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex flex-col">
                                        <Skeleton className="mb-1" width="250px" height="180px" />
                                        <Skeleton width="80px" height="20px" />
                                        <Skeleton width="160px" height="20px" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-12 mb-5">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex flex-col">
                                        <Skeleton className="mb-1" width="250px" height="180px" />
                                        <Skeleton width="80px" height="20px" />
                                        <Skeleton width="160px" height="20px" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold mb-4">Products</h2>
                            <div className="mb-4">
                                <span>Category: {selectedCategory || "All"}</span>,
                                <span> Price: {minPrice || "0"} - {maxPrice || "Any"}</span>,
                                <span> Search: {searchTerm || "None"}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {filterProducts().map(product => (
                                    <div key={product._id} className="border p-4 rounded">
                                        <Link className="dec" to={`/product/mainproduct/${product._id}`}>
                                            <img src={product.mainImgSrc} alt={product.name} className="w-full h-48 object-cover mb-4" />
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <div className="rating flex pr-2 justify-start items-center">
                                                {[...Array(4)].map((_, i) => (
                                                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.545l6.57-.955L10 .525l2.941 6.065 6.571.955-4.756 4.998 1.122 6.545z" />
                                                    </svg>
                                                ))}
                                                <svg className="w-5 h-5 pr-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 7.545l6.57-.955L10 .525l2.941 6.065 6.571.955-4.756 4.998 1.122 6.545z" />
                                                </svg>
                                            </div>
                                            <p className="text-red-600 font-bold">{product.currency}{product.price}</p>
                                            {product.discount && (
                                                <p className="text-sm text-gray-500 line-through">{product.currency}{product.discount}</p>
                                            )}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default ProductPage;
