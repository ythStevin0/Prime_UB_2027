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
};

const defaultMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.4646736203173!2d112.61332811477755!3d-7.950917994273617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7882794eb09d85%3A0x6b4f72782b6c93b6!2sFakultas%20Teknik%20Universitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1692285117325!5m2!1sen!2sid";

export const eventsData: EventData[] = [
  {
    id: "pre-event",
    slug: "pre-event-workshop",
    subtitle: "PRE-EVENT",
    title: "Pre-Event",
    titleHighlight: "Workshop",
    shortDesc: "Sesi pelatihan intensif yang dirancang untuk membekali Anda dengan keterampilan penting sebelum menghadapi kompetisi utama. Buka peluang baru dan tingkatkan kemampuan Anda ke level selanjutnya.",
    longDesc: "Pre-Event Workshop PRIME UB hadir untuk membekali Anda dengan materi yang relevan dari para profesional sebelum Anda berlaga di babak kompetisi. Anda akan mendapatkan modul eksklusif, kesempatan berinteraksi langsung dengan mentor industri, dan sesi hands-on yang dapat diaplikasikan untuk tantangan energi terbarukan masa kini.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
    icon: <BookOpen className="w-16 h-16 md:w-24 md:h-24 text-blue-400" />,
    buttonText: "Learn More",
    reverse: false,
    timeline: [
      { date: "5 September 2027", title: "Registrasi Awal", description: "Pendaftaran fase pertama dengan harga spesial." },
      { date: "15 September 2027", title: "Batas Akhir Registrasi", description: "Penutupan pendaftaran peserta pameran." },
      { date: "20 September 2027", title: "Technical Meeting", description: "Pertemuan teknis untuk semua peserta pameran." },
      { date: "25 September 2027", title: "Hari H Pameran", description: "Puncak acara pameran karya teknologi." },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-blue-400",
      bgBtn: "bg-blue-600 hover:bg-blue-500",
      glow: "bg-blue-500/10",
      corner: "border-blue-500/50"
    }
  },
  {
    id: "talkshow",
    slug: "talkshow-inspiratif",
    subtitle: "TALKSHOW",
    title: "Talkshow",
    titleHighlight: "Inspiratif",
    shortDesc: "Dapatkan wawasan mendalam dari para pemimpin industri dan pakar mengenai masa depan energi dan teknologi. Temukan inspirasi untuk memecahkan tantangan dunia nyata.",
    longDesc: "Acara Talkshow Inspiratif mempertemukan para mahasiswa, akademisi, dan pemimpin industri terkemuka dalam satu panggung untuk membahas inovasi energi berkelanjutan, tren teknologi hijau, dan bagaimana generasi muda dapat mengambil peran sentral dalam transisi menuju Net Zero Emission.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
    icon: <Mic className="w-16 h-16 md:w-24 md:h-24 text-cyan-400" />,
    buttonText: "Learn More",
    reverse: true,
    timeline: [
      { date: "10 Agustus 2027", title: "Pendaftaran Dibuka", description: "Mulai daftar untuk mengikuti workshop intensif ini." },
      { date: "20 Agustus 2027", title: "Penutupan Pendaftaran", description: "Batas akhir pendaftaran peserta workshop." },
      { date: "25 Agustus 2027", title: "Pelaksanaan Workshop", description: "Sesi pelatihan langsung bersama para ahli." },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-cyan-400",
      bgBtn: "bg-cyan-600 hover:bg-cyan-500",
      glow: "bg-cyan-500/10",
      corner: "border-cyan-500/50"
    }
  },
  {
    id: "summit",
    slug: "grand-summit",
    subtitle: "SUMMIT",
    title: "Grand",
    titleHighlight: "Summit",
    shortDesc: "Puncak acara PRIME UB 2027. Rayakan kemenangan para juara, bangun jaringan dengan perusahaan energi terkemuka, dan saksikan lahirnya inovasi masa depan.",
    longDesc: "Malam penganugerahan dan perayaan puncak untuk seluruh finalis, juri, dan partner. Di Grand Summit, kita tidak hanya akan mengumumkan para pemenang dari kompetisi-kompetisi hebat ini, tetapi juga menyediakan panggung eksibisi dan networking session untuk mendukung karir dan ide inovatif Anda.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
    icon: <Trophy className="w-16 h-16 md:w-24 md:h-24 text-fuchsia-400" />,
    buttonText: "Learn More",
    reverse: false,
    timeline: [
      { date: "20 Oktober 2027", title: "Gala Dinner Invitation" },
      { date: "28 Oktober 2027", title: "Main Event & Awarding Night" },
    ],
    mapEmbedUrl: defaultMapEmbedUrl,
    theme: {
      text: "text-fuchsia-400",
      bgBtn: "bg-fuchsia-600 hover:bg-fuchsia-500",
      glow: "bg-fuchsia-500/10",
      corner: "border-fuchsia-500/50"
    }
  }
];
