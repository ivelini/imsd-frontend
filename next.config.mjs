/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['api.aalyans.ivelini.ru', 'aalyans.ivelini.ru', 'api.aalyans.ru', 'aalyans.ru'],
    }
};

export default nextConfig;
