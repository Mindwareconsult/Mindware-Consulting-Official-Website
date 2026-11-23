import { motion } from "motion/react";
import { GOOGLE_CLIENT_REVIEWS, GoogleReviewData } from "../../data/googleReviewsData";
import { GoogleMark, GoogleReviewCard } from "./GoogleReviewCard";
import { cn, EASE } from "../../lib/utils";

interface GoogleClientReviewsProps {
  heading: string;
  supportingText: string;
  reviews?: GoogleReviewData[];
  variant?: "homepage" | "about";
  id?: string;
}

export function GoogleClientReviews({
  heading,
  supportingText,
  reviews = GOOGLE_CLIENT_REVIEWS,
  variant = "homepage",
  id = "google-client-reviews",
}: GoogleClientReviewsProps) {
  const isHomepage = variant === "homepage";

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        "relative overflow-hidden border-t border-white/5",
        isHomepage
          ? "py-20 sm:py-28 lg:py-36 bg-[#040711]"
          : "py-16 sm:py-24 bg-[#03060f]"
      )}
    >
      {/* Subtle ambient glow aligned with Mindware brand palette */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[300px] bg-mw-orange/[0.03] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className={cn("max-w-3xl", isHomepage ? "mb-12 sm:mb-16" : "mb-10 sm:mb-14")}>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/75 mb-4">
            <GoogleMark className="w-4 h-4 shrink-0" />
            <span>Google Client Reviews</span>
          </div>

          <h2
            id={`${id}-heading`}
            className={cn(
              "font-display font-bold tracking-tight text-white leading-tight mb-4",
              isHomepage
                ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            )}
          >
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-white/65 leading-relaxed font-light max-w-2xl">
            {supportingText}
          </p>
        </div>

        {/* Responsive Review Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {reviews.map((review) => (
            <div key={review.id} className="contents">
              <GoogleReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
