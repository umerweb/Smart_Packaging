

const OurStory = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600">
          Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
          <br />
          Exclusive has more than 1 million products to offer, growing at a very fast rate. Exclusive offers a diverse assortment in categories ranging from consumer.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center mb-12">
        <div className="text-center p-4">
          <div className="text-2xl font-bold">10.5k</div>
          <div className="text-gray-600">Sellers active our site</div>
        </div>
        <div className="text-center p-4 bg-red-500 text-white rounded-lg">
          <div className="text-2xl font-bold">33k</div>
          <div className="text-gray-100">Monthly Product Sale</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold">45.5k</div>
          <div className="text-gray-600">Customers active in our site</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold">25k</div>
          <div className="text-gray-600">Annual gross sale in our site</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <img src="https://via.placeholder.com/150" alt="Tom Cruise" className="rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-bold">Tom Cruise</h3>
          <p className="text-gray-600">Founder & Chairman</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="text-center">
          <img src="https://via.placeholder.com/150" alt="Emma Watson" className="rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-bold">Emma Watson</h3>
          <p className="text-gray-600">Managing Director</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="text-center">
          <img src="https://via.placeholder.com/150" alt="Will Smith" className="rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-bold">Will Smith</h3>
          <p className="text-gray-600">Product Designer</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-gray-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
