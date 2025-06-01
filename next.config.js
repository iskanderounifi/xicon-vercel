/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      // ajoutez d'autres domaines externes si besoin
    ],
  },
};

module.exports = nextConfig;