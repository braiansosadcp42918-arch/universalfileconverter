import { motion } from "framer-motion";

interface FormatSelectorProps {
  formats: string[];
  selected: string;
  onSelect: (format: string) => void;
  sectionType: "text" | "image" | "audio" | "video";
}

const FormatSelector = ({ formats, selected, onSelect, sectionType }: FormatSelectorProps) => {
  return (
    <div className="w-full">
      <label className="text-xs font-medium text-muted-foreground mb-2 block">Formato de salida</label>
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <motion.button
            key={format}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(format)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
              selected === format
                ? `btn-section-${sectionType} shadow-md`
                : `bg-muted text-muted-foreground hover:text-foreground`
            }`}
          >
            .{format.toLowerCase()}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;
