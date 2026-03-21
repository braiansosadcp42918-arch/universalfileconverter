import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Music, Play, Pause } from "lucide-react";
import FileDropZone from "../FileDropZone";
import FormatSelector from "../FormatSelector";
import ConversionProgress from "../ConversionProgress";

const AUDIO_FORMATS = ["MP3", "WAV", "OGG", "AAC", "FLAC", "M4A"];
const ACCEPT = ".mp3,.wav,.ogg,.aac,.flac,.m4a,.wma";

const AudioSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("MP3");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);
  const [bitrate, setBitrate] = useState("192");

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      const el = new Audio(url);
      setAudioEl(el);
      el.addEventListener("ended", () => setIsPlaying(false));
      return () => {
        el.pause();
        URL.revokeObjectURL(url);
      };
    } else {
      setAudioUrl(null);
      setAudioEl(null);
    }
  }, [file]);

  const togglePlay = () => {
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
    } else {
      audioEl.play();
    }
    setIsPlaying(!isPlaying);
  };

  const simulateConversion = useCallback(async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setConverted(false);

    for (let i = 0; i <= 100; i += 3) {
      await new Promise(r => setTimeout(r, 60));
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
    setIsPlaying(false);
    audioEl?.pause();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-section-audio">
          <Music className="w-5 h-5 section-audio" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Convertir Audio</h2>
          <p className="text-xs text-muted-foreground">MP3, WAV, OGG, AAC, FLAC, M4A</p>
        </div>
      </div>

      <FileDropZone
        accept={ACCEPT}
        onFileSelect={setFile}
        file={file}
        onClear={handleClear}
        sectionType="audio"
      />

      {file && audioUrl && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Player */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-section-audio border border-section-audio">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-2.5 rounded-full btn-section-audio"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
            <audio src={audioUrl} className="hidden" />
            <div className="flex-1">
              <div className="h-8 flex items-center gap-0.5">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full btn-section-audio"
                    animate={{
                      height: isPlaying ? `${Math.random() * 24 + 8}px` : "4px",
                    }}
                    transition={{ duration: 0.15, repeat: isPlaying ? Infinity : 0, repeatType: "reverse" }}
                  />
                ))}
              </div>
            </div>
          </div>

          <FormatSelector
            formats={AUDIO_FORMATS}
            selected={outputFormat}
            onSelect={setOutputFormat}
            sectionType="audio"
          />

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Bitrate</label>
            <div className="flex gap-2">
              {["128", "192", "256", "320"].map((br) => (
                <button
                  key={br}
                  onClick={() => setBitrate(br)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    bitrate === br ? "btn-section-audio shadow-md" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {br}kbps
                </button>
              ))}
            </div>
          </div>

          {converting && <ConversionProgress progress={progress} sectionType="audio" />}

          <div className="flex gap-3">
            {!converted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateConversion}
                disabled={converting}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-audio font-medium text-sm disabled:opacity-50 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                Convertir
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-audio font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                Descargar .{outputFormat.toLowerCase()}
              </motion.button>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center italic">
            ⚠️ La conversión de audio real requiere un servidor con FFmpeg. Esta demo simula el proceso.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AudioSection;
