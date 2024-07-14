import { useForm } from "react-hook-form";

import axiosInstance from "../axious"; // Corrected axios import
import { useEffect, useState } from "react";

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [mainimg, setMainImg] = useState(null);
  const [mainImgSrc, setMainImgSrc] = useState('');
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [variations, setVariations] = useState([{ name: "", values: "" }]);
  const [showVariations, setShowVariations] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/cat/cat');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  const addVariation = () => {
    setVariations([...variations, { name: "", values: "" }]);
  };

  const removeVariation = (index) => {
    const updatedVariations = variations.filter((_, i) => i !== index);
    setVariations(updatedVariations);
  };

  const sendMainImage = async () => {
    if (!mainimg) return;

    setIsImageUploading(true);
    const CLOUD_NAME = 'deesnueub';
    const data = new FormData();
    data.append("file", mainimg);
    data.append("upload_preset", "ml_default");

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data
      });
      const responseData = await response.json();
      setMainImgSrc(responseData.secure_url);
      setIsImageUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsImageUploading(false);
    }
  }

  const sendImages = async () => {
    if (images.length === 0) return;

    setIsUploading(true);
    const CLOUD_NAME = 'deesnueub';
    const uploadedUrls = [];

    for (let img of images) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "ml_default");

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "post",
          body: data
        });
        const responseData = await response.json();
        uploadedUrls.push(responseData.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    setImageUrls(uploadedUrls);
    setIsUploading(false);
  }

  const onSubmit = async (formData) => {
    formData.mainImgSrc = mainImgSrc;
    formData.imageUrls = imageUrls;
    formData.variations = showVariations ? variations : null;
    try {
      console.log(formData)
      const response = await axiosInstance.post('/product/', formData);
      console.log('Product added:', response.data);
      reset();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="min-h-screen pt-10 pb-10 flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl p-10 bg-white shadow-xl rounded-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Add Product</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Product Name"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Short Description"
              type="text"
              {...register("shortdesc", { required: true })}
            />
            {errors.shortdesc && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <textarea
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Detailed Description"
              rows="4"
              {...register("longdesc", { required: true })}
            />
            {errors.longdesc && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <select
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              {...register("category", { required: true })}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.cat}>{cat.cat}</option>
              ))}
            </select>
            {errors.category && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Price"
              type="number"
              {...register("price", { required: true })}
            />
            </div>
             <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Discount Price  (If have Any)"
              type="number"
              {...register("discount", { required: true })}
            />
           
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Currency"
              type="text"
              {...register("currency", { required: true })}
            />
            {errors.currency && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Inventory"
              type="number"
              {...register("sku", { required: true })}
            />
            {errors.sku && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Size"
              type="text"
              {...register("size", { required: true })}
            />
            {errors.size && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Color"
              type="text"
              {...register("color", { required: true })}
            />
            {errors.color && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <label className="font-semibold text-gray-700" htmlFor="mainimgh">Add Featured Image</label>
            <input
              className="py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              type="file"
              id="mainimgh"
              accept="image/*"
              onChange={(e) => setMainImg(e.target.files[0])}
            />
            {mainImgSrc && <img src={mainImgSrc} alt="Featured" className="mt-2 w-32 h-32 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110" />}
            <button
              type="button"
              onClick={sendMainImage}
              disabled={isImageUploading}
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-opacity duration-300 ease-in-out ${
                isImageUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isImageUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages((prevImages) => [...prevImages, ...Array.from(e.target.files)])}
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.from(images).map((img, index) => (
                  <img key={index} src={URL.createObjectURL(img)} alt={`Image ${index}`} className="w-32 h-32 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110" />
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={sendImages}
              disabled={isUploading}
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-opacity duration-300 ease-in-out ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={showVariations}
                onChange={(e) => setShowVariations(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Add Variations</span>
            </label>
          </div>
          {showVariations && variations.map((variation, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Variation Name"
                value={variation.name}
                onChange={(e) => handleVariationChange(index, "name", e.target.value)}
                className="py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              />
              <input
                type="text"
                placeholder="Variation Values (comma-separated)"
                value={variation.values}
                onChange={(e) => handleVariationChange(index, "values", e.target.value)}
                className="py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              />
              <button
                type="button"
                onClick={() => removeVariation(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Remove
              </button>
            </div>
          ))}
          {showVariations && (
            <button
              type="button"
              onClick={addVariation}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              Add Variation
            </button>
          )}
          <div className="mt-6">
            <button
              type="submit"
              disabled={!mainImgSrc || isImageUploading}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
