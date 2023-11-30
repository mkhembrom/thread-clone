import axios from "axios";

export async function uploadToCloudinary(imageFile: File) {
  //   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dpng3cvkp/image/upload`;
  const apiKey = `${process.env.CLOUDINARY_API_KEY}`;
  const apiSecret = `${process.env.CLOUDINARY_API_SECRET}`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "ml_default");

  const { data } = await axios.post(cloudinaryUrl, formData);

  return data;
}
