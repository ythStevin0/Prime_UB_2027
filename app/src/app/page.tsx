import { ArrowRight, Trophy, Calendar, ShoppingBag } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Background Glow Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--color-blue-500)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: "var(--color-cyan-500)" }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--status-success)" }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--fg-secondary)" }}
            >
              Pendaftaran Dibuka
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-gradient">PRIME</span>
            <br />
            <span style={{ color: "var(--fg-primary)" }}>UB 2027</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
            style={{
              color: "var(--fg-secondary)",
              animationDelay: "100ms",
              animationFillMode: "backwards",
            }}
          >
            Platform kompetisi, event, dan merchandise resmi.
            <br className="hidden md:block" />
            Daftar, berkompetisi, dan raih prestasi bersama kami.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
          >
            <button
              className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: "var(--gradient-brand-vivid)",
                boxShadow: "var(--shadow-glow-blue)",
              }}
            >
              Jelajahi Kompetisi
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold glass transition-all hover:scale-105 active:scale-95"
              style={{ color: "var(--fg-secondary)" }}
            >
              Lihat Event
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 animate-fade-in"
            style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
          >
            {[
              { value: "7", label: "Kompetisi" },
              { value: "5", label: "Event" },
              { value: "1000+", label: "Peserta" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold text-gradient-brand"
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm mt-1"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apa yang <span className="text-gradient">Menanti</span> Anda
            </h2>
            <p
              className="text-lg max-w-xl mx-auto"
              style={{ color: "var(--fg-secondary)" }}
            >
              Temukan kompetisi, event, dan merchandise eksklusif di satu platform.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Kompetisi",
                description:
                  "7 kompetisi menantang dari berbagai bidang. Tunjukkan kemampuan terbaikmu.",
                color: "var(--color-blue-500)",
                glowColor: "rgba(59, 109, 212, 0.15)",
              },
              {
                icon: Calendar,
                title: "Event",
                description:
                  "5 event inspiratif dengan pembicara terkemuka dan workshop interaktif.",
                color: "var(--color-cyan-500)",
                glowColor: "rgba(6, 182, 212, 0.15)",
              },
              {
                icon: ShoppingBag,
                title: "Merchandise",
                description:
                  "Koleksi merchandise eksklusif Prime UB 2027. Dapatkan sebelum kehabisan!",
                color: "var(--color-violet-500)",
                glowColor: "rgba(139, 92, 246, 0.15)",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl glass transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  borderColor: "var(--border-default)",
                }}
              >
                {/* Hover Glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(ellipse at center, ${feature.glowColor}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `${feature.color}15`,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    <feature.icon
                      className="w-7 h-7"
                      style={{ color: feature.color }}
                    />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p style={{ color: "var(--fg-secondary)" }}>
                    {feature.description}
                  </p>

                  {/* Link */}
                  <div
                    className="flex items-center gap-1 mt-6 text-sm font-medium group-hover:gap-2 transition-all"
                    style={{ color: feature.color }}
                  >
                    Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center text-sm"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--fg-muted)",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <p>© 2027 Prime UB. All rights reserved.</p>
      </footer>
    </main>
  );
}
