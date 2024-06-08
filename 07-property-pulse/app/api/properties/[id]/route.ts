import connectDB from "@/config/database";
import Property, { PropertyInterface } from "@/models/Property";

// GET /api/properties/[id]
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const property: PropertyInterface | null = await Property.findById({
      _id: params.id,
    });
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};
