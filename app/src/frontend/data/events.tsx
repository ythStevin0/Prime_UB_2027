import React from "react";
import { BookOpen, Mic, Trophy } from "lucide-react";

export type TimelineEvent = {
  date: string;
  title: string;
  description?: string;
};

export type EventData = {
  id: string;
  slug: string;
  subtitle: string;
  title: string;
  titleHighlight: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  icon: React.ReactNode;
  timeline: TimelineEvent[];
  mapEmbedUrl: string;
  buttonText: string;
  reverse: boolean;
  theme: {
    text: string;
    bgBtn: string;
    glow: string;
    corner: string;
  };
  category: string;
};

const defaultMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4646736203173!2d112.61332811477755!3d-7.950917994273617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882794eb09d85%3A0x6b4f72782b6c93b6!2sFakultas%20Teknik%20Universitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1692285117325!5m2!1sen!2sid";

export const eventsData: EventData[] = [
  {
    id: "evt-primexplore",
    slug: "primexplore",
    subtitle: "INDUSTRY EXPOSURE",
    title: "PRIMExplore",
    titleHighlight: "",
    shortDesc: "Energy Industry Immersion.",
    longDesc: "An immersive activity bridging academic learning and real-world application through direct visits to companies in the oil and gas and broader energy sectors.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    icon: <BookOpen className="w-16 h-16 md:w-24 md:h-24 text-blue-400" />,
    buttonText: "Learn More",
    reverse: false,
    category: "Industry Exposure",
    timeline: [
      { date: "22 March 2027", title: "PRIMExplore Event", description: "Company visits and facility tours." },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-blue-400",
      bgBtn: "hover:bg-blue-900/30",
      glow: "from-blue-600/20",
      corner: "border-blue-500/50",
    }
  },
  {
    id: "evt-ipse",
    slug: "ipse",
    subtitle: "INDUSTRY EXPOSURE",
    title: "IPSE",
    titleHighlight: "(International Petroleum Seminar & Exhibition)",
    shortDesc: "Bridge insights from the energy industry.",
    longDesc: "A collaborative offline seminar and exhibition bridging industry insights with student competency development, featuring practitioners and academics.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    icon: <Mic className="w-16 h-16 md:w-24 md:h-24 text-cyan-400" />,
    buttonText: "Join Seminar",
    reverse: true,
    category: "Industry Exposure",
    timeline: [
      { date: "21 March 2027", title: "IPSE Event", description: "Seminar and Exhibition sessions." },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-cyan-400",
      bgBtn: "hover:bg-cyan-900/30",
      glow: "from-cyan-600/20",
      corner: "border-cyan-500/50",
    }
  },
  {
    id: "evt-roadshow",
    slug: "roadshow",
    subtitle: "NETWORKING & ENGAGEMENT",
    title: "Roadshow",
    titleHighlight: "",
    shortDesc: "Interactive Recruitment Sessions.",
    longDesc: "An interactive promotional tour introducing PRIME 2027 to university students across Indonesia, featuring presentations and recruitment sessions.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000",
    icon: <BookOpen className="w-16 h-16 md:w-24 md:h-24 text-purple-400" />,
    buttonText: "Register Now",
    reverse: false,
    category: "Networking & Engagement",
    timeline: [
      { date: "22 November 2026", title: "Roadshow Event", description: "Interactive Recruitment Sessions." },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-purple-400",
      bgBtn: "hover:bg-purple-900/30",
      glow: "from-purple-600/20",
      corner: "border-purple-500/50",
    }
  },
  {
    id: "evt-gala",
    slug: "pioneers-zenith",
    subtitle: "NETWORKING & ENGAGEMENT",
    title: "Pioneers' Zenith",
    titleHighlight: "(Gala Dinner)",
    shortDesc: "The grand finale of PRIME 2027.",
    longDesc: "The grand finale integrating the Awarding Ceremony and Networking Gala Dinner to celebrate the winners and strengthen industry relationships.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
    icon: <Trophy className="w-16 h-16 md:w-24 md:h-24 text-pink-400" />,
    buttonText: "Discover More",
    reverse: true,
    category: "Networking & Engagement",
    timeline: [
      { date: "27 March 2027", title: "Pioneers' Zenith", description: "Awarding Ceremony and Networking Gala Dinner." },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-pink-400",
      bgBtn: "hover:bg-pink-900/30",
      glow: "from-pink-600/20",
      corner: "border-pink-500/50",
    }
  }
];
