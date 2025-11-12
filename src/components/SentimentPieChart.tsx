import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentPieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

const COLORS = {
  Positive: "hsl(142 71% 45%)",
  Negative: "hsl(0 84% 60%)",
  Neutral: "hsl(45 5% 50%)",
};

export const SentimentPieChart = ({ data }: SentimentPieChartProps) => {
  return (
    <div className="glass rounded-2xl p-6 border border-border/50 hover:border-secondary/30 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Sentiment Distribution</h2>
        <p className="text-sm text-muted-foreground">Overall review breakdown</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS]}
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          />
          <Legend 
            iconType="circle"
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
