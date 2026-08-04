/** Next.js Image remotePatterns — hostname allowlist для next/image */
const ImageRemotePatternsCustom = [
    { protocol: 'http', hostname: '{{ host }}', pathname: '**' },
    { protocol: 'https', hostname: '{{ host }}', pathname: '**' },
];

module.exports = { ImageRemotePatterns: ImageRemotePatternsCustom };
