module.exports = {
  // https://github.com/vercel/next.js/issues/30347#issuecomment-953959581
  // to fix build error SyntaxError: Named export 'createContext' not found.
  // The requested module 'react' is a CommonJS module, which may not support
  // all module.exports as named exports.
  // TODO: Remove once fixed in future release
  outputFileTracing: false,
  future: {
    strictPostcssConfiguration: true
  },
  reactStrictMode: true,
  experimental: {
    turboMode: true,
    eslint: true
  },
  images: {
    domains: ["images.unsplash.com"]
  }
};
