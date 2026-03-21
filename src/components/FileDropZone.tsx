import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileText, Image, Music, Video } from "lucide-react";

interface FileDropZoneProps {
  accept: string;
  onFileSelect: (file: File) => void;
  file: File | null;
  onClear: () => void;
  sectionType: "text" | "image" | "audio" | "video";
  maxSizeMB?: number;
}

const icons = {
  text: FileText,
  image: Image,
  audio: Music,
  video: Video,
};

const FileDropZone = ({ accept, onFileSelect, file, onClear, sectionType, maxSizeMB = 100 }: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const Icon = icons[sectionType];

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (f.size > maxSizeMB * 1024 * 1024) {
      setError(`El archivo excede el límite de ${maxSizeMB}MB`);
      return;
    }
    onFileSelect(f);
  }, [maxSizeMB, onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.label
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              isDragging
                ? `border-section-${sectionType} bg-section-${sectionType} scale-[1.02]`
                : `border-border hover:border-section-${sectionType} hover:bg-section-${sectionType}`
            }`}
          >
            <input type="file" accept={accept} onChange={handleInputChange} className="hidden" />
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Upload className={`w-10 h-10 section-${sectionType} opacity-60`} />
            </motion.div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Arrastra tu archivo aquí o <span className={`section-${sectionType} font-semibold`}>selecciona uno</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Máximo {maxSizeMB}MB</p>
            </div>
          </motion.label>
        ) : (
          <motion.div
            key="file-info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-3 p-4 rounded-xl bg-section-${sectionType} border border-section-${sectionType}`}
          >
            <Icon className={`w-8 h-8 section-${sectionType} shrink-0`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={onClear}
              className="p-1.5 rounded-lg hover:bg-background/50 transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default FileDropZone;
