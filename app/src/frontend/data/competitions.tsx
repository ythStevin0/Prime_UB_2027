import React from "react";
import { Briefcase, Globe, FlaskConical, Wrench, FileText, Droplets } from "lucide-react";

export type TimelineEvent = {
  date: string;
  title: string;
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
  { date: "1 - 15 Agustus 2027", title: "Pendaftaran Gelombang 1" },
  { date: "16 - 31 Agustus 2027", title: "Pendaftaran Gelombang 2" },
  { date: "15 September 2027", title: "Batas Pengumpulan Berkas" },
  { date: "30 September 2027", title: "Pengumuman Finalis" },
  { date: "15 Oktober 2027", title: "Presentasi Final (Offline)" },
];

const defaultMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4646736203173!2d112.61332811477755!3d-7.950917994273617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882794eb09d85%3A0x6b4f72782b6c93b6!2sFakultas%20Teknik%20Universitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1692285117325!5m2!1sen!2sid";

export const competitionsData: CompetitionData[] = [
  {
    id: "comp-1",
    slug: "business-case",
    label: "COMPETITION",
    title: "Business Case",
    subtitle: "— Optimizing Business Strategies for Long-Term Energy Sustainability",
    shortDesc: "Pecahkan studi kasus industri energi",
    longDesc: "Tantang dirimu untuk menganalisis dan memecahkan permasalahan kompleks di dunia industri energi saat ini. Business Case competition dirancang untuk menguji kemampuan analitis, pemecahan masalah, dan komunikasi strategis peserta dalam menghadapi tantangan transisi energi global.",
    icon: <Briefcase className="w-16 h-16 md:w-24 md:h-24 text-blue-400" />,
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-2",
    slug: "geothermal",
    label: "COMPETITION",
    title: "Geothermal",
    subtitle: "— Harnessing Earth's Core for a Greener Tomorrow",
    shortDesc: "Analisis potensi pengembangan energi",
    longDesc: "Dalam kompetisi ini, peserta akan diberikan data lapangan panas bumi nyata dan diminta untuk melakukan analisis komprehensif mulai dari eksplorasi, estimasi cadangan, hingga strategi pengembangan yang optimal secara ekonomi dan ramah lingkungan.",
    icon: <Globe className="w-16 h-16 md:w-24 md:h-24 text-cyan-400" />,
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-3",
    slug: "smart-innovation",
    label: "INNOVATION",
    title: "Smart Innovation",
    subtitle: "— Inventing the Future of Green Tech Solutions",
    shortDesc: "Rancang inovasi teknologi tepat guna",
    longDesc: "Bawa ide paling cemerlangmu untuk menciptakan teknologi dan inovasi berkelanjutan yang mampu meningkatkan efisiensi energi, mengurangi emisi karbon, atau memajukan energi terbarukan di Indonesia.",
    icon: <FlaskConical className="w-16 h-16 md:w-24 md:h-24 text-emerald-400" />,
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-4",
    slug: "oil-rig-design",
    label: "ENGINEERING",
    title: "Oil Rig Design",
    subtitle: "— Engineering Resilience on the Deep Blue Sea",
    shortDesc: "Model miniatur anjungan lepas pantai",
    longDesc: "Buktikan keahlian teknis timmu dengan mendesain dan membuat maket Oil Rig (anjungan lepas pantai) yang tangguh. Penilaian meliputi efisiensi beban, orisinalitas desain, serta penerapan standar keselamatan K3 dalam merancang anjungan pengeboran lepas pantai.",
    icon: <Wrench className="w-16 h-16 md:w-24 md:h-24 text-teal-400" />,
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-5",
    slug: "paper-and-poster",
    label: "ACADEMIC",
    title: "Paper & Poster",
    subtitle: "— Presenting Breakthrough Research to the World",
    shortDesc: "Tuangkan gagasan melalui karya tulis",
    longDesc: "Wadah bagi para mahasiswa kritis untuk menyampaikan penelitian, ide orisinal, atau studi literatur mengenai inovasi teknologi di sektor energi. Publikasikan penemuanmu melalui presentasi paper dan poster visual yang menarik kepada para pakar industri.",
    icon: <FileText className="w-16 h-16 md:w-24 md:h-24 text-pink-400" />,
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
  {
    id: "comp-6",
    slug: "mud-design",
    label: "ENGINEERING",
    title: "Mud Design",
    subtitle: "— Formulating the Perfect Fluid for Extreme Depths",
    shortDesc: "Formulasi lumpur pemboran terbaik",
    longDesc: "Kompetisi teknis yang menantang peserta untuk membuat racikan lumpur pemboran (drilling fluid) yang paling optimal. Uji rheologi, densitas, dan filtrasi lumpur ciptaanmu langsung di laboratorium untuk membuktikan efektivitasnya dalam simulasi sumur minyak.",
    icon: <Droplets className="w-16 h-16 md:w-24 md:h-24 text-purple-400" />,
    timeline: defaultTimeline,
    mapEmbedUrl: defaultMapEmbedUrl,
  },
];
