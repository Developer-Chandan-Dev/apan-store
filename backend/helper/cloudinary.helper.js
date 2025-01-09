const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../service/uploadToCloudinary.service");

const handleImageUpload = async (data, newImagePath, name, folderName) => {
  console.log(data, newImagePath, name, folderName, '7');
  if (newImagePath) {
    console.log(data, newImagePath, name, folderName, '9');
    // Delete the old image from Cloudinary if it exists
    if (data.imageUrlPublicId) {
      await deleteFromCloudinary(data.imageUrlPublicId);
    }

    // Upload the new image to the specified folder in Cloudinary
    const uploadResult = await uploadToCloudinary(
      newImagePath,
      folderName, // Folder name is dynamic
      `${folderName}/${name}_${Date.now()}` // Include folder name in the path
    );

    return {
      imageUrl: uploadResult.secure_url,
      imageUrlPublicId: uploadResult.public_id,
    };
  }

  // If no new image is provided, return the existing image details
  return {
    imageUrl: data.imageUrl,
    imageUrlPublicId: data.imageUrlPublicId,
  };
};

const safelyDeleteFromCloudinary = async (publicId) => {
  try {
    if (publicId) {
      await deleteFromCloudinary(publicId);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Cloudinary deletion failed");
  }
};

module.exports = { handleImageUpload, safelyDeleteFromCloudinary };
