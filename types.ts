export type Language = 'en' | 'zh-TW';

export interface Article {
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

export interface PainterStyle {
  id: string;
  name: string;
  painter: string;
  colors: {
    bg: string;
    surface: string;
    text: string;
    accent: string;
    secondary: string;
    border: string;
  };
  font: 'font-sans' | 'font-serif' | 'font-mono';
  borderRadius: string;
  borderWidth: string;
  shadow: string;
  texture?: string; // CSS background pattern if any
}

export interface GraphData {
  timeline: { date: string; event: string; type: string }[];
  complianceHeatmap: { region: string; score: number; complexity: number }[];
  riskMatrix: { id: string; name: string; probability: number; severity: number; category: string }[];
  techNetwork: { source: string; target: string; value: number }[]; // Simplified for visualization
  checklist: { phase: string; progress: number; status: string }[];
  burden: { metric: string; us: number; eu: number; cn: number }[];
}

export type AiModel = 'gemini-3-flash-preview' | 'gemini-2.5-flash-latest';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}
