import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});
try {
    const files = await imagekit.listFiles({ limit: 1 });
    console.log("ImageKit is working! Files:");
} catch (error) {
    console.error("ImageKit connection failed:", error);
}
export default imagekit
