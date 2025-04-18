import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatsChart = ({ stats, title = "Statistics Overview" }) => {
  if (!stats) return null;
  
  const chartData = [
    { name: 'Pets', value: stats.totalPets },
    { name: 'Pending Applications', value: stats.pendingApplications },
    { name: 'Users', value: stats.totalUsers },
    { name: 'Contact Messages', value: stats.totalContactMessages },
  ];

  return (
    <Card className="stats-chart-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsChart; 