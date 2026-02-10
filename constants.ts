import { PainterStyle, GraphData, Article } from './types';

export const DEFAULT_ARTICLE_CONTENT = `# Medical Device Regulatory Outlook 2025: Navigating the AI Frontier

## Executive Summary
The medical device landscape is undergoing a seismic shift driven by Artificial Intelligence (AI) integration. As we approach 2026, regulatory bodies across the globe are scrambling to harmonize safety standards with innovation speed. This document outlines key regulatory changes in the EU (MDR/AI Act), US (FDA), and China (NMPA).

## 1. The EU AI Act and MDR Interplay
The European Union's AI Act, fully enforceable by mid-2026, introduces a risk-based classification system. 
*   **High-Risk Systems:** AI components in Class IIa/IIb/III devices are automatically "High Risk" under Annex III.
*   **Conformity Assessment:** Notified Bodies (NBs) now require specific AI competency.
*   **Post-Market Surveillance (PMS):** Continuous learning models require a new PMS plan updating cycle every 6 months.

## 2. FDA's Pre-Determined Change Control Plans (PCCP)
The FDA has moved from "locked" algorithms to allowing adaptive AI via PCCPs.
*   **Draft Guidance 2024:** Clarified scope for ML-enabled Software as a Medical Device (SaMD).
*   **Key Requirement:** Manufacturers must specify the *region of modification* and *performance impact* upfront.

## 3. Global Compliance Milestones
*   **Q1 2025:** FDA Final Guidance on PCCP.
*   **Q3 2025:** EU Harmonized Standards for AI Act published.
*   **Q1 2026:** Full application of EU AI Act for Medical Devices.
*   **Q4 2026:** China NMPA mandatory unique device identification (UDI) for Class III AI software.

## 4. Regulatory Burden & Strategy
The cost of compliance is rising. Small manufacturers face a "Valley of Death" between prototype and clearance.
*   **EU Burden:** Estimated +35% administrative cost due to dual MDR/AI Act compliance.
*   **US Advantage:** The PCCP pathway may reduce re-submission times by 40%.

## 5. Technology Integration
Generative AI (GenAI) is the new frontier. Using LLMs for patient triage creates specific "Hallucination Risks" that require specific mitigation controls in the Technical File.

> "Innovation without regulation is dangerous; regulation without innovation is dead." - Industry Analyst`;

export const DEFAULT_GRAPH_DATA: GraphData = {
  timeline: [
    { date: '2025-03-01', event: 'FDA PCCP Guidance', type: 'US' },
    { date: '2025-09-01', event: 'EU AI Standards', type: 'EU' },
    { date: '2026-01-01', event: 'EU AI Act Full Effect', type: 'EU' },
    { date: '2026-12-01', event: 'NMPA UDI Deadline', type: 'CN' },
  ],
  complianceHeatmap: [
    { region: 'North America', score: 85, complexity: 70 },
    { region: 'Europe', score: 60, complexity: 95 },
    { region: 'Asia Pacific', score: 75, complexity: 80 },
    { region: 'LATAM', score: 40, complexity: 60 },
  ],
  riskMatrix: [
    { id: '1', name: 'GenAI Triage', probability: 80, severity: 90, category: 'High' },
    { id: '2', name: 'Img Analysis', probability: 30, severity: 85, category: 'High' },
    { id: '3', name: 'Admin Chatbot', probability: 60, severity: 20, category: 'Low' },
    { id: '4', name: 'Vitals Monitor', probability: 10, severity: 95, category: 'High' },
  ],
  techNetwork: [
    { source: 'AI Act', target: 'MDR', value: 10 },
    { source: 'PCCP', target: 'FDA', value: 10 },
    { source: 'GenAI', target: 'Risk Mgmt', value: 8 },
    { source: 'Risk Mgmt', target: 'PMS', value: 6 },
  ],
  checklist: [
    { phase: 'Gap Analysis', progress: 100, status: 'Done' },
    { phase: 'Tech File Update', progress: 65, status: 'In Progress' },
    { phase: 'Clin. Eval', progress: 30, status: 'Risk' },
    { phase: 'NB Audit', progress: 0, status: 'Pending' },
  ],
  burden: [
    { metric: 'Cost', us: 60, eu: 95, cn: 70 },
    { metric: 'Time', us: 50, eu: 90, cn: 80 },
    { metric: 'Complexity', us: 55, eu: 100, cn: 75 },
    { metric: 'Uncertainty', us: 40, eu: 60, cn: 50 },
  ],
};

