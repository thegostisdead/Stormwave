export default () => ({
  endPoint: process.env.BUCKET_ENDPOINT,
  bucketPort: process.env.BUCKET_PORT,
  accessKey: process.env.BUCKET_ACCESS_KEY,
  secretKey: process.env.BUCKET_SECRET_KEY,
  rootDir: process.env.CORE_ROOT_DIR,
});