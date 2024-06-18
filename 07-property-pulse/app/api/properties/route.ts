import connectDB from "@/config/database";
import cloudinary from "@/config/cloudinary";
import { NextRequest } from "next/server";
import { ObjectId } from "bson";
import Property, {
  PaginatedProperties,
  PropertyAPIInterface,
  PropertyInterface,
} from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties
export const GET = async (req: NextRequest, res: Response) => {
  try {
    await connectDB();
    const page =
      parseInt(req.nextUrl.searchParams.get("page") as string, 10) || 1;
    const pageSize =
      parseInt(req.nextUrl.searchParams.get("pageSize") as string, 10) || 6;
    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const properties: PropertyInterface[] = await Property.find({})
      .skip(skip)
      .limit(pageSize);
    const result: PaginatedProperties = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new Response("An error occurred", { status: 500 });
  }
};

// POST /api/properties
export const POST = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { userId } = sessionUser;
    const formData = await req.formData();
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter(
        (image): image is File => image instanceof File && image.name !== ""
      );

    const imageUploadPromises = [];
    let uploadedImages: string[] = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        }
      );
      imageUploadPromises.push(result.secure_url);

      uploadedImages = await Promise.all(imageUploadPromises);
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
      images: uploadedImages,
      is_featured: false,
    };

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
  }
};
