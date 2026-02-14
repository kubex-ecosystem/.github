import { Article } from '../types';

/**
 * Fetches the latest articles from DEV.to for a specific username.
 * 
 * @param username The DEV.to username to fetch articles for.
 * @param limit The maximum number of articles to return.
 * @returns A promise that resolves to an array of Article objects.
 */
export async function getLatestArticles(username: string = 'faelmori', limit: number = 4): Promise<Article[]> {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}&per_page=${limit}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch articles from DEV.to:', response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching articles from DEV.to:', error);
    return [];
  }
}
