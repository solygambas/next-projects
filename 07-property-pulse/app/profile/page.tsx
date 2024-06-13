"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import profileDefault from "@/assets/images/profile.png";

const ProfilePage = () => {
  const { data: session } = useSession();
  const {
    image: profileImage,
    name: profileName,
    email: profileEmail,
  } = session?.user || {};

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <div className="mb-10">
                <a href="/property.html">
                  <img
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/a1.jpg"
                    alt="Property 1"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 1</p>
                  <p className="text-gray-600">Address: 123 Main St</p>
                </div>
                <div className="mt-2">
                  <a
                    href="/add-property.html"
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mb-10">
                <a href="/property.html">
                  <img
                    className="h-32 w-full rounded-md object-cover"
                    src="/images/properties/b1.jpg"
                    alt="Property 2"
                  />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">Property Title 2</p>
                  <p className="text-gray-600">Address: 456 Elm St</p>
                </div>
                <div className="mt-2">
                  <a
                    href="/add-property.html"
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </a>
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
