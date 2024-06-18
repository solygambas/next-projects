"use client";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import { PropertyInterface, PaginatedProperties } from "@/models/Property";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState<PropertyInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data: PaginatedProperties = await res.json();
        setProperties(data.properties);
        setTotalItems(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <div>No properties found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};
export default Properties;
