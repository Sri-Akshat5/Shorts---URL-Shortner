import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#60a5fa', '#34d399', '#f87171', '#facc15', '#a78bfa'];

const DevicePieChart = () => {
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeviceStats = async () => {
    try {
      const res = await fetch('https://shorts-url-shortner.onrender.com/api/links/devices', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.deviceStats) {
       
        const formattedData = Object.entries(data.deviceStats).map(([name, value]) => ({
          name,
          value,
        }));
        setDeviceData(formattedData);
      } else {
        console.error('Invalid device stats format or empty response');
      }
    } catch (error) {
      console.error('Error fetching device stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
     

      {loading ? (
        <p className="text-sm text-gray-500">Loading chart...</p>
      ) : deviceData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-sm text-gray-500">No device data available yet.</p>
      )}
    </div>
  );
};

export default DevicePieChart;
