// Function to upload an image to Cloudinary
export async function uploadToCloudinary(imageFile: any) {
  //   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dpng3cvkp/image/upload`;
  const apiKey = `${process.env.CLOUDINARY_API_KEY}`;
  const apiSecret = `${process.env.CLOUDINARY_API_SECRET}`;

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Image uploaded successfully:", result);
      return result; // This is the URL of the uploaded image
    } else {
      console.error("Image upload failed:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

// Example usage:
