import { MetadataRoute } from 'next';
import { getCourses, getCampaigns, getNewsBlogs } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vnvidhyapeeth.ac.in';

  const staticRoutes = [
    '',
    '/about',
    '/mission',
    '/initiatives',
    '/courses',
    '/impact',
    '/success-stories',
    '/campaigns',
    '/gallery',
    '/news',
    '/blog',
    '/contact',
    '/donate',
    '/privacy-policy',
    '/terms-and-conditions'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  let courseRoutes: MetadataRoute.Sitemap = [];
  try {
    const courses = getCourses({ onlyActive: true });
    courseRoutes = courses.map((c) => ({
      url: `${baseUrl}/courses/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }));
  } catch {}

  let campaignRoutes: MetadataRoute.Sitemap = [];
  try {
    const campaigns = getCampaigns({ onlyActive: true });
    campaignRoutes = campaigns.map((cp) => ({
      url: `${baseUrl}/campaigns/${cp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));
  } catch {}

  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const news = getNewsBlogs({ onlyPublished: true });
    newsRoutes = news.map((n) => ({
      url: `${baseUrl}/news/${n.slug}`,
      lastModified: new Date(n.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {}

  return [...staticRoutes, ...courseRoutes, ...campaignRoutes, ...newsRoutes];
}
