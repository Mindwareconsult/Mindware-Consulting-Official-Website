import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Star } from "lucide-react";
import { GoogleReviewData } from "../../data/googleReviewsData";
import { cn } from "../../lib/utils";

export function GoogleMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

function getInitials(name: string): string {
  const cleaned = name
    .replace(/^(Bldr\.|Engr\.|Dr\.|Chief|Mr\.|Mrs\.|Ms\.|Arch\.)\s+/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "GC";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const TRUNCATE_THRESHOLD = 260;

interface GoogleReviewCardProps {
  review: GoogleReviewData;
}

export function GoogleReviewCard({ review }: GoogleReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongReview = review.reviewText.length > TRUNCATE_THRESHOLD;
  const displayedText =
    isLongReview && !isExpanded
      ? `${review.reviewText.slice(0, TRUNCATE_THRESHOLD).trimEnd()}...`
      : review.reviewText;

  const initials = getInitials(review.reviewerName);
  const roleParts = [review.designation, review.company].filter(Boolean);

  return (
    <article
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7",
        "transition-all duration-200 hover:border-white/20 hover:bg-white/[0.04]"
      )}
    >
      <div>
        {/* Top Attribution & Rating Row */}
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-white/80">
            <GoogleMark className="w-4 h-4 shrink-0" />
            <span>{review.reviewType}</span>
          </div>

          {typeof review.rating === "number" && (
            <div
              className="inline-flex items-center gap-1.5"
              role="img"
              aria-label={`${review.rating} out of 5 stars on Google`}
            >
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={cn(
                      "w-3.5 h-3.5",
                      idx < review.rating!
                        ? "text-[#FBBC04] fill-[#FBBC04]"
                        : "text-white/20"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-mono tabular-nums font-semibold text-white/80">
                {review.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Review Body */}
        <blockquote className="mb-5">
          <p className="text-sm sm:text-[15px] text-white/85 leading-relaxed whitespace-pre-line font-normal">
            {displayedText}
          </p>

          {isLongReview && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-mw-orange hover:text-orange-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040a] rounded py-1"
            >
              <span>{isExpanded ? "Show less" : "Read more"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </blockquote>
      </div>

      {/* Reviewer Identity & Source Footer */}
      <footer className="pt-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center font-display font-bold text-xs tracking-wide text-white/90 shrink-0"
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {review.reviewerName}
            </h3>

            {roleParts.length > 0 && (
              <p className="text-xs text-white/65 leading-snug mt-0.5">
                {roleParts.join(" · ")}
              </p>
            )}

            <p className="text-xs text-white/50 mt-1 tabular-nums">
              {review.date}
            </p>
          </div>
        </div>

        {review.sourceUrl && (
          <div className="pt-1">
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${review.reviewerName}'s Google review (opens in a new tab)`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/75 hover:text-mw-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mw-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040a] rounded py-1"
            >
              <GoogleMark className="w-3.5 h-3.5 shrink-0" />
              <span>View on Google</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>
          </div>
        )}
      </footer>
    </article>
  );
}
