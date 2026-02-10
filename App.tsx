import React, { useState, useEffect, useRef } from 'react';
import { Article, Language, PainterStyle, AiModel, GraphData, ChatMessage } from './types';
import { PAINTER_STYLES, DEFAULT_ARTICLE_CONTENT, DEFAULT_GRAPH_DATA, UI_STRINGS } from './constants';
import { StyledCard, StyledButton, LoadingOverlay } from './components/UiComponents';
import { StyleJackpot } from './components/StyleJackpot';
import { GenericGraph } from './components/Visualizations';
import { generateGraphData, chatWithArticle, runMagicTool } from './services/geminiService';
import ReactMarkdown from 'react-markdown';
import { 
    LayoutDashboard, FileText, Settings, Wand2, Upload, Download, 
    MessageSquare, Globe, Moon, Sun, RefreshCw, Send, CheckCircle2,
    AlertCircle, FileDown, Plus, Minus
} from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [currentStyle, setCurrentStyle] = useState<PainterStyle>(PAINTER_STYLES[0]);
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'editor'>('dashboard');
  
  const [article, setArticle] = useState<Article>({
    id: '1',
    title: 'MedTech Regulatory Outlook 2025',
    content: DEFAULT_ARTICLE_CONTENT,
    lastModified: Date.now()
  });
  
  const [graphData, setGraphData] = useState<GraphData>(DEFAULT_GRAPH_DATA);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // AI State
  const [selectedModel, setSelectedModel] = useState<AiModel>('gemini-3-flash-preview');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Editor State
  const [editMode, setEditMode] = useState<'markdown' | 'rich'>('markdown');
  const [editorContent, setEditorContent] = useState(article.content);

  const strings = UI_STRINGS[language];

  // --- EFFECTS ---
  useEffect(() => {
    // Apply Dark Mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- HANDLERS ---
  const handleStyleChange = (style: PainterStyle) => setCurrentStyle(style);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setArticle(prev => ({ ...prev, content: text, lastModified: Date.now() }));
        setEditorContent(text);
        handleRefreshGraphs(text); // Auto refresh graphs
      };
      reader.readAsText(file);
    }
  };

  const handleExport = (format: 'md' | 'txt') => {
    const blob = new Blob([article.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `article.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefreshGraphs = async (text: string = article.content) => {
    setLoading(true);
    setLoadingText('AI Analyzing & Generating Graphs...');
    try {
      const newData = await generateGraphData(text, selectedModel);
      if (newData) setGraphData(newData);
    } catch (e) {
      alert('Failed to regenerate graphs. Check API Key.');
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: chatInput, timestamp: Date.now() };
    setChatHistory(prev => [...prev, newMessage]);
    setChatInput('');
    
    // Simulate thinking
    setChatHistory(prev => [...prev, { id: 'temp', role: 'model', content: '...', timestamp: Date.now() }]);

    try {
        const response = await chatWithArticle(
            chatHistory.map(m => ({ role: m.role, content: m.content })), 
            article.content, 
            selectedModel
        );
        setChatHistory(prev => prev.filter(m => m.id !== 'temp').concat({
            id: (Date.now() + 1).toString(),
            role: 'model',
            content: response || 'Error generating response',
            timestamp: Date.now()
        }));
    } catch (e) {
        setChatHistory(prev => prev.filter(m => m.id !== 'temp'));
        alert('Chat error');
    }
  };

  const handleMagicTool = async (tool: string) => {
    setLoading(true);
    setLoadingText(`Running ${tool}...`);
    try {
        const result = await runMagicTool(tool, article.content, selectedModel);
        if (result) {
            // Append result to chat or editor? Let's append to chat for now
            setChatHistory(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                content: `**Magic Tool (${tool}) Result:**\n\n${result}`,
                timestamp: Date.now()
            }]);
            setIsChatOpen(true);
        }
    } catch(e) {
        alert('Tool failed');
    } finally {
        setLoading(false);
    }
  };

  const stats = {
      words: article.content.split(/\s+/).length,
      readTime: Math.ceil(article.content.split(/\s+/).length / 200)
  };

  // --- RENDER HELPERS ---
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Object.keys(graphData).map((key) => (
        <StyledCard key={key} styleData={currentStyle} className="h-80 p-4 flex flex-col">
            <h3 className={`text-lg font-bold mb-2 ${currentStyle.font}`}>
                {strings.graphs[key as keyof typeof strings.graphs]}
            </h3>
            <div className="flex-grow w-full min-h-0">
                <GenericGraph type={key as keyof GraphData} data={graphData} styleData={currentStyle} />
            </div>
        </StyledCard>
      ))}
    </div>
  );

  const renderEditor = () => (
    <div className="h-full flex flex-col gap-4 p-4">
        <StyledCard styleData={currentStyle} className="p-4 flex-grow flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                 <div className="flex gap-2">
                    <StyledButton styleData={currentStyle} variant={editMode === 'markdown' ? 'primary' : 'secondary'} onClick={() => setEditMode('markdown')}>Markdown</StyledButton>
                    <StyledButton styleData={currentStyle} variant={editMode === 'rich' ? 'primary' : 'secondary'} onClick={() => setEditMode('rich')}>Preview</StyledButton>
                 </div>
                 <span className="text-sm opacity-70">{strings.wordCount}: {stats.words}</span>
            </div>
            {editMode === 'markdown' ? (
                <textarea 
                    className="w-full h-full bg-transparent resize-none focus:outline-none font-mono"
                    value={editorContent}
                    onChange={(e) => {
                        setEditorContent(e.target.value);
                        setArticle(prev => ({...prev, content: e.target.value, lastModified: Date.now()}));
                    }}
                />
            ) : (
                <div className="prose dark:prose-invert max-w-none overflow-y-auto h-full">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
            )}
        </StyledCard>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-700 ${currentStyle.colors.bg} ${currentStyle.font}`}>
        <LoadingOverlay visible={loading} text={loadingText} />

        {/* --- HEADER --- */}
        <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${currentStyle.colors.surface} ${currentStyle.colors.border} bg-opacity-80`}>
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${currentStyle.colors.accent} text-white`}>
                        <Globe size={20} />
                    </div>
                    <h1 className="text-xl font-bold hidden md:block">OPAL MedTech AI</h1>
                </div>

                <div className="flex items-center gap-3">
                    <StyleJackpot label={strings.style} onSelect={handleStyleChange} currentStyle={currentStyle} />
                    
                    <button onClick={() => setLanguage(l => l === 'en' ? 'zh-TW' : 'en')} className="p-2 hover:bg-black/5 rounded-full">
                        {language === 'en' ? 'EN' : '繁中'}
                    </button>
                    
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-black/5 rounded-full">
                        {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </div>
        </header>

        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="container mx-auto flex h-[calc(100vh-64px)] overflow-hidden">
            
            {/* --- SIDEBAR --- */}
            <aside className={`w-16 md:w-64 flex-shrink-0 flex flex-col border-r ${currentStyle.colors.border} ${currentStyle.colors.surface}`}>
                <nav className="flex-1 p-2 space-y-2">
                    <StyledButton 
                        styleData={currentStyle} 
                        variant={activeTab === 'dashboard' ? 'primary' : 'icon'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <LayoutDashboard size={20} /> <span className="hidden md:inline">{strings.dashboard}</span>
                    </StyledButton>
                    <StyledButton 
                        styleData={currentStyle} 
                        variant={activeTab === 'editor' ? 'primary' : 'icon'}
                        className="w-full justify-start"
                        onClick={() => setActiveTab('editor')}
                    >
                        <FileText size={20} /> <span className="hidden md:inline">{strings.editor}</span>
                    </StyledButton>

                    <hr className={`my-4 ${currentStyle.colors.border}`} />
                    
                    <div className="px-2 mb-2 text-xs opacity-50 hidden md:block uppercase tracking-wider">{strings.aiMagic}</div>
                    {[
                        { id: 'summarize', icon: FileText, label: 'Summarizer' },
                        { id: 'keywords', icon: CheckCircle2, label: 'Keywords' },
                        { id: 'gap', icon: AlertCircle, label: 'Gap Analysis' },
                        { id: 'trend', icon: Wand2, label: 'Trend Predictor' }
                    ].map(tool => (
                        <StyledButton
                            key={tool.id}
                            styleData={currentStyle}
                            variant="icon"
                            className="w-full justify-start text-sm hover:translate-x-1 transition-transform"
                            onClick={() => handleMagicTool(tool.id)}
                        >
                            <tool.icon size={16} /> <span className="hidden md:inline">{tool.label}</span>
                        </StyledButton>
                    ))}
                </nav>

                <div className="p-4 space-y-2 border-t border-gray-200/20">
                    <div className="relative group">
                         <label className="flex items-center justify-center md:justify-start gap-2 cursor-pointer p-2 hover:bg-black/5 rounded">
                            <Upload size={18} /> <span className="hidden md:inline">{strings.upload}</span>
                            <input type="file" className="hidden" accept=".md,.txt" onChange={handleFileUpload} />
                        </label>
                    </div>
                    <button onClick={() => handleExport('md')} className="flex items-center justify-center md:justify-start gap-2 w-full p-2 hover:bg-black/5 rounded">
                        <Download size={18} /> <span className="hidden md:inline">{strings.download}</span>
                    </button>
                </div>
            </aside>

            {/* --- WORKSPACE --- */}
            <main className="flex-1 overflow-auto relative">
                {/* Toolbar */}
                <div className={`sticky top-0 z-10 p-2 flex justify-between items-center backdrop-blur-sm ${currentStyle.colors.bg}/80`}>
                     <div className="flex gap-2 items-center">
                        <select 
                            value={selectedModel} 
                            onChange={(e) => setSelectedModel(e.target.value as AiModel)}
                            className={`text-sm p-1 rounded bg-transparent border ${currentStyle.colors.border} focus:outline-none`}
                        >
                            <option value="gemini-3-flash-preview">Gemini 3.0 Flash</option>
                            <option value="gemini-2.5-flash-latest">Gemini 2.5 Flash</option>
                        </select>
                        <StyledButton styleData={currentStyle} variant="secondary" className="text-xs py-1" onClick={() => handleRefreshGraphs()}>
                            <RefreshCw size={14} /> Refresh Graphs
                        </StyledButton>
                     </div>
                     <div className="text-xs opacity-60">
                         {strings.lastSaved}: {new Date(article.lastModified).toLocaleTimeString()}
                     </div>
                </div>

                {/* Content */}
                {activeTab === 'dashboard' ? renderDashboard() : renderEditor()}

                {/* --- CHAT OVERLAY --- */}
                {isChatOpen && (
                    <div className={`fixed bottom-4 right-4 w-80 md:w-96 h-[500px] flex flex-col shadow-2xl z-50 ${currentStyle.colors.surface} ${currentStyle.borderRadius} border ${currentStyle.colors.border} overflow-hidden`}>
                        <div className={`p-3 border-b flex justify-between items-center ${currentStyle.colors.secondary}`}>
                            <h3 className="font-bold flex items-center gap-2"><MessageSquare size={16}/> AI Assistant</h3>
                            <button onClick={() => setIsChatOpen(false)}><Minus size={16}/></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
                            {chatHistory.map(msg => (
                                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.role === 'user' ? `${currentStyle.colors.accent} text-white` : 'bg-gray-100 text-gray-800'}`}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleChatSubmit} className="p-3 border-t bg-white/80 flex gap-2">
                            <input 
                                value={chatInput} 
                                onChange={e => setChatInput(e.target.value)}
                                placeholder="Ask about the article..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm"
                            />
                            <button type="submit" disabled={!chatInput.trim()} className={`${currentStyle.colors.text} disabled:opacity-30`}>
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                )}
                
                {/* Chat Trigger */}
                {!isChatOpen && (
                    <button 
                        onClick={() => setIsChatOpen(true)}
                        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg ${currentStyle.colors.accent} text-white hover:scale-110 transition-transform`}
                    >
                        <MessageSquare size={24} />
                    </button>
                )}
            </main>
        </div>
    </div>
  );
};

export default App;
