import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('https://shorts-url-shortner.onrender.com/api/links/mylinks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      const labels = data.links.map((link) => link.shortCode || 'N/A');
      const clicks = data.links.map((link) => link.totalClicks );

      setChartData({
        labels,
        datasets: [
          {
            label: 'Clicks per Link',
            data: clicks,
            backgroundColor: 'rgba(99, 102, 241, 0.7)', 
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 1,
            borderRadius: 8,
            barThickness: 30,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
     
      {loading ? (
        <p className="text-gray-500">Loading chart...</p>
      ) : chartData && chartData.labels.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: '#374151', 
                    font: {
                      weight: 'bold',
                    },
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return `Clicks: ${context.raw}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: '#6B7280',
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    color: '#6B7280',
                    stepSize: 1,
                  },
                  grid: {
                    color: '#E5E7EB', 
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-gray-500">No analytics data to display.</p>
      )}
    </div>
  );
};

export default AnalyticsChart;
