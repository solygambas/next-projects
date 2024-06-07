import connectDB from "@/config/database";
import Property, { PropertyInterface } from "@/models/Property";

// GET /api/properties
export const GET = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const properties: PropertyInterface[] = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};
