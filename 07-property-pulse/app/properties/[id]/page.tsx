"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { PropertyInterface } from "@/models/Property";

export default function PropertyPage() {
  const { id }: { id: string } = useParams();
  const [property, setProperty] = useState<PropertyInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property: PropertyInterface = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) fetchPropertyData();
  }, [id, property]);

  if (!property && !loading)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to
                Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                    <div className="text-gray-500 mb-4">Apartment</div>
                    <h1 className="text-3xl font-bold mb-4">
                      Boston Commons Retreat
                    </h1>
                    <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                      <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                      <p className="text-orange-700">
                        120 Tremont Street Boston, MA 02111
                      </p>
                    </div>

                    <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                      Rates & Options
                    </h3>
                    <div className="flex flex-col md:flex-row justify-around">
                      <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">
                          Nightly
                        </div>
                        <div className="text-2xl font-bold">
                          <i className="fa fa-xmark text-red-700"></i>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">
                          Weekly
                        </div>
                        <div className="text-2xl font-bold text-blue-500">
                          $1,100
                        </div>
                      </div>
                      <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
                        <div className="text-gray-500 mr-2 font-bold">
                          Monthly
                        </div>
                        <div className="text-2xl font-bold text-blue-500">
                          $4,200
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-lg font-bold mb-6">
                      Description & Details
                    </h3>
                    <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                      <p>
                        <i className="fa-solid fa-bed"></i> 3
                        <span className="hidden sm:inline">Beds</span>
                      </p>
                      <p>
                        <i className="fa-solid fa-bath"></i> 2
                        <span className="hidden sm:inline">Baths</span>
                      </p>
                      <p>
                        <i className="fa-solid fa-ruler-combined"></i>
                        1,500 <span className="hidden sm:inline">sqft</span>
                      </p>
                    </div>
                    <p className="text-gray-500 mb-4">
                      This is a beautiful apartment located near the commons
                    </p>
                    <p className="text-gray-500 mb-4">
                      We have a beautiful apartment located near the commons. It
                      is a 2 bedroom apartment with a full kitchen and bathroom.
                      It is available for weekly or monthly rentals.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-lg font-bold mb-6">Amenities</h3>

                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>{" "}
                        Wifi
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Full kitchen
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Washer & Dryer
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Free Parking
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Hot Tub
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        24/7 Security
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Wheelchair Accessible
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Elevator Access
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Dishwasher
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Gym/Fitness Center
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Air Conditioning
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Balcony/Patio
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Smart TV
                      </li>
                      <li>
                        <i className="fas fa-check text-green-600 mr-2 mt-3"></i>
                        Coffee Maker
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <div id="map"></div>
                  </div>
                </main>

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-bookmark mr-2"></i> Bookmark Property
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                    <i className="fas fa-share mr-2"></i> Share Property
                  </button>

                  {/* <!-- Contact Form --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact Property Manager
                    </h3>
                    <form>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="phone"
                          type="text"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                          id="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                          type="submit"
                        >
                          <i className="fas fa-paper-plane mr-2"></i> Send
                          Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
