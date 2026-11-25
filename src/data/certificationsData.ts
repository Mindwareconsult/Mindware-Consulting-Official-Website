export interface CertificationItem {
  id: string;
  title: string;
  authority: string;
  authorityShort: string;
  credentialId: string;
  date: string;
  badge: string;
  badgeColor: string;
  image: string;
  aspectRatio: string;
  summary: string;
  clientValue: string;
  governingLaw?: string;
  officialScope?: string;
}

export const MINDWARE_CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cac-incorporation",
    title: "Certificate of Incorporation",
    authority: "Corporate Affairs Commission (CAC)",
    authorityShort: "Federal Republic of Nigeria",
    credentialId: "RC: 1309926",
    date: "18th January 2016",
    badge: "Federal Corporate Entity",
    badgeColor: "emerald",
    image: "/certifications/cac-incorporation.png",
    aspectRatio: "portrait",
    governingLaw: "Companies and Allied Matters Act 1990 (CAMA)",
    summary:
      "Official Federal Republic of Nigeria incorporation certificate legally chartering Mindware Consulting Ltd (RC 1309926) as an enterprise technology and strategic advisory practice.",
    clientValue:
      "Confirms you are partnering with a legally incorporated corporate entity (active since 2016) eligible for formal vendor onboarding, commercial contracts, and institutional procurement.",
    officialScope: "Enterprise Digital Systems, Technology Advisory & Professional Services"
  },
  {
    id: "imc-accreditation",
    title: "Certificate of Accreditation",
    authority: "The Institute of Management Consultants (IMC-Nigeria)",
    authorityShort: "IMC Nigeria",
    credentialId: "Accredited Practice Criteria",
    date: "Institutional Charter",
    badge: "Accredited Practice",
    badgeColor: "amber",
    image: "/certifications/imc-accreditation.png",
    aspectRatio: "portrait",
    governingLaw: "Evidence of Best Practice in Management Consulting",
    summary:
      "Accreditation validating institutional adherence to recognized standards of management consulting, executive advisory governance, and professional code of ethics.",
    clientValue:
      "Assures leadership teams that Mindware approaches business problems with structured management consulting rigor and ethical confidentiality—not guesswork.",
    officialScope: "Corporate Strategy, Management Consulting & Executive Roadmaps"
  },
  {
    id: "wso-safety-accreditation",
    title: "Occupational & Environmental Health Accreditation",
    authority: "World Safety Organization (WSO)",
    authorityShort: "WSO Global",
    credentialId: "Special Consultative Status to UN ECOSOC",
    date: "10th September 2019",
    badge: "UN ECOSOC Consultative Status",
    badgeColor: "blue",
    image: "/certifications/wso-safety-accreditation.png",
    aspectRatio: "portrait",
    governingLaw: "United Nations Economic and Social Council Charter",
    summary:
      "Accredited by the World Safety Organization (founded 1975) reflecting institutional grounding in occupational and environmental safety standards.",
    clientValue:
      "Equips Mindware to accurately communicate HSE compliance, site safety positioning, and operational rigor for construction, engineering, oil & gas, and industrial clients.",
    officialScope: "Industrial & Construction Compliance Positioning & HSE Advisory Alignment"
  },
  {
    id: "cicrm-corporate-member",
    title: "Corporate Membership Certificate",
    authority: "Chartered Institute of Customer Relationship Management (CICRM)",
    authorityShort: "CICRM",
    credentialId: "Membership No: 32478222",
    date: "2nd September 2019",
    badge: "Federal Ministry of Education Approved",
    badgeColor: "purple",
    image: "/certifications/cicrm-corporate-member.png",
    aspectRatio: "portrait",
    governingLaw: "Approved by Federal Ministry of Education",
    summary:
      "Chartered corporate membership certifying institutional grounding in structured customer relationship management, client retention models, and service governance.",
    clientValue:
      "Translates directly into reliable post-launch client support, proactive account stewardship, and CRM/onboarding architectures built to help your business retain customers.",
    officialScope: "Customer Experience Architecture, CRM Systems & Client Retention"
  },
  {
    id: "niscn-consultancy-member",
    title: "Consultancy Member Certificate",
    authority: "National Industrial Safety Council of Nigeria (NISCN)",
    authorityShort: "NISCN",
    credentialId: "Membership No: 10282",
    date: "10th September 2019",
    badge: "Audited Consultancy Member",
    badgeColor: "emerald",
    image: "/certifications/niscn-consultancy-member.png",
    aspectRatio: "landscape",
    governingLaw: "Council Audit & Institutional Safety Procedure",
    summary:
      "Formally admitted as a certified consultancy member following institutional audits of organizational safety, technical procedures, and operational governance.",
    clientValue:
      "Reinforces Mindware's domain fluency when working with industrial, downstream energy, civil engineering, and manufacturing partners that enforce strict safety standards.",
    officialScope: "Industrial Compliance Verification, Governance & Operational Advisory"
  },
  {
    id: "firs-tax-identification",
    title: "Taxpayer Identification & VAT Registration",
    authority: "Federal Inland Revenue Service (FIRS)",
    authorityShort: "FIRS Nigeria",
    credentialId: "TIN: 19660429-0001",
    date: "27th January 2016",
    badge: "Fiscal Compliance",
    badgeColor: "amber",
    image: "/certifications/firs-tax-identification.png",
    aspectRatio: "portrait",
    governingLaw: "Value Added Tax (VAT) Act 102 of 1993",
    summary:
      "Official Federal Inland Revenue Service registration validating active tax compliance, VAT registration, and fiscal transparency across commercial operations.",
    clientValue:
      "Allows corporate finance, procurement, and audit departments to onboard Mindware with clean VAT invoicing and statutory tax compliance documentation.",
    officialScope: "Federal Tax Compliance, Corporate Remittances & Verified Invoicing"
  },
  {
    id: "cac-memart",
    title: "Memorandum & Articles of Association",
    authority: "Corporate Affairs Commission (CAMA 1990)",
    authorityShort: "CAMA Certified",
    credentialId: "Certified True Copy",
    date: "Official Legal Filing",
    badge: "Statutory Filing",
    badgeColor: "blue",
    image: "/certifications/cac-memart.png",
    aspectRatio: "portrait",
    governingLaw: "Companies and Allied Matters Act, 1990",
    summary:
      "Certified legal instrument registered under the Companies and Allied Matters Act outlining the statutory objects, governance structure, and commercial mandate of the company.",
    clientValue:
      "Demonstrates transparent corporate charter and authorized legal capacity across multi-disciplinary consulting and technology service delivery.",
    officialScope: "Corporate Governance, Commercial Consulting & Tech Operations"
  }
];
