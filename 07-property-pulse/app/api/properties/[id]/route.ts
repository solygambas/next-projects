import connectDB from "@/config/database";
import cloudinary, { getCloudinaryPublicId } from "@/config/cloudinary";
import Property, { PropertyInterface } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

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

// DELETE /api/properties/[id]
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id: propertyId } = params;
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById({
      _id: propertyId,
    });
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }

    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const deletionPromises = property.images.map(async (url: string) => {
      const publicId = getCloudinaryPublicId(url);
      console.log("Deleting image", publicId);
      return cloudinary.uploader.destroy(publicId);
    });
    await Promise.all(deletionPromises);
    await property.deleteOne();

    return new Response("Property deleted", {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};
