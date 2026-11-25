# Mindware Consulting Ltd — Academy & Marketplace Migration Manifest

**Created:** Strategic Website Architecture Restructuring  
**Corporate Domain:** `https://mindwareconsult.com.ng`  
**Target Academy Subdomain (Recommended):** `https://academy.mindwareconsult.com.ng`  
**Status:** Preserved in-repo in a migration-ready state (detached from active corporate routes and commercial navigation; zero redirects to `/`).

---

## 1. Strategic Separation Policy

1. **No Permanent Deletion:** All Academy pages, data modules, gallery catalogs, student testimonials, and imagery assets remain intact in the codebase so they can be cleanly extracted or deployed into a dedicated Mindware Academy platform.
2. **No Redirects to Corporate Homepage (`/`):** Removed `/training/*` and `/careers/*` marketplace routes must **not** redirect to `/`. Once `https://academy.mindwareconsult.com.ng` is provisioned, activate `301` server/edge redirects strictly to the corresponding Academy platform URLs documented in Section 4.
3. **Corporate B2B Capability Continuity:** Organizational workforce enablement and enterprise staff capability programs remain available strictly as B2B corporate consulting engagements under `/solutions` and `/services/training` (reframed as *Organizational Capability & Workforce Enablement*).

---

## 2. Preserved Academy Assets & Source Files

### A. Academy Page Components (Detached from `src/App.tsx`)
| File Path | Former Route | Purpose / Contents |
| :--- | :--- | :--- |
| `src/pages/Training.tsx` | `/training` | Academy Hub overview landing page |
| `src/pages/DigitalSkillsTraining.tsx` | `/training/digital-skills` | Digital Skills track (Web Design, SEO, Social Media, Video Editing, Data Analytics, App Development) |
| `src/pages/ProfessionalDevelopmentTraining.tsx` | `/training/professional-development` | Professional & Employability certifications (PMP®, HRM, CRM, HSE Levels 1–3) |
| `src/pages/AcademyTestimonials.tsx` | `/training/testimonials` | Student & alumni graduate YouTube video reviews |
| `src/pages/TrainingGallery.tsx` | `/training/gallery` | Live cohort training photo gallery & event logs |
| `src/components/academy/AcademySubNav.tsx` | *(Shared subnav)* | Sub-navigation bar across Academy routes |

### B. Academy Data & Media Assets
| File Path | Contents |
| :--- | :--- |
| `src/data/training.ts` | Course track structures, modules, pricing, schedules, and registration fields |
| `src/data/trainingGalleryData.ts` | Academy gallery event metadata and photo entries |
| `src/data/testimonialsData.ts` (`STUDENT_TESTIMONIALS` export) | Verified student & graduate video review entries (still exported in module, excluded from active corporate `/about/testimonials` UI) |
| `src/assets/images/training_web_lab_1790960908174.jpg` | Digital skills lab visual |
| `src/assets/images/training_hse_drill_1790960918179.jpg` | HSE safety drill training visual |
| `src/assets/images/training_pmp_session_1790617...` (`training_pmp_session_1790960928930.jpg`) | PMP executive training session visual |
| `src/assets/images/training_graduation_ceremony_1790960939072.jpg` | Annual graduation ceremony visual |

---

## 3. Preserved Legacy Talent Marketplace Files (Operational & Legal Archive)

The third-party job board, employer matching marketplace, and AI CV builder have been detached from `/careers` so `/careers` operates exclusively as Mindware Consulting Ltd's internal corporate recruitment portal. The following files remain preserved on disk for operational/legal archival before final decommissioning or standalone extraction:

| File Path | Former Route / Role | Contents |
| :--- | :--- | :--- |
| `src/pages/CareersCVBuilder.tsx` | `/careers/cv-builder` | Standalone Gemini AI CV Builder page |
| `src/pages/CareersJobs.tsx` | `/careers/jobs` | Mixed third-party/partner job board page |
| `src/pages/CareersEmployers.tsx` | `/careers/employers` | External employer talent-matching directory page |
| `src/components/careers/AICVBuilder.tsx` | *(Embedded widget)* | ATS resume editor + PDF export component |
| `src/components/careers/TalentNetwork.tsx` | *(Embedded widget)* | Candidate pool marketplace + `TalentCandidate` interface |
| `src/components/careers/ConnectEmployerModal.tsx` | *(Modal)* | External employer contact request modal |
| `src/components/careers/CareersSubNav.tsx` | *(Shared subnav)* | Multi-hub careers sub-navigation |
| `src/lib/cvStorage.ts` | *(Client storage)* | LocalStorage CV persistence helper (`CVData`) |
| `src/assets/images/careers_hero_workspace_1790617831121.jpg` | *(Visual asset)* | Workspace photography (reused on corporate recruitment page) |
| `src/assets/images/talent_matching_network_1790617842281.jpg` | *(Visual asset)* | Interview/workspace photography (archive) |

---

## 4. Documented Academy Subdomain Redirect Map (For Future Activation)

Activate the following HTTP `301 Moved Permanently` rules on the CDN/reverse-proxy layer **only after** `https://academy.mindwareconsult.com.ng` is live and serving verified pages. **Do not redirect any `/training/*` path to `/` (`https://mindwareconsult.com.ng/`).**

| Legacy Corporate Path | Future Academy Destination | Status |
| :--- | :--- | :--- |
| `/training` | `https://academy.mindwareconsult.com.ng/` | Pending Academy subdomain launch |
| `/training/digital-skills` | `https://academy.mindwareconsult.com.ng/digital-skills` | Pending Academy subdomain launch |
| `/training/professional-development` | `https://academy.mindwareconsult.com.ng/professional-development` | Pending Academy subdomain launch |
| `/training/employability-skills` | `https://academy.mindwareconsult.com.ng/professional-development` | Pending Academy subdomain launch |
| `/training/testimonials` | `https://academy.mindwareconsult.com.ng/testimonials` | Pending Academy subdomain launch |
| `/training/reviews` | `https://academy.mindwareconsult.com.ng/testimonials` | Pending Academy subdomain launch |
| `/training/video-testimonials` | `https://academy.mindwareconsult.com.ng/testimonials` | Pending Academy subdomain launch |
| `/training/graduate-testimonials` | `https://academy.mindwareconsult.com.ng/testimonials` | Pending Academy subdomain launch |
| `/training/gallery` | `https://academy.mindwareconsult.com.ng/gallery` | Pending Academy subdomain launch |
| `/training/training-gallery` | `https://academy.mindwareconsult.com.ng/gallery` | Pending Academy subdomain launch |
| `/training/photos` | `https://academy.mindwareconsult.com.ng/gallery` | Pending Academy subdomain launch |
| `/training/pictures` | `https://academy.mindwareconsult.com.ng/gallery` | Pending Academy subdomain launch |

### Deprecated Marketplace URLs (Recommended `410 Gone`)
Once search engines complete de-indexing, configure HTTP `410 Gone` for:
- `/careers/cv-builder`, `/careers/ai-cv-builder`
- `/careers/jobs`, `/careers/explore-jobs`
- `/careers/employers`, `/careers/connect-employers`, `/careers/talent-match`, `/careers/talent-network`
