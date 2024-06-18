import connectDB from "@/config/database";
import { NextRequest } from "next/server";
import Property, { PropertyInterface } from "@/models/Property";

// GET /api/properties/featured
export const GET = async (req: NextRequest, res: Response) => {
  try {
    await connectDB();

    const properties: PropertyInterface[] = await Property.find({
      is_featured: true,
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};
