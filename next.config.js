/** @type {import('next').NextConfig} */
const nextConfig = {
  "experimental": {
    "serverActions": true,
    "serverActionsBodySizeLimit": "3mb"
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [{ key: "Cache-Control", value: "no-cache" }]
      }
    ];
  }
};

module.exports = nextConfig;