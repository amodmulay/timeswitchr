import { MetadataRoute } from 'next'
import { COMMON_TIMEZONES } from '@/lib/time'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://timeswitchr.com'
    const now = new Date()

    // Base routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1,
        },
    ]

    // Generate popular conversion routes (e.g., IST to CET)
    const popularLabels = ['ist', 'cet', 'et', 'pt', 'gmt', 'utc', 'jst']

    popularLabels.forEach(from => {
        popularLabels.forEach(to => {
            if (from !== to) {
                routes.push({
                    url: `${baseUrl}/${from}-to-${to}`,
                    lastModified: now,
                    changeFrequency: 'weekly' as const,
                    priority: 0.8,
                })
            }
        })
    })

    // Add some city-specific ones
    const popularCities = ['london', 'mumbai', 'new-york', 'berlin', 'tokyo', 'dubai']
    popularCities.forEach(from => {
        popularCities.forEach(to => {
            if (from !== to) {
                routes.push({
                    url: `${baseUrl}/${from}-to-${to}`,
                    lastModified: now,
                    changeFrequency: 'weekly' as const,
                    priority: 0.6,
                })
            }
        })
    })

    return routes
}
