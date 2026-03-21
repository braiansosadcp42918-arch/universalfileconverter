import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, ImageIcon, Maximize2 } from "lucide-react";
import FileDropZone from "../FileDropZone";
import FormatSelector from "../FormatSelector";
import ConversionProgress from "../ConversionProgress";
import { addToHistory } from "@/lib/conversionHistory";

const IMAGE_FORMATS = ["JPG", "PNG", "WEBP", "GIF", "BMP"];
const ACCEPT = ".jpg,.jpeg,.png,.webp,.gif,.bmp,.tiff,.svg";

const ImageSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("PNG");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState(90);
  const [resizeW, setResizeW] = useState("");
  const [resizeH, setResizeH] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [file]);

  const convertImage = useCallback(async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setConverted(false);

    const img = new window.Image();
    const url = URL.createObjectURL(file);
    
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = url;
    });

    // Simulate progress
    for (let i = 0; i <= 60; i += 10) {
      await new Promise(r => setTimeout(r, 40));
      setProgress(i);
    }

    const canvas = canvasRef.current!;
    const w = resizeW ? parseInt(resizeW) : img.naturalWidth;
    const h = resizeH ? parseInt(resizeH) : img.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);

    setProgress(80);

    const mimeMap: Record<string, string> = {
      JPG: "image/jpeg",
      PNG: "image/png",
      WEBP: "image/webp",
      GIF: "image/png",
      BMP: "image/bmp",
    };

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (b) => resolve(b!),
        mimeMap[outputFormat] || "image/png",
        quality / 100
      );
    });

    setProgress(100);
    URL.revokeObjectURL(url);
    setConvertedBlob(blob);
    setConverting(false);
    setConverted(true);

    const ext = file.name.split(".").pop()?.toUpperCase() || "IMG";
    addToHistory({
      fileName: file.name,
      fromFormat: ext,
      toFormat: outputFormat,
      section: "image",
      fileSize: file.size,
    });
  }, [file, outputFormat, quality, resizeW, resizeH]);

  const handleDownload = useCallback(() => {
    if (!convertedBlob || !file) return;
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.${outputFormat.toLowerCase() === "jpg" ? "jpg" : outputFormat.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [convertedBlob, file, outputFormat]);

  const handleClear = () => {
    setFile(null);
    setConverted(false);
    setConvertedBlob(null);
    setProgress(0);
    setPreview(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-section-image">
          <ImageIcon className="w-5 h-5 section-image" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Convertir Imágenes</h2>
          <p className="text-xs text-muted-foreground">JPG, PNG, WEBP, GIF, BMP, TIFF, SVG</p>
        </div>
      </div>

      <FileDropZone
        accept={ACCEPT}
        onFileSelect={setFile}
        file={file}
        onClear={handleClear}
        sectionType="image"
      />

      {preview && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden border border-border">
          <img src={preview} alt="Vista previa" className="w-full max-h-64 object-contain bg-muted" />
        </motion.div>
      )}

      {file && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <FormatSelector
            formats={IMAGE_FORMATS}
            selected={outputFormat}
            onSelect={setOutputFormat}
            sectionType="image"
          />

          {/* Options */}
          <div className="space-y-3">
            <label className="text-xs font-medium text-muted-foreground block">Opciones</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Calidad ({quality}%)</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--image-section))]"
                />
              </div>
              <div className="flex gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Maximize2 className="w-3 h-3" />Ancho</label>
                  <input
                    type="number"
                    placeholder="Auto"
                    value={resizeW}
                    onChange={(e) => setResizeW(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-muted border border-border text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Alto</label>
                  <input
                    type="number"
                    placeholder="Auto"
                    value={resizeH}
                    onChange={(e) => setResizeH(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-muted border border-border text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {converting && <ConversionProgress progress={progress} sectionType="image" />}

          <div className="flex gap-3">
            {!converted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={convertImage}
                disabled={converting}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-image font-medium text-sm disabled:opacity-50 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                Convertir
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-image font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                Descargar .{outputFormat.toLowerCase()}
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageSection;
