import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description?: string;
  noindex?: boolean;
  canonicalPath?: string;
}

const SITE_ORIGIN = "https://mindwareconsult.com.ng";

export function SEO({ title, description, noindex = false, canonicalPath }: SEOProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const effectivePath = canonicalPath || pathname;
    const canonicalUrl = `${SITE_ORIGIN}${effectivePath === "/" ? "/" : effectivePath}`;

    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
  }, [title, description, noindex, canonicalPath, pathname]);

  return null;
}
