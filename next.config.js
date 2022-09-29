/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
  images: {
    domains: ["avatars.githubusercontent.com", "links.papareact.com", "fakestoreapi.com", "amazon-clone-psi-eight.vercel.app"]
  }
}
