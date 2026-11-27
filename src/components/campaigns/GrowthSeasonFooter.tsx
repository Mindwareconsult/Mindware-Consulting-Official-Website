import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { COMPANY_INFO } from "../../data/companyStats";
import { CAMPAIGN_2026_CONSTANTS } from "../../data/growthSeason2026Data";
import { trackEmailClick, trackWhatsAppClick } from "../../lib/analytics";
import {
  CAMPAIGN_FOOTER_NAV_ITEMS,
  scrollToCampaignSection,
} from "./campaignNavigation";

export function GrowthSeasonFooter() {
  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    scrollToCampaignSection(sectionId);
  };

  return (
    <footer className="bg-[#020714] border-t border-white/10 text-white pt-14 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          {/* Company Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="inline-block rounded-lg bg-white px-2.5 py-1.5">
              <img
                src="/footer-logo.png"
                alt={COMPANY_INFO.name}
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Business growth and digital transformation partner.
            </p>

            <p className="text-xs font-mono text-slate-400">
              {COMPANY_INFO.name} · RC {COMPANY_INFO.rcNumber}
            </p>
          </div>

          {/* Campaign Links */}
          <div className="md:col-span-4 space-y-3.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 font-semibold">
              Campaign Navigation
            </h2>
            <ul className="space-y-2 text-sm">
              {CAMPAIGN_FOOTER_NAV_ITEMS.map((item) => {
                const isPrimaryLink =
                  item.sectionId === "enquiry-qualification-form";
                return (
                  <li key={item.sectionId}>
                    <a
                      href={`#${item.sectionId}`}
                      onClick={(e) => handleAnchorClick(e, item.sectionId)}
                      className={
                        isPrimaryLink
                          ? "inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                          : "inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                      }
                    >
                      <span>{item.label}</span>
                      {isPrimaryLink && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Direct Campaign Contact */}
          <div className="md:col-span-3 space-y-3.5">
            <h2 className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-400 font-semibold">
              Direct Contact
            </h2>
            <div className="space-y-3 text-sm">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick("gs2026-footer", "footer_contact")
                }
                className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    WhatsApp
                  </span>
                  <span className="font-medium text-white">
                    {COMPANY_INFO.phoneDisplay}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                onClick={() => trackEmailClick("gs2026-footer")}
                className="flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors py-1 break-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <span className="font-medium text-white">
                    {COMPANY_INFO.email}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.{" "}
            <span className="text-slate-500">
              · {CAMPAIGN_2026_CONSTANTS.title}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/privacy"
              className="text-slate-300 hover:text-white transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
