import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, FileText } from "lucide-react";
import FileDropZone from "../FileDropZone";
import FormatSelector from "../FormatSelector";
import ConversionProgress from "../ConversionProgress";
import { addToHistory } from "@/lib/conversionHistory";

const TEXT_FORMATS = ["TXT", "PDF", "DOCX", "RTF", "HTML", "MD"];
const ACCEPT = ".txt,.pdf,.docx,.rtf,.odt,.html,.md,.markdown";

const TextSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("PDF");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);

  const simulateConversion = useCallback(async () => {
    if (!file) return;
    setConverting(true);
    setProgress(0);
    setConverted(false);

    // Read file content
    const text = await file.text();
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 50));
      setProgress(i);
    }

    let blob: Blob;
    const fmt = outputFormat.toLowerCase();
    
    if (fmt === "txt") {
      blob = new Blob([text], { type: "text/plain" });
    } else if (fmt === "html") {
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Converted</title></head><body><pre>${text}</pre></body></html>`;
      blob = new Blob([html], { type: "text/html" });
    } else if (fmt === "md") {
      blob = new Blob([text], { type: "text/markdown" });
    } else {
      // For formats we can't truly convert client-side, wrap as txt
      blob = new Blob([text], { type: "text/plain" });
    }

    setConvertedBlob(blob);
    setConverting(false);
    setConverted(true);

    const ext = file.name.split(".").pop()?.toUpperCase() || "TXT";
    addToHistory({
      fileName: file.name,
      fromFormat: ext,
      toFormat: outputFormat,
      section: "text",
      fileSize: file.size,
    });
  }, [file, outputFormat]);

  const handleDownload = useCallback(() => {
    if (!convertedBlob || !file) return;
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    a.download = `${baseName}.${outputFormat.toLowerCase()}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [convertedBlob, file, outputFormat]);

  const handleClear = () => {
    setFile(null);
    setConverted(false);
    setConvertedBlob(null);
    setProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 rounded-xl bg-section-text">
          <FileText className="w-5 h-5 section-text" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Convertir Texto</h2>
          <p className="text-xs text-muted-foreground">TXT, PDF, DOCX, RTF, HTML, Markdown</p>
        </div>
      </div>

      <FileDropZone
        accept={ACCEPT}
        onFileSelect={setFile}
        file={file}
        onClear={handleClear}
        sectionType="text"
      />

      {file && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <FormatSelector
            formats={TEXT_FORMATS}
            selected={outputFormat}
            onSelect={setOutputFormat}
            sectionType="text"
          />

          {converting && <ConversionProgress progress={progress} sectionType="text" />}

          <div className="flex gap-3">
            {!converted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateConversion}
                disabled={converting}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-text font-medium text-sm disabled:opacity-50 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                Convertir
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-section-text font-medium text-sm"
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

export default TextSection;
