import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, FileText, ImageIcon, Music, Video, ArrowRight } from "lucide-react";
import { getHistory, clearHistory, formatFileSize, timeAgo, type ConversionRecord } from "@/lib/conversionHistory";
import { useLanguage } from "@/contexts/LanguageContext";

const sectionIcons = {
  text: FileText,
  image: ImageIcon,
  audio: Music,
  video: Video,
};

const ConversionHistory = () => {
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    setHistory(getHistory());
    const interval = setInterval(() => setHistory(getHistory()), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">{t("history.title")}</h3>
        </div>
        <p className="text-xs text-muted-foreground text-center py-4">{t("history.empty")}</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{t("history.title")}</h3>
          <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
            {history.length}
          </span>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          {t("history.clear")}
        </button>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        <AnimatePresence>
          {history.map((record) => {
            const Icon = sectionIcons[record.section];
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className={`p-1.5 rounded-lg bg-section-${record.section}`}>
                  <Icon className={`w-3 h-3 section-${record.section}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{record.fileName}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="font-mono">.{record.fromFormat.toLowerCase()}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                    <span className="font-mono">.{record.toFormat.toLowerCase()}</span>
                    <span className="mx-1">•</span>
                    <span>{formatFileSize(record.fileSize)}</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground/60 whitespace-nowrap">
                  {timeAgo(record.timestamp)}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConversionHistory;
