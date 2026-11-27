import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description?: string;
  noindex?: boolean;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_ORIGIN = "https://mindwareconsult.com.ng";

export function SEO({
  title,
  description,
  noindex = false,
  canonicalPath,
  ogType = "website",
  ogImage,
  ogImageAlt,
  structuredData,
}: SEOProps) {
  const { pathname } = useLocation();
  const serializedStructuredData = structuredData ? JSON.stringify(structuredData) : "";

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

    const removeMeta = (selector: string) => {
      const el = document.querySelector(selector);
      if (el) el.remove();
    };

    setMeta('meta[property="og:type"]', "property", "og:type", ogType);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
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

    if (ogImage) {
      const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_ORIGIN}${ogImage}`;
      setMeta('meta[property="og:image"]', "property", "og:image", absoluteOgImage);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteOgImage);
      if (ogImageAlt) {
        setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", ogImageAlt);
      } else {
        removeMeta('meta[property="og:image:alt"]');
      }
    } else {
      removeMeta('meta[property="og:image"]');
      removeMeta('meta[property="og:image:alt"]');
      removeMeta('meta[name="twitter:image"]');
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    let ldScript = document.querySelector('script[data-mw-seo-ld="true"]');
    if (serializedStructuredData) {
      if (!ldScript) {
        ldScript = document.createElement("script");
        ldScript.setAttribute("type", "application/ld+json");
        ldScript.setAttribute("data-mw-seo-ld", "true");
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = serializedStructuredData;
    } else if (ldScript) {
      ldScript.remove();
    }

    return () => {
      const activeLd = document.querySelector('script[data-mw-seo-ld="true"]');
      if (activeLd && serializedStructuredData) {
        activeLd.remove();
      }
    };
  }, [
    title,
    description,
    noindex,
    canonicalPath,
    ogType,
    ogImage,
    ogImageAlt,
    pathname,
    serializedStructuredData,
  ]);

  return null;
}
