import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AdBannerProps {
  variant?: "horizontal" | "vertical" | "square";
  label?: string;
  adSlot?: string;
}

const sizes = {
  horizontal: { className: "w-full min-h-[90px]", style: { minHeight: "90px" } },
  vertical: { className: "w-full min-h-[600px]", style: { minHeight: "600px" } },
  square: { className: "w-full min-h-[250px]", style: { minHeight: "250px" } },
};

const AdBanner = ({ variant = "horizontal", adSlot }: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const config = sizes[variant];

  useEffect(() => {
    // If Google AdSense is loaded and we have a slot, push the ad
    if (adSlot && typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // AdSense not ready
      }
    }
  }, [adSlot]);

  return (
    <motion.div
      ref={adRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={`${config.className} rounded-xl overflow-hidden`}
      style={config.style}
    >
      {adSlot ? (
        // Real Google AdSense ad
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-5756032357284209"
          data-ad-slot={adSlot}
          data-ad-format={variant === "horizontal" ? "horizontal" : variant === "vertical" ? "vertical" : "rectangle"}
          data-full-width-responsive="true"
        />
      ) : (
        // Placeholder ad with professional look
        <div className="w-full h-full border border-border/60 bg-gradient-to-br from-muted/60 to-muted/30 flex flex-col items-center justify-center gap-2 select-none rounded-xl">
          <div className="flex items-center gap-1.5 opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Ad Space
            </span>
          </div>
          <span className="text-[9px] text-muted-foreground/30 font-mono">
            {variant === "horizontal" ? "728×90 / Responsive" : variant === "vertical" ? "160×600" : "300×250"}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AdBanner;
