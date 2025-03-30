/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        domains: ['api.aalyans74.ru', 'er.ru'],
    },
    experimental: {
        optimizeCss: true,
    },
    compiler: {
        styledComponents: true, // Если используешь styled-components
      },
};

export default nextConfig;
