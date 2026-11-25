import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";
import { SEO } from "../components/SEO";
import { FadeInSection } from "../components/FadeInSection";
import { COMPANY_INFO } from "../data/companyStats";
import { EASE } from "../lib/utils";

const LAST_UPDATED_LABEL = "November 2026 (Implementation Review Version)";

export function Privacy() {
  return (
    <div className="bg-mw-dark min-h-screen text-white selection:bg-mw-orange selection:text-white">
      <SEO
        title="Privacy Notice & Data Handling | Mindware Consulting Ltd"
        description="How Mindware Consulting Ltd collects, uses, secures, and deletes personal data submitted through consultation enquiries, career applications, newsletter subscriptions, and site analytics."
        canonicalPath="/privacy"
      />

      {/* Hero Section */}
      <FadeInSection className="pt-28 sm:pt-36 md:pt-44 pb-12 sm:pb-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-mw-orange/10 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="space-y-5"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-mw-orange flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Corporate Data Handling &amp; Privacy Notice</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-[1.1] text-white text-balance">
              Privacy Notice &amp; Data Protection Practices
            </h1>

            <p className="text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
              This notice explains how {COMPANY_INFO.name} (RC {COMPANY_INFO.rcNumber}) collects, processes, and protects information submitted through{" "}
              <span className="text-white">{COMPANY_INFO.websiteUrl}</span>. It reflects the actual technical data flows operating in this website application.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50 pt-1">
              <span>{COMPANY_INFO.name}</span>
              <span aria-hidden="true">·</span>
              <span>RC {COMPANY_INFO.rcNumber}</span>
              <span aria-hidden="true">·</span>
              <span>Document status: {LAST_UPDATED_LABEL}</span>
            </div>
          </motion.div>
        </div>
      </FadeInSection>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl space-y-10">
          {/* Governance Review Flag */}
          <div className="p-6 rounded-2xl bg-[#080d1e] border border-white/10 space-y-2">
            <h2 className="text-base sm:text-lg font-display font-bold text-white">
              Governance &amp; Legal Approval Notice
            </h2>
            <p className="text-sm text-white/75 leading-relaxed">
              The operational descriptions below accurately document the software&apos;s data collection, third-party processors, and deletion workflows. Final statutory retention schedules, any jurisdiction-specific regulatory filings, and formal legal counsel sign-off are flagged for{" "}
              <span className="text-mw-orange font-semibold">company leadership approval</span> prior to commercial campaigns.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. Consultation & Business Enquiries */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                1. Information Collected Through Enquiry Forms
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                When you submit a Business Growth Review, consultation enquiry, or service request on our website, we collect the information you enter in the form:
              </p>
              <ul className="space-y-2 text-sm text-white/75 list-disc pl-5 leading-relaxed">
                <li>
                  <strong className="text-white">Contact details:</strong> Full name, company or organization name, corporate or personal email address, and phone or WhatsApp number.
                </li>
                <li>
                  <strong className="text-white">Business and project information:</strong> Enquiry category, industry sector, campaign track, consultation topic, required service, preferred engagement model, and project brief or scope description.
                </li>
                <li>
                  <strong className="text-white">Navigation attribution &amp; technical metadata:</strong> Submission source page, landing page path, UTM campaign parameters (<span className="font-mono text-xs text-white/80">utm_source</span>, <span className="font-mono text-xs text-white/80">utm_medium</span>, <span className="font-mono text-xs text-white/80">utm_campaign</span>, <span className="font-mono text-xs text-white/80">utm_content</span>, <span className="font-mono text-xs text-white/80">utm_term</span>), a server-generated reference ID, and an irreversible SHA-256 duplicate-prevention fingerprint.
                </li>
              </ul>
            </article>

            {/* 2. Career Applications & Email-Referenced CVs */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                2. Career Applications &amp; Email-Referenced CV Submissions
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                When you apply for an internal role or submit a General Expression of Interest on the Careers page:
              </p>
              <ul className="space-y-2 text-sm text-white/75 list-disc pl-5 leading-relaxed">
                <li>
                  <strong className="text-white">Applicant details:</strong> Application mode (vacancy or general), vacancy code and title (if applicable), full name, email address, phone/WhatsApp number, city/state, practice discipline, preferred engagement model, years of experience, optional portfolio/LinkedIn/GitHub URL, and suitability summary.
                </li>
                <li>
                  <strong className="text-white">How CV files are handled:</strong> The application modal validates <span className="font-mono text-xs text-white/80">.pdf</span>, <span className="font-mono text-xs text-white/80">.doc</span>, and <span className="font-mono text-xs text-white/80">.docx</span> selection locally and records only your sanitized filename and size reference (<span className="font-mono text-xs text-white/80">cv_submission_method: email_reference</span>). Binary CV documents are <strong className="text-white">not</strong> uploaded to public file buckets by the form. After receiving your reference ID, you may email your CV attachment directly to{" "}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-mw-orange hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-white">Optional AI writing assistance:</strong> If you choose to use the Careers CV, experience bullet, or cover letter writing helper when enabled, only the draft role, skills, certifications, and notes you submit are sent from our backend server to the configured AI service solely to generate your draft text.
                </li>
              </ul>
            </article>

            {/* 3. Newsletter Subscriptions & Consent Withdrawal */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                3. Newsletter Subscriptions &amp; Withdrawal of Consent
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Subscribing to Mindware Insights through the global footer or Insights page records your email address, subscription source, optional campaign tag, active status, consent timestamp, and marketing opt-in preference.
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                You may withdraw marketing consent at any time using a signed unsubscribe link (which presents a confirmation step before updating your status so automated email link scanners do not accidentally unsubscribe you, and supports one-click mail-client unsubscribe headers) or by emailing{" "}
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-mw-orange hover:underline">
                  {COMPANY_INFO.email}
                </a>
                .
              </p>
            </article>

            {/* 4. Purposes of Processing */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                4. Purposes of Processing
              </h2>
              <ul className="space-y-2 text-sm text-white/75 list-disc pl-5 leading-relaxed">
                <li>Evaluating, scoping, and responding to business growth, digital transformation, and advisory enquiries.</li>
                <li>Reviewing candidate suitability and communicating regarding Careers opportunities.</li>
                <li>Managing consented Mindware Insights newsletter preferences and honoring unsubscribe requests.</li>
                <li>Protecting API endpoints against spam, duplicate bursts, and automated abuse through honeypot checks and rate limiting.</li>
                <li>Measuring aggregate website navigation and conversion performance when analytics integrations are enabled.</li>
              </ul>
            </article>

            {/* 5. Third-Party Service Providers */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                5. Third-Party Service Providers &amp; Infrastructure Roles
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Depending on which infrastructure credentials are configured in deployment, {COMPANY_INFO.name} uses the following service categories strictly to operate the website and internal notification workflows:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">Application Hosting (Vercel)</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Hosts the web interface and executes server-side API endpoints.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">Database Storage (Supabase PostgreSQL)</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Persists enquiries, career applications, newsletter consent records, and notification outbox jobs under server-only Row Level Security access.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">Email Delivery (Resend)</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Delivers internal lead and recruitment alert emails to authorized {COMPANY_INFO.name} inboxes when configured.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">Abuse Protection (Upstash Redis)</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Enforces sliding-window request limits using irreversible HMAC-SHA256 hashed IP identifiers; raw IP addresses are not stored in our database or logs.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">Configured CRM Webhooks &amp; AI Assistance</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Optional encrypted HTTPS CRM webhooks for lead synchronization and Google Gemini API for candidate-triggered CV/cover letter drafting when enabled.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                  <h3 className="text-sm font-bold text-white">Analytics Providers (When Configured)</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Google Analytics 4, Google Tag Manager, and Meta Pixel load only when valid public measurement IDs are configured in deployment.
                  </p>
                </div>
              </div>
            </article>

            {/* 6. Analytics, Browser Storage & Cookies */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                6. Analytics &amp; Browser Storage Disclosures
              </h2>
              <ul className="space-y-2 text-sm text-white/75 list-disc pl-5 leading-relaxed">
                <li>
                  <strong className="text-white">Conditional tracking scripts:</strong> External analytics scripts (GA4 with <span className="font-mono text-xs text-white/80">anonymize_ip: true</span>, GTM, and Meta Pixel) initialize only when valid measurement IDs are configured in the environment. When unconfigured, no external analytics scripts are loaded.
                </li>
                <li>
                  <strong className="text-white">PII exclusion before analytics dispatch:</strong> Our client analytics helper strips direct personal fields (<span className="font-mono text-xs text-white/80">email</span>, <span className="font-mono text-xs text-white/80">phone</span>, <span className="font-mono text-xs text-white/80">fullName</span>, <span className="font-mono text-xs text-white/80">businessName</span>, <span className="font-mono text-xs text-white/80">projectDesc</span>, and <span className="font-mono text-xs text-white/80">motivation</span>) before sending conversion or page-view metadata.
                </li>
                <li>
                  <strong className="text-white">Session storage:</strong> Browser <span className="font-mono text-xs text-white/80">sessionStorage</span> stores UTM campaign query parameters under <span className="font-mono text-xs text-white/80">mw_utm_attribution_v1</span> during your browsing session so campaign attribution remains intact if you navigate before submitting an enquiry.
                </li>
                <li>
                  <strong className="text-white">Cookies notice:</strong> {COMPANY_INFO.name} does not set custom first-party advertising cookies in application code; where third-party analytics tags (GA4, GTM, or Meta Pixel) are enabled by deployment configuration, those providers may set their standard measurement cookies subject to your browser settings and any consent controls approved by company leadership.
                </li>
              </ul>
            </article>

            {/* 7. Data Retention & Deletion Procedures */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                7. Data Retention &amp; Deletion Procedures
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Personal records are retained only for as long as needed to respond to your enquiry, administer client engagements, evaluate career applications, maintain newsletter suppression or consent records, and satisfy applicable business or statutory obligations. Exact retention durations across enquiries, recruitment records, and inactive newsletter records are maintained internally and remain subject to formal company leadership approval.
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                Upon receiving a verified deletion request at{" "}
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-mw-orange hover:underline">
                  {COMPANY_INFO.email}
                </a>
                , authorized administrators can permanently delete matching records across our enquiry, career application, newsletter subscriber, and notification outbox tables.
              </p>
            </article>

            {/* 8. Your Rights & Contact Information */}
            <article className="p-6 sm:p-8 rounded-2xl bg-[#080d1e] border border-white/10 space-y-5">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                8. Your Privacy Rights &amp; Contact Details
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                You may contact {COMPANY_INFO.name} to request access to personal data you have submitted, ask for inaccurate details to be corrected, withdraw newsletter consent, or request deletion of your stored submissions.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Privacy Enquiries Email
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent("Privacy / Data Request - Mindware Consulting Ltd")}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-mw-orange hover:underline break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{COMPANY_INFO.email}</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Direct Phone / WhatsApp
                  </div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-mw-orange transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{COMPANY_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-mw-orange hover:underline"
                >
                  <span>Contact Mindware Consulting Ltd</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
