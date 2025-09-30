/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['api.aalyans74.ru', 'aalyans74.ru', 'api.aalyans.ru', 'aalyans.ru'],
    }
};

export default nextConfig;
