import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend
} from './chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const PieStatsChart = ({ data, title, dataKey = "count", nameKey = "_id" }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  
  // Format data for the pie chart
  const chartData = data.map(item => ({
    name: item[nameKey] || 'Unknown',
    value: item[dataKey] || 0
  }));

  // Chart configuration
  const config = {
    value: {
      label: "Count",
      theme: {
        light: "#8884d8",
        dark: "#8884d8"
      }
    }
  };

  return (
    <Card className="pie-stats-chart-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      formatter={(value) => [value, "Count"]}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieStatsChart; 