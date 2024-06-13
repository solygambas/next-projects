import { ObjectId } from "bson";
import connectDB from "@/config/database";
import cloudinary, { getCloudinaryPublicId } from "@/config/cloudinary";
import Property, {
  PropertyInterface,
  PropertyAPIInterface,
} from "@/models/Property";
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

// PUT /api/properties/[id]
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { id } = params;
    const { userId } = sessionUser;
    const formData = await req.formData();
    const amenities = formData.getAll("amenities");

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const propertyData: PropertyAPIInterface = {
      type: formData.get("type") as PropertyAPIInterface["type"],
      name: formData.get("name") as PropertyAPIInterface["name"],
      description: formData.get(
        "description"
      ) as PropertyAPIInterface["description"],
      location: {
        street: formData.get(
          "location.street"
        ) as PropertyAPIInterface["location"]["street"],
        city: formData.get(
          "location.city"
        ) as PropertyAPIInterface["location"]["city"],
        state: formData.get(
          "location.state"
        ) as PropertyAPIInterface["location"]["state"],
        zipcode: formData.get(
          "location.zipcode"
        ) as PropertyAPIInterface["location"]["zipcode"],
      },
      beds: parseInt(formData.get("beds") as string, 10),
      baths: parseInt(formData.get("baths") as string, 10),
      square_feet: parseInt(formData.get("square_feet") as string, 10),
      amenities: amenities as string[],
      rates: {
        weekly: parseInt(formData.get("rates.weekly") as string, 10),
        monthly: parseInt(formData.get("rates.monthly") as string, 10),
        nightly: parseInt(formData.get("rates.nightly") as string, 10),
      },
      seller_info: {
        name: formData.get(
          "seller_info.name"
        ) as PropertyAPIInterface["seller_info"]["name"],
        email: formData.get(
          "seller_info.email"
        ) as PropertyAPIInterface["seller_info"]["email"],
        phone: formData.get(
          "seller_info.phone"
        ) as PropertyAPIInterface["seller_info"]["phone"],
      },
      owner: new ObjectId(userId),
      images: existingProperty.images,
      is_featured: false,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
  }
};
