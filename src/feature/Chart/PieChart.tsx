import { Cell, Pie, PieChart as Chart, ResponsiveContainer } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/feature/ui/chart';
import { cn } from '@/lib/utils';

interface BlogTagData {
  name: string;
  value: number;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

export function PieLegend({ data }: { data: BlogTagData[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div className="mr-2 h-4 w-4" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
          <span className="text-sm">
            {entry.name} ({entry.value})
          </span>
        </div>
      ))}
    </div>
  );
}

export function PieChart({ data, className }: { data: BlogTagData[]; className?: string }) {
  return (
    <ChartContainer
      config={{
        value: {
          label: '태그 수',
          color: 'hsl(var(--chart-1))'
        }
      }}
      className={cn('h-[300px] p-0', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <Chart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={'80%'} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'transparent' }} />
        </Chart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
