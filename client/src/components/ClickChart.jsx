import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ClickChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClickStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/links/stats/daily', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const json = await res.json();

     
      setData(json.dailyClicks || []);
    } catch (error) {
      console.error('Failed to fetch click stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClickStats();
  }, []);
  console.log("Chart Data:", data);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
     

      {loading ? (
        <p className="text-gray-500">Loading chart...</p>
      ) : data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fill: '#6b7280' }} />
            <YAxis allowDecimals={false} tick={{ fill: '#6b7280' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', borderColor: '#d1d5db' }}
              labelStyle={{ color: '#4b5563' }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">No click data available.</p>
      )}
    </div>
  );
};

export default ClickChart;
