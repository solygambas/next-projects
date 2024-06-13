import connectDB from "@/config/database";
import Property, {
  PropertyAPIInterface,
  PropertyInterface,
} from "@/models/Property";

// GET /api/properties/user/[userId]
export const GET = async (
  req: Request,
  { params }: { params: { userId: string } },
  res: Response
) => {
  try {
    await connectDB();
    const { userId } = params;
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }
    const properties: PropertyInterface[] = await Property.find({
      owner: userId,
    });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};
