import { PaginatedProperties, PropertyInterface } from "@/models/Property";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

type FetchPropertiesParams = {
  showFeatured?: boolean;
};

// Fetch properties from the API
export async function fetchProperties({
  showFeatured = false,
}: FetchPropertiesParams = {}) {
  try {
    if (!apiDomain) return showFeatured ? [] : { properties: [], total: 0 };
    const response = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.log(error);
    return showFeatured ? [] : { properties: [], total: 0 };
  }
}

// Fetch a single property from the API
export async function fetchProperty(
  id: string
): Promise<PropertyInterface | null> {
  try {
    if (!apiDomain) return null;
    const response = await fetch(`${apiDomain}/properties/${id}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
