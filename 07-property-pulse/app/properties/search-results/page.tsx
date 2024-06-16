"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyInterface } from "@/models/Property";

const SearchResultsPage = () => {
  const [properties, setProperties] = useState<PropertyInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (response.status === 200) {
          const data: PropertyInterface[] = await response.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [location, propertyType]);

  return <div>SearchResultsPage</div>;
};
export default SearchResultsPage;
