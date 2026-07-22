if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET ||
  !process.env.CLOUDINARY_API_ENVIRONMENT_VARIABLE 
) {
  throw new Error("Variáveis do Firebase não configuradas.");
}

export default {
  cloudinaryConfig: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    apiEnvironmentVariable: process.env.CLOUDINARY_API_ENVIRONMENT_VARIABLE
  },
};