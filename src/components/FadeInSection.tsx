import { ReactNode, forwardRef } from "react";
import { motion } from "motion/react";
import { EASE } from "../lib/utils";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

export const FadeInSection = forwardRef<HTMLElement, FadeInSectionProps>(
  ({ children, className = "" }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className={className}
      >
        {children}
      </motion.section>
    );
  }
);

FadeInSection.displayName = "FadeInSection";
