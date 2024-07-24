/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // MONGO_URI: "mongodb://127.0.0.1:27017/notes_app",
        MONGO_URI: "mongodb+srv://blood:efPZmIYIXRfore91@cluster0.vt6amux.mongodb.net",
      
        CLOUDINARY_NAME: "dgwnrl7vm",
        CLOUDINARY_API_KEY: "669376454836991",
        CLOUDINARY_API_SECRET: "WhPq17xm47e7UXR2DN1P_ugnnIY",

        NEXTAUTH_SECRET: "!(@__)(hbdk@$@sr#*&^&^hg47bkjfldjsjhhSDF8fnsj9!",
        SECRET_KEY: "eefeijfksk@$@sr#*&^&jhfuhudhfudd",
        JWT_SECRET: "Xol2/+e4EBJHQAfMObH8FJDNFB68H*lS52/92o=",
        JWT_EXPIRE: "1d",

        NEXTAUTH_URL: "http://localhost:3000",
        FORONT_URL: "http://localhost:3000",
        BACKEND_URL: "http://localhost:3000",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
