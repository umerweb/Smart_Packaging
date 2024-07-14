import { useForm } from "react-hook-form";
import axiosInstance from "../axious"; // Corrected axios import
import { useState } from "react";

const Addcategory = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [mainimg, setMainImg] = useState(null);
  const [img, setimg] = useState('');
  const [isImageUploading, setIsImageUploading] = useState(false);

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
      setimg(responseData.secure_url);
      setIsImageUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsImageUploading(false);
    }
  }

  const onSubmit = async (formData) => {
    formData.img = img;
    try {
      console.log(formData)
      const response = await axiosInstance.post('/cat/', formData);
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
              placeholder="Catgery Name"
              type="text"
              {...register("cat", { required: true })}
            />
            {errors.cat && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div className="border-b-2 border-gray-300 pb-2">
            <input
              className="w-full py-2 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out"
              placeholder="Catgery Tagline"
              type="text"
              {...register("tagline", { required: true })}
            />
            {errors.tagline && <span className="text-red-500 text-sm">Required</span>}
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
            {img && <img src={img} alt="Featured" className="mt-2 w-32 h-32 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110" />}
            <button
              type="button"
              onClick={sendMainImage}
              disabled={isImageUploading}
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-opacity duration-300 ease-in-out ${isImageUploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isImageUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={!img || isImageUploading}
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

export default Addcategory;
