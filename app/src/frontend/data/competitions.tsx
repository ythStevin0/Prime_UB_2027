import React from "react";
import { Briefcase, Globe, FileText, Droplets } from "lucide-react";

export type TimelineEvent = {
  date: string;
  title: string;
  description?: string;
};

export type CompetitionData = {
  id: string;
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ReactNode;
  timeline: TimelineEvent[];
  mapEmbedUrl: string;
};

const timelinePPC: TimelineEvent[] = [
  { date: "14 Nov - 14 Dec 2026", title: "Registration & Abstract Submission" },
  { date: "15 Nov - 19 Dec 2026", title: "Extended Registration & Abstract Submission" },
  { date: "14 Nov 2026 - 7 Jan 2027", title: "Abstract Evaluation by Judges" },
  { date: "8 January 2027", title: "Semifinalists Announcement" },
  { date: "8 Jan - 15 Jan 2027", title: "Full Paper Submission - Batch 1" },
  { date: "16 Jan - 26 Jan 2027", title: "Full Paper Submission - Batch 2" },
  { date: "27 Jan - 8 Feb 2027", title: "Full Paper Submission - Batch 3" },
  { date: "9 Feb - 13 Feb 2027", title: "Extended Full Paper Submission" },
  { date: "11 Jan - 6 Mar 2027", title: "Full Paper Evaluation by Judges" },
  { date: "8 March 2027", title: "Finalists Announcement" },
  { date: "18 March 2027", title: "Pitch Deck & Poster Submission" },
  { date: "19 Mar - 24 Mar 2027", title: "Poster Evaluation by Judges" },
  { date: "19 Mar - 24 Mar 2027", title: "Public Poster Voting" },
  { date: "27 March 2027", title: "Pitching Day" },
  { date: "27 March 2027", title: "Gala Dinner & Awarding Night" },
];

const timelineGCC: TimelineEvent[] = [
  { date: "14 Nov - 20 Nov 2026", title: "Early Bird Registration" },
  { date: "21 Nov 2026 - 4 Jan 2027", title: "Normal Registration" },
  { date: "28 December 2026", title: "Preliminary Stage Case Release" },
  { date: "5 Jan - 9 Jan 2027", title: "Extend Registration" },
  { date: "28 Dec 2026 - 20 Jan 2027", title: "Preliminary Stage Submission" },
  { date: "28 Dec 2026 - 5 Feb 2027", title: "Assessment Executive Summary by Judges" },
  { date: "7 February 2027", title: "Finalist Announcement" },
  { date: "9 February 2027", title: "Final Stage Case Release" },
  { date: "9 Feb - 11 Mar 2027", title: "Final Stage Submission" },
  { date: "8 Mar - 24 Mar 2027", title: "Assessment Full Paper by Judges" },
  { date: "12 March 2027", title: "Pitch Deck Submission" },
  { date: "27 March 2027", title: "Pitching Day" },
  { date: "27 March 2027", title: "Gala Dinner & Awarding Night" },
];

const timelinePetrosmart: TimelineEvent[] = [
  { date: "14 Nov - 20 Nov 2026", title: "Early Bird Registration" },
  { date: "21 Nov 2026 - 4 Jan 2027", title: "Normal Registration" },
  { date: "5 Jan - 9 Jan 2027", title: "Extend Registration" },
  { date: "13 February 2027", title: "Preliminary I" },
  { date: "20 February 2027", title: "Top 12 Announcement" },
  { date: "6 March 2027", title: "Preliminary II" },
  { date: "10 March 2027", title: "Semifinalist Announcement" },
  { date: "27 March 2027", title: "Semi and Final Round" },
  { date: "27 March 2027", title: "Gala Dinner & Awarding Night" },
];

// Asumsi BCC sama dengan GCC karena format lombanya mirip (Case Competition)
const timelineBCC: TimelineEvent[] = [...timelineGCC];

const defaultMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4646736203173!2d112.61332811477755!3d-7.950917994273617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882794eb09d85%3A0x6b4f72782b6c93b6!2sFakultas%20Teknik%20Universitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1692285117325!5m2!1sen!2sid";

export const competitionsData: CompetitionData[] = [
  {
    id: "comp-1",
    slug: "paper-and-poster",
    label: "ACADEMIC",
    title: "Paper and Poster Competition",
    subtitle: "— Reimagining Integrated Oil and Gas Systems Through Technological Innovation for Operational Resilience.",
    shortDesc: "Present data-driven scientific papers and innovative concepts.",
    longDesc: "A scientific competition where students present data-driven papers contributing to the energy sector, assessed on research quality, critical thinking, and communicative presentation.",
    icon: <FileText className="w-16 h-16 md:w-24 md:h-24 text-pink-400" />,
    timeline: timelinePPC,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-2",
    slug: "petrosmart",
    label: "COMPETITION",
    title: "PetroSmart",
    subtitle: "— Strengthening Energy Resilience Through Strategic Solutions for Emerging Energy Challenges.",
    shortDesc: "Test understanding and critical thinking in the energy sector.",
    longDesc: "A fast-paced knowledge competition testing participants' critical thinking and understanding of oil and gas, geothermal, renewable energy, and current energy policies.",
    icon: <Droplets className="w-16 h-16 md:w-24 md:h-24 text-blue-400" />,
    timeline: timelinePetrosmart,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-3",
    slug: "business-case",
    label: "COMPETITION",
    title: "Business Case Competition",
    subtitle: "— Unlocking Sustainable Competitiveness Through Strategic Energy Transformation.",
    shortDesc: "Analyze and devise strategic business solutions.",
    longDesc: "A strategic competition to comprehensively analyze real-world business problems and formulate innovative, actionable solutions using data-driven decision-making.",
    icon: <Briefcase className="w-16 h-16 md:w-24 md:h-24 text-purple-400" />,
    timeline: timelineBCC,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-4",
    slug: "geothermal-case",
    label: "COMPETITION",
    title: "Geothermal Case Competition",
    subtitle: "— Accelerating Integrated Geothermal Development for Long-Term Energy Sustainability.",
    shortDesc: "Formulate innovative geothermal development solutions.",
    longDesc: "A strategic competition to analyze geothermal industry challenges and formulate innovative solutions, balancing technical, economic, and sustainability factors.",
    icon: <Globe className="w-16 h-16 md:w-24 md:h-24 text-cyan-400" />,
    timeline: timelineGCC,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
];
