export interface ConversionRecord {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  section: "text" | "image" | "audio" | "video";
  fileSize: number;
  timestamp: number;
}

const STORAGE_KEY = "ufc-conversion-history";
const MAX_RECORDS = 20;

export const getHistory = (): ConversionRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addToHistory = (record: Omit<ConversionRecord, "id" | "timestamp">) => {
  const history = getHistory();
  const newRecord: ConversionRecord = {
    ...record,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  const updated = [newRecord, ...history].slice(0, MAX_RECORDS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const timeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
};
