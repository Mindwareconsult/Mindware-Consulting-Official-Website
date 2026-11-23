export interface GoogleReviewData {
  id: string;
  reviewerName: string;
  designation?: string;
  company?: string;
  date: string;
  rating?: number;
  reviewType: "Verified Google Review";
  reviewText: string;
  sourceUrl?: string;
}

export const GOOGLE_CLIENT_REVIEWS: GoogleReviewData[] = [
  {
    id: "bldr-cosmas-emeka-onuh",
    reviewerName: "Bldr. Cosmas Emeka Onuh",
    designation: "Chief Executive Officer",
    company: "Cosmozel Nigeria Limited",
    date: "31 October 2025",
    rating: 5,
    reviewType: "Verified Google Review",
    reviewText:
      "Mindware Consulting Limited has been our trusted web design and maintenance partner for quite some time now. They did an excellent job designing our company website — professional, responsive, and exactly suited to our brand image. Since launch, they’ve continued to maintain the site diligently, updating software and ensuring smooth performance without any downtime.\n\nWe’re impressed with their dedication, reliability, and attention to detail. I strongly recommend Mindware Consulting Limited to any business looking for quality web design and dependable technical support.",
  },
  {
    id: "adedayo-matthew",
    reviewerName: "Adedayo Matthew",
    date: "31 October 2025",
    reviewType: "Verified Google Review",
    reviewText:
      "I have been overwhelmed with the best offer I get from you. Yes at first I was doubtful but you really surprised me with the best service render by you to me. I recommend you as the best websites design.\n\nYou doing a great job",
    sourceUrl: "https://www.google.com/maps/contrib/114247245412031045598/reviews?hl=en-GB",
  },
  {
    id: "okey-ogwuegbu",
    reviewerName: "Okey Ogwuegbu",
    date: "51 weeks ago",
    reviewType: "Verified Google Review",
    reviewText:
      "Mindware consulting Ltd delivered my website within 48hours.\n\nThey did a great job.",
    sourceUrl: "https://www.google.com/maps/contrib/114458487648098931855/reviews?hl=en-GB",
  },
];
