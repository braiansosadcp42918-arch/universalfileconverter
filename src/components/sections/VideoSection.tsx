import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Video, MonitorPlay } from "lucide-react";
import FileDropZone from "../FileDropZone";
import FormatSelector from "../FormatSelector";
import ConversionProgress from "../ConversionProgress";

const VIDEO_FORMATS = ["MP4", "MKV", "AVI", "MOV", "WEBM", "FLV"];
const ACCEPT = ".mp4,.mkv,.avi,.mov,.webm,.flv,.wmv";

const VideoSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("MP4");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [resolution, setResolution] = useState("original");
  const [fps, setFps] = useState("original");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setVideoUrl(null);
    }
  }, [file]);

  const simulateConversion = useCallback(async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setConverted(false);

    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 80));
      setProgress(i);
    }

    setConverting(false);
    setConverted(true);
  }, [file]);

  const handleDownload = useCallback(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.${outputFormat.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [file, outputFormat]);

  const handleClear = () => {
    setFile(null);
    setConverted(false);
    setProgress(0);
    setVideoUrl(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-section-video">
          <Video className="w-5 h-5 section-video" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Convertir Video</h2>
          <p className="text-xs text-muted-foreground">MP4, MKV, AVI, MOV, WEBM, FLV</p>
        </div>
      </div>

      <FileDropZone
        accept={ACCEPT}
        onFileSelect={setFile}
        file={file}
        onClear={handleClear}
        sectionType="video"
      />

      {videoUrl && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden border border-border">
          <video src={videoUrl} controls className="w-full max-h-64 bg-muted">
            <track kind="captions" />
          </video>
        </motion.div>
      )}

      {file && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <FormatSelector
            formats={VIDEO_FORMATS}
            selected={outputFormat}
            onSelect={setOutputFormat}
            sectionType="video"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block flex items-center gap-1">
                <MonitorPlay className="w-3 h-3" /> Resolución
              </label>
              <div className="flex flex-wrap gap-2">
                {["original", "1080p", "720p", "480p"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setResolution(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      resolution === r ? "btn-section-video shadow-md" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">FPS</label>
              <div className="flex flex-wrap gap-2">
                {["original", "60", "30", "24"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFps(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      fps === f ? "btn-section-video shadow-md" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {converting && <ConversionProgress progress={progress} sectionType="video" />}

          <div className="flex gap-3">
            {!converted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateConversion}
                disabled={converting}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-video font-medium text-sm disabled:opacity-50 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                Convertir
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-video font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                Descargar .{outputFormat.toLowerCase()}
              </motion.button>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center italic">
            ⚠️ La conversión de video real requiere un servidor con FFmpeg. Esta demo simula el proceso.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VideoSection;
