/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bzbz-file-bucket.s3.ap-northeast-2.amazonaws.com',
      'userimage.bucket.s3.ap-northeast-2.amazonaws.com',
      '*'
    ]
  },
  reactStrictMode: true
};

export default nextConfig;
