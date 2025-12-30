import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Saidul Ali Mallick - Portfolio Flow Studio',
        short_name: 'Sami - Flow',
        description: 'Portfolio of Saidul Ali Mallick - Backend Sage & Creative Developer',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0a', // Matches dark mode background
        theme_color: '#0a0a0a',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '48x48',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ]
    };
}
