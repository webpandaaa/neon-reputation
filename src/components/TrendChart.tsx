import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface TrendChartProps {
  data: Array<{
    year: string;
    positive: number;
    negative: number;
    neutral: number;
  }>;
}

export const TrendChart = ({ data }: TrendChartProps) => {
  return (
    <div className="glass rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Sentiment Trends Over Time</h2>
        <p className="text-sm text-muted-foreground">Year-wise reputation analysis</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142 71% 45%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(142 71% 45%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(45 5% 50%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(45 5% 50%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Area 
            type="monotone" 
            dataKey="positive" 
            stroke="hsl(142 71% 45%)" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorPositive)"
            name="Positive"
          />
          <Area 
            type="monotone" 
            dataKey="negative" 
            stroke="hsl(0 84% 60%)" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorNegative)"
            name="Negative"
          />
          <Area 
            type="monotone" 
            dataKey="neutral" 
            stroke="hsl(45 5% 50%)" 
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorNeutral)"
            name="Neutral"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
