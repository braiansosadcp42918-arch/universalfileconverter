import { motion } from "framer-motion";
import {
  FileText, ImageIcon, Music, Video, Zap, Shield, Clock, Globe,
  ArrowRight, Star, Users, TrendingUp, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AdBanner from "@/components/AdBanner";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t("feature.secure.title"), desc: t("feature.secure.desc") },
    { icon: Zap, title: t("feature.fast.title"), desc: t("feature.fast.desc") },
    { icon: Globe, title: t("feature.free.title"), desc: t("feature.free.desc") },
    { icon: Clock, title: t("feature.available.title"), desc: t("feature.available.desc") },
  ];

  const stats = [
    { value: "50+", label: t("stats.formats"), icon: Sparkles },
    { value: "1M+", label: t("stats.conversions"), icon: TrendingUp },
    { value: "100K+", label: t("stats.users"), icon: Users },
    { value: "4.9", label: t("stats.rating"), icon: Star },
  ];

  const formatCategories = [
    { icon: FileText, title: t("formats.text"), formats: ["TXT", "PDF", "DOCX", "RTF", "HTML", "MD"], color: "text" },
    { icon: ImageIcon, title: t("formats.images"), formats: ["JPG", "PNG", "WEBP", "GIF", "BMP", "SVG"], color: "image" },
    { icon: Music, title: t("formats.audio"), formats: ["MP3", "WAV", "OGG", "AAC", "FLAC", "M4A"], color: "audio" },
    { icon: Video, title: t("formats.video"), formats: ["MP4", "MKV", "AVI", "MOV", "WEBM", "FLV"], color: "video" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-base font-bold text-foreground tracking-tight">
              Universal File Converter
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="#features" className="hidden sm:inline-flex text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.features")}
            </a>
            <a href="#formats" className="hidden sm:inline-flex text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.formats")}
            </a>
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              {t("hero.badge")}
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
              {t("hero.title1")}{" "}
              <span className="text-primary">{t("hero.title2")}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              {t("hero.desc")}
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/converter"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold text-foreground font-mono">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <AdBanner variant="horizontal" />
      </div>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
            {t("features.title")}
          </h3>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            {t("features.desc")}
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-6 group hover:border-primary/30 transition-colors"
              >
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1.5">{feature.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <AdBanner variant="horizontal" />
      </div>

      {/* Formats */}
      <section id="formats" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-8 text-center">
            {t("formats.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formatCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="text-center">
                  <div className={`p-3 rounded-xl bg-section-${cat.color} w-fit mx-auto mb-3`}>
                    <Icon className={`w-6 h-6 section-${cat.color}`} />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">{cat.title}</h4>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {cat.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-[10px] font-mono font-medium"
                      >
                        .{fmt.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl p-8 sm:p-12 text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
              {t("cta.title")}
            </h3>
            <p className="text-primary-foreground/80 text-sm mb-6 max-w-md mx-auto">
              {t("cta.desc")}
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/converter"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background text-foreground font-semibold text-sm shadow-lg"
              >
                {t("cta.button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <AdBanner variant="horizontal" />
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-primary">
                  <Zap className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <span className="text-sm font-bold text-foreground">Universal File Converter</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("footer.desc")}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">{t("footer.formats")}</h5>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li>{t("formats.text")}: TXT, PDF, DOCX, HTML, MD</li>
                <li>{t("formats.images")}: JPG, PNG, WEBP, GIF</li>
                <li>{t("formats.audio")}: MP3, WAV, OGG, FLAC</li>
                <li>{t("formats.video")}: MP4, MKV, AVI, WEBM</li>
              </ul>
            </div>
            <div>
              <h5 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">{t("footer.legal")}</h5>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="hover:text-foreground cursor-pointer transition-colors">{t("footer.privacy")}</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">{t("footer.terms")}</li>
                <li className="hover:text-foreground cursor-pointer transition-colors">{t("footer.contact")}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-muted-foreground">
              © 2026 Universal File Converter. {t("footer.rights")}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {t("footer.note")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
