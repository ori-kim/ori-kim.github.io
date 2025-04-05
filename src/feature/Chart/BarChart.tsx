import { Bar, BarChart as Chart, ResponsiveContainer, XAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/feature/ui/chart';
import { cn } from '@/lib/utils';

interface BlogPostData {
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
function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
export function BarChart({ data, className }: { data: BlogPostData[]; className?: string }) {
  return (
    <ChartContainer
      config={{
        count: {
          label: '포스트 수',
          color: 'hsl(var(--chart-1))'
        }
      }}
      className={cn('h-[300px]', className)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <Chart data={data}>
          <XAxis dataKey="name" />
          <Bar dataKey="value" fill={getRandomColor()} radius={[4, 4, 0, 0]} />
          <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'transparent' }} />
        </Chart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
