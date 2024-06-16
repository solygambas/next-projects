import connectDB from "@/config/database";
import Property from "@/models/Property";

interface QueryInterface {
  $or?: Array<{
    name?: RegExp;
    description?: RegExp;
    "location.street"?: RegExp;
    "location.city"?: RegExp;
    "location.state"?: RegExp;
    "location.zipcode"?: RegExp;
  }>;
  type?: RegExp;
}

// GET /api/properties/search
export const GET = async (request: Request, response: Response) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    let query: QueryInterface = {};
    if (location) {
      const locationPattern = new RegExp(location, "i");
      query = {
        $or: [
          { name: locationPattern },
          { description: locationPattern },
          { "location.street": locationPattern },
          { "location.city": locationPattern },
          { "location.state": locationPattern },
          { "location.zipcode": locationPattern },
        ],
      };
    }
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
