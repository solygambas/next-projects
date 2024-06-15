"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { PropertyInterface } from "@/models/Property";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSavedProperties = async () => {
      try {
        const response = await fetch("/api/bookmarks");
        if (response.status === 200) {
          const data = await response.json();
          setProperties(data);
        } else {
          toast.error("An error occurred");
          console.log(response.statusText);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    getSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Saved Properties</h1>
        {properties.length === 0 ? (
          <div>No saved properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
