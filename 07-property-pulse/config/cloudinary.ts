import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinaryPublicId = (url: string) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts
    .slice(parts.indexOf("propertypulse"))
    .join("/");
  const [publicId] = publicIdWithExtension.split(".");
  return publicId;
};

export default cloudinary;
