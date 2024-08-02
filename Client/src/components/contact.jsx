
import { useForm } from 'react-hook-form';

const ContactSection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="flex items-center mb-4">
            <div className="text-red-500 text-2xl mr-4">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Call To Us</h3>
              <p className="text-gray-600">We are available 24/7, 7 days a week.</p>
              <p className="text-gray-600">Phone: +8801611112222</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex items-center mt-4">
            <div className="text-red-500 text-2xl mr-4">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Write To Us</h3>
              <p className="text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-gray-600">Emails: customer@exclusive.com</p>
              <p className="text-gray-600">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  {...register('name', { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Your Name *"
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <input
                  {...register('email', { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Your Email *"
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <input
                  {...register('phone', { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Your Phone *"
                />
                {errors.phone && <span className="text-red-500">This field is required</span>}
              </div>
            </div>
            <div className="mb-4">
              <textarea
                {...register('message', { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Your Message"
                rows="4"
              ></textarea>
              {errors.message && <span className="text-red-500">This field is required</span>}
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
