import { motion } from "framer-motion";

interface ConversionProgressProps {
  progress: number;
  sectionType: "text" | "image" | "audio" | "video";
}

const ConversionProgress = ({ progress, sectionType }: ConversionProgressProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
        <span>Convirtiendo...</span>
        <span className="font-mono">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full btn-section-${sectionType}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ConversionProgress;
