import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap
} from 'recharts';
import { GraphData, PainterStyle } from '../types';

interface GraphProps {
  data: GraphData;
  styleData: PainterStyle;
  type: keyof GraphData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Helper to extract colors from painter style to apply to charts
const getChartColors = (style: PainterStyle) => {
    // Basic mapping, could be more sophisticated parsing of the Tailwind strings
    const isDark = style.colors.bg.includes('slate') || style.colors.bg.includes('black') || style.colors.bg.includes('stone-900');
    return {
        text: isDark ? '#e2e8f0' : '#1e293b',
        grid: isDark ? '#334155' : '#e2e8f0',
        palette: [
           // We can't easily resolve tailwind classes to hex here without a map, 
           // so we stick to a compatible palette or hardcoded painter palettes.
           style.id === 'mondrian' ? '#FF0000' : '#8884d8',
           style.id === 'mondrian' ? '#FFFF00' : '#82ca9d',
           style.id === 'mondrian' ? '#0000FF' : '#ffc658',
           '#ff7300', '#0088FE', '#00C49F' 
        ]
    };
}

export const GenericGraph: React.FC<GraphProps> = ({ data, styleData, type }) => {
  const chartStyle = getChartColors(styleData);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${styleData.colors.surface} ${styleData.colors.border} ${styleData.borderWidth} p-2 shadow-lg`}>
          <p className={`label ${styleData.font} ${styleData.colors.text}`}>{`${label || ''}`}</p>
          {payload.map((entry: any, index: number) => (
             <p key={index} className={`text-sm ${styleData.colors.text}`}>{`${entry.name}: ${entry.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'timeline') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.timeline} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
            <XAxis type="number" hide />
            <YAxis dataKey="date" type="category" stroke={chartStyle.text} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="event" name="Event" fill={chartStyle.palette[0]} radius={[0, 4, 4, 0]} label={{ position: 'right', fill: chartStyle.text }} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'complianceHeatmap') {
      return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.complianceHeatmap}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.grid} />
                <XAxis dataKey="region" stroke={chartStyle.text} />
                <YAxis stroke={chartStyle.text} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="score" fill={chartStyle.palette[0]} name="Compliance Score" />
                <Bar dataKey="complexity" fill={chartStyle.palette[1]} name="Complexity" />
            </BarChart>
        </ResponsiveContainer>
      );
  }

  if (type === 'riskMatrix') {
      return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid stroke={chartStyle.grid} />
                <XAxis type="number" dataKey="probability" name="Probability" unit="%" stroke={chartStyle.text} />
                <YAxis type="number" dataKey="severity" name="Severity" unit="%" stroke={chartStyle.text} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Scatter name="Devices" data={data.riskMatrix} fill={chartStyle.palette[2]}>
                    {data.riskMatrix.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
      );
  }

  if (type === 'techNetwork') {
      // Recharts doesn't do networks well. Using a Bubble chart to represent nodes by value.
      return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
                <CartesianGrid stroke={chartStyle.grid} />
                <XAxis dataKey="value" name="Importance" stroke={chartStyle.text} />
                <YAxis dataKey="value" name="Impact" stroke={chartStyle.text} />
                <ZAxis dataKey="source" range={[100, 1000]} name="Concept" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <Scatter name="Concepts" data={data.techNetwork} fill={chartStyle.palette[3]} />
            </ScatterChart>
        </ResponsiveContainer>
      );
  }

  if (type === 'checklist') {
      return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data.checklist}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="progress"
                    nameKey="phase"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.checklist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
      );
  }

  if (type === 'burden') {
      return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.burden}>
                <PolarGrid stroke={chartStyle.grid} />
                <PolarAngleAxis dataKey="metric" stroke={chartStyle.text} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={chartStyle.text} />
                <Radar name="US" dataKey="us" stroke={chartStyle.palette[0]} fill={chartStyle.palette[0]} fillOpacity={0.4} />
                <Radar name="EU" dataKey="eu" stroke={chartStyle.palette[1]} fill={chartStyle.palette[1]} fillOpacity={0.4} />
                <Radar name="CN" dataKey="cn" stroke={chartStyle.palette[2]} fill={chartStyle.palette[2]} fillOpacity={0.4} />
                <Legend />
                <Tooltip />
            </RadarChart>
        </ResponsiveContainer>
      );
  }

  return <div>Graph type not supported</div>;
};
