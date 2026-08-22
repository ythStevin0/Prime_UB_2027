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

const defaultTimeline: TimelineEvent[] = [
  { date: "1 - 15 Agustus 2027", title: "Pendaftaran Gelombang 1", description: "Pendaftaran awal dengan biaya lebih terjangkau." },
  { date: "16 - 31 Agustus 2027", title: "Pendaftaran Gelombang 2", description: "Pendaftaran reguler dengan batas kuota akhir." },
  { date: "15 September 2027", title: "Batas Pengumpulan Berkas", description: "Batas akhir pengumpulan proposal atau karya final." },
  { date: "30 September 2027", title: "Pengumuman Finalis", description: "Pengumuman 10 tim terbaik yang akan bertanding di babak final." },
  { date: "15 Oktober 2027", title: "Presentasi Final (Offline)", description: "Acara puncak presentasi secara langsung di lokasi acara." },
];

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
    timeline: defaultTimeline,
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
    timeline: defaultTimeline,
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
    timeline: defaultTimeline,
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
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
];