export const PAINTER_STYLES: PainterStyle[] = [
  {
    id: 'monet',
    name: 'Impressionist Morning',
    painter: 'Claude Monet',
    colors: { bg: 'bg-blue-50', surface: 'bg-blue-100', text: 'text-slate-700', accent: 'text-pink-400', secondary: 'bg-green-100', border: 'border-blue-200' },
    font: 'font-serif',
    borderRadius: 'rounded-xl',
    borderWidth: 'border-2',
    shadow: 'shadow-lg shadow-blue-200/50',
  },
  {
    id: 'mondrian',
    name: 'Neoplasticism Grid',
    painter: 'Piet Mondrian',
    colors: { bg: 'bg-white', surface: 'bg-white', text: 'text-black', accent: 'text-red-600', secondary: 'bg-yellow-400', border: 'border-black' },
    font: 'font-sans',
    borderRadius: 'rounded-none',
    borderWidth: 'border-4',
    shadow: 'shadow-none',
  },
  {
    id: 'vangogh',
    name: 'Starry Night',
    painter: 'Vincent Van Gogh',
    colors: { bg: 'bg-slate-900', surface: 'bg-blue-900', text: 'text-yellow-100', accent: 'text-yellow-400', secondary: 'bg-blue-800', border: 'border-yellow-600' },
    font: 'font-serif',
    borderRadius: 'rounded-lg',
    borderWidth: 'border-4',
    shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.5)]',
  },
  {
    id: 'picasso',
    name: 'Cubist Fragment',
    painter: 'Pablo Picasso',
    colors: { bg: 'bg-orange-50', surface: 'bg-amber-100', text: 'text-gray-900', accent: 'text-blue-600', secondary: 'bg-orange-200', border: 'border-gray-800' },
    font: 'font-sans',
    borderRadius: 'rounded-sm',
    borderWidth: 'border-r-8 border-b-8 border-t-2 border-l-2',
    shadow: 'shadow-xl',
  },
  {
    id: 'hokusai',
    name: 'Great Wave',
    painter: 'Katsushika Hokusai',
    colors: { bg: 'bg-cyan-50', surface: 'bg-white', text: 'text-slate-800', accent: 'text-blue-700', secondary: 'bg-blue-100', border: 'border-blue-900' },
    font: 'font-serif',
    borderRadius: 'rounded-[2rem]',
    borderWidth: 'border',
    shadow: 'shadow-blue-900/20',
  },
  {
    id: 'warhol',
    name: 'Pop Art Factory',
    painter: 'Andy Warhol',
    colors: { bg: 'bg-pink-200', surface: 'bg-yellow-200', text: 'text-blue-900', accent: 'text-purple-600', secondary: 'bg-cyan-300', border: 'border-black' },
    font: 'font-mono',
    borderRadius: 'rounded-none',
    borderWidth: 'border-4',
    shadow: 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
  },
  {
    id: 'dali',
    name: 'Surreal Persistence',
    painter: 'Salvador Dalí',
    colors: { bg: 'bg-orange-100', surface: 'bg-orange-50', text: 'text-amber-950', accent: 'text-orange-600', secondary: 'bg-amber-200', border: 'border-amber-800' },
    font: 'font-serif',
    borderRadius: 'rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%]',
    borderWidth: 'border',
    shadow: 'shadow-2xl',
  },
  {
    id: 'kandinsky',
    name: 'Abstract Composition',
    painter: 'Wassily Kandinsky',
    colors: { bg: 'bg-white', surface: 'bg-gray-50', text: 'text-gray-900', accent: 'text-red-500', secondary: 'bg-blue-500', border: 'border-gray-300' },
    font: 'font-sans',
    borderRadius: 'rounded-full',
    borderWidth: 'border-2',
    shadow: 'shadow-lg',
  },
  {
    id: 'basquiat',
    name: 'Neo-Expressionist',
    painter: 'Jean-Michel Basquiat',
    colors: { bg: 'bg-stone-200', surface: 'bg-stone-100', text: 'text-black', accent: 'text-red-600', secondary: 'bg-yellow-500', border: 'border-black' },
    font: 'font-mono',
    borderRadius: 'rounded-sm',
    borderWidth: 'border-dashed border-2',
    shadow: 'shadow-none',
  },
  {
    id: 'okeeffe',
    name: 'Desert Flower',
    painter: 'Georgia O\'Keeffe',
    colors: { bg: 'bg-rose-50', surface: 'bg-white', text: 'text-stone-700', accent: 'text-rose-400', secondary: 'bg-orange-100', border: 'border-rose-200' },
    font: 'font-sans',
    borderRadius: 'rounded-3xl',
    borderWidth: 'border-0',
    shadow: 'shadow-[0_20px_50px_rgba(255,100,100,0.1)]',
  },
  {
    id: 'rothko',
    name: 'Color Field',
    painter: 'Mark Rothko',
    colors: { bg: 'bg-orange-800', surface: 'bg-red-700', text: 'text-orange-50', accent: 'text-yellow-400', secondary: 'bg-red-900', border: 'border-transparent' },
    font: 'font-sans',
    borderRadius: 'rounded-none',
    borderWidth: 'border-0',
    shadow: 'shadow-inner shadow-black/50',
  },
  {
    id: 'vermeer',
    name: 'Pearl Light',
    painter: 'Johannes Vermeer',
    colors: { bg: 'bg-slate-800', surface: 'bg-slate-700', text: 'text-yellow-50', accent: 'text-blue-300', secondary: 'bg-yellow-700', border: 'border-slate-600' },
    font: 'font-serif',
    borderRadius: 'rounded-md',
    borderWidth: 'border',
    shadow: 'shadow-2xl shadow-black',
  },
  {
    id: 'kahlo',
    name: 'Viva La Vida',
    painter: 'Frida Kahlo',
    colors: { bg: 'bg-green-700', surface: 'bg-green-600', text: 'text-pink-100', accent: 'text-pink-500', secondary: 'bg-red-500', border: 'border-green-400' },
    font: 'font-sans',
    borderRadius: 'rounded-xl',
    borderWidth: 'border-4 border-double',
    shadow: 'shadow-lg',
  },
  {
    id: 'matisse',
    name: 'Paper Cutouts',
    painter: 'Henri Matisse',
    colors: { bg: 'bg-blue-600', surface: 'bg-white', text: 'text-blue-900', accent: 'text-orange-500', secondary: 'bg-green-500', border: 'border-none' },
    font: 'font-sans',
    borderRadius: 'rounded-3xl',
    borderWidth: 'border-0',
    shadow: 'shadow-none drop-shadow-lg',
  },
  {
    id: 'pollock',
    name: 'Action Drip',
    painter: 'Jackson Pollock',
    colors: { bg: 'bg-stone-100', surface: 'bg-white', text: 'text-black', accent: 'text-stone-600', secondary: 'bg-stone-300', border: 'border-stone-400' },
    font: 'font-mono',
    borderRadius: 'rounded-none',
    borderWidth: 'border',
    shadow: 'shadow-sm', // Simulating chaos is hard with just shadow, relied on UI texture logic elsewhere
  },
  {
    id: 'klimt',
    name: 'Golden Kiss',
    painter: 'Gustav Klimt',
    colors: { bg: 'bg-stone-900', surface: 'bg-stone-800', text: 'text-yellow-100', accent: 'text-yellow-400', secondary: 'bg-yellow-600', border: 'border-yellow-500' },
    font: 'font-serif',
    borderRadius: 'rounded-sm',
    borderWidth: 'border',
    shadow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
  },
  {
    id: 'hiroshige',
    name: 'Floating World',
    painter: 'Utagawa Hiroshige',
    colors: { bg: 'bg-indigo-50', surface: 'bg-white', text: 'text-indigo-900', accent: 'text-red-500', secondary: 'bg-indigo-200', border: 'border-indigo-200' },
    font: 'font-serif',
    borderRadius: 'rounded-lg',
    borderWidth: 'border',
    shadow: 'shadow-md',
  },
  {
    id: 'mucha',
    name: 'Art Nouveau',
    painter: 'Alphonse Mucha',
    colors: { bg: 'bg-amber-50', surface: 'bg-orange-50', text: 'text-amber-900', accent: 'text-amber-600', secondary: 'bg-emerald-100', border: 'border-amber-300' },
    font: 'font-serif',
    borderRadius: 'rounded-t-2xl rounded-b-lg',
    borderWidth: 'border-2',
    shadow: 'shadow-lg shadow-amber-900/10',
  },
  {
    id: 'turner',
    name: 'Light & Steam',
    painter: 'J.M.W. Turner',
    colors: { bg: 'bg-stone-200', surface: 'bg-stone-100', text: 'text-stone-700', accent: 'text-orange-400', secondary: 'bg-yellow-100', border: 'border-stone-300' },
    font: 'font-serif',
    borderRadius: 'rounded-sm',
    borderWidth: 'border-0',
    shadow: 'blur-sm shadow-xl', // Experimental blur
  },
  {
    id: 'caravaggio',
    name: 'Chiaroscuro',
    painter: 'Caravaggio',
    colors: { bg: 'bg-black', surface: 'bg-gray-900', text: 'text-gray-100', accent: 'text-red-800', secondary: 'bg-gray-800', border: 'border-gray-700' },
    font: 'font-serif',
    borderRadius: 'rounded-sm',
    borderWidth: 'border',
    shadow: 'shadow-[0_0_50px_rgba(0,0,0,1)]',
  }
];

