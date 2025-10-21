import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NODE_ENV !== 'production';

// A reasonably strict default CSP. Tweak as needed for external APIs, CDNs or
// third-party integrations. In development we enable report-only mode and
// allow 'unsafe-eval'/'unsafe-inline' to avoid breaking the dev tools.
const csp = [
  "default-src 'self'",
  `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ''}`,
  `style-src 'self' ${
    isDev ? "'unsafe-inline'" : ''
  } https://fonts.googleapis.com`,
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https: ws:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

if (isDev) {
  // Avoid blocking development tools — use report-only to discover violations.
  securityHeaders.push({
    key: 'Content-Security-Policy-Report-Only',
    value: csp,
  });
} else {
  // Enforce CSP in production and enable HSTS.
  securityHeaders.push({ key: 'Content-Security-Policy', value: csp });
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  });
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in the application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
