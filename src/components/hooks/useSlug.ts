import { LINKS_URL } from '@/lib/constants';
import { useConfig } from '@/components/hooks/useConfig';

export function useSlug() {
  const { linksUrl } = useConfig();
  const hostUrl = linksUrl || LINKS_URL;
  const getSlugUrl = (slug: string) => `${hostUrl}/${slug}`;
  return { getSlugUrl, hostUrl };
}