export const UI_STRINGS = {
  en: {
    dashboard: 'Dashboard',
    editor: 'Editor',
    analytics: 'Analytics',
    settings: 'Settings',
    wordCount: 'Words',
    readTime: 'Read Time',
    aiMagic: 'AI Magic',
    askAi: 'Ask AI',
    upload: 'Upload',
    download: 'Download',
    model: 'Model',
    theme: 'Theme',
    style: 'Style Jackpot',
    lastSaved: 'Last saved',
    processing: 'AI Processing...',
    graphs: {
      timeline: 'Regulatory Timeline',
      heatmap: 'Global Compliance Heatmap',
      risk: 'AI Risk Classification',
      network: 'Technology Network',
      checklist: 'Checklist Progress',
      burden: 'Burden Analysis'
    }
  },
  'zh-TW': {
    dashboard: '儀表板 (Dashboard)',
    editor: '編輯器 (Editor)',
    analytics: '分析 (Analytics)',
    settings: '設定 (Settings)',
    wordCount: '字數',
    readTime: '閱讀時間',
    aiMagic: 'AI 魔法',
    askAi: '詢問 AI',
    upload: '上傳',
    download: '下載',
    model: '模型',
    theme: '主題',
    style: '風格拉霸 (Style Jackpot)',
    lastSaved: '最後儲存',
    processing: 'AI 運算中...',
    graphs: {
      timeline: '法規時間軸 (Timeline)',
      heatmap: '全球合規熱圖 (Heatmap)',
      risk: 'AI 風險分類 (Risk Matrix)',
      network: '技術網絡 (Network)',
      checklist: '檢查表進度 (Checklist)',
      burden: '負擔分析 (Burden)'
    }
  }
};
