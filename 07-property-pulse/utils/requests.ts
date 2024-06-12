const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch properties from the API
export async function fetchProperties() {
  try {
    if (!apiDomain) return [];
    const response = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch a single property from the API
export async function fetchProperty(id: string) {
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
