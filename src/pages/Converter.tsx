import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ImageIcon, Music, Video, Zap, ArrowLeft, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkModeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import TextSection from "@/components/sections/TextSection";
import ImageSection from "@/components/sections/ImageSection";
import AudioSection from "@/components/sections/AudioSection";
import VideoSection from "@/components/sections/VideoSection";
import ConversionHistory from "@/components/ConversionHistory";
import AdBanner from "@/components/AdBanner";
import { useLanguage } from "@/contexts/LanguageContext";

const tabs = [
  { id: "text", key: "tab.text", icon: FileText, section: "text" as const },
  { id: "image", key: "tab.images", icon: ImageIcon, section: "image" as const },
  { id: "audio", key: "tab.audio", icon: Music, section: "audio" as const },
  { id: "video", key: "tab.video", icon: Video, section: "video" as const },
];

const sections: Record<string, React.ReactNode> = {
  text: <TextSection />,
  image: <ImageSection />,
  audio: <AudioSection />,
  video: <VideoSection />,
};

const Converter = () => {
  const [activeTab, setActiveTab] = useState("text");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t("converter.back")}</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">
                {t("converter.title")}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Top Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <AdBanner variant="horizontal" />
      </div>

      {/* Converter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6">
          {/* Main Area */}
          <div className="flex-1 min-w-0">
            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground tracking-tight">
                    {t("converter.title")}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {t("hero.desc").substring(0, 60)}...
                  </p>
                </div>
              </div>

              <nav className="grid grid-cols-4 gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative group flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 ${
                        isActive
                          ? `border-section-${tab.section} bg-section-${tab.section} shadow-lg`
                          : "border-transparent bg-card hover:bg-muted/50 hover:border-border"
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl transition-all duration-300 ${
                          isActive
                            ? `btn-section-${tab.section} shadow-md`
                            : "bg-muted group-hover:bg-muted-foreground/10"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      </div>
                      <span
                        className={`text-xs font-semibold transition-colors ${
                          isActive ? `section-${tab.section}` : "text-muted-foreground"
                        }`}
                      >
                        {t(tab.key)}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="active-tab-converter"
                          className={`absolute -bottom-px left-4 right-4 h-0.5 rounded-full btn-section-${tab.section}`}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Converter Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={`glass-card p-6 sm:p-8 border-t-4 ${
                  activeTab === "text" ? "border-t-[hsl(var(--text-section))]" :
                  activeTab === "image" ? "border-t-[hsl(var(--image-section))]" :
                  activeTab === "audio" ? "border-t-[hsl(var(--audio-section))]" :
                  "border-t-[hsl(var(--video-section))]"
                }`}>
                  {sections[activeTab]}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* History */}
            <div className="mt-6">
              <ConversionHistory />
            </div>

            {/* Mobile Ad */}
            <div className="mt-6 lg:hidden">
              <AdBanner variant="horizontal" />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-6 w-[300px] shrink-0 pt-[88px]">
            <AdBanner variant="square" />
            <AdBanner variant="vertical" />
          </aside>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <AdBanner variant="horizontal" />
      </div>
    </div>
  );
};

export default Converter;
