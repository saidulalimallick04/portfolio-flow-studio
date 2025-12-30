import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://saidulalimallick.studio';

    // Core routes of the portfolio
    const routes = [
        '',
        '/projects',
        '/skills',
        '/journey',
        '/hobbies',
        '/collaborators',
        '/studio',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
