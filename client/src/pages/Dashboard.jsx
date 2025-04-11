import React, { useEffect, useState } from 'react';
import ClickChart from '../components/ClickChart';
import DevicePieChart from "../components/DevicePieChart";
import AnalyticsChart from '../components/AnalyticsChart';

const Dashboard = () => {
  const [topLink, setTopLink] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('https://shorts-url-shortner.onrender.com/api/links/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      setTopLink(data.topLink);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLinkActive = (expiresAt) => {
    if (!expiresAt) return true;
    return new Date(expiresAt) > new Date();
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-indigo-800 mb-12 tracking-tight leading-tight">
          Link Analytics Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading your insights...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

           
            {topLink && (
              <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-100 transition-all hover:shadow-xl">
                <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                  🔥 Most Clicked Link
                </h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="break-words">
                    <span className="font-semibold text-gray-700">Original:</span> {topLink.longUrl}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Short:</span>{' '}
                    <a
                      href={topLink.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 font-medium underline underline-offset-2 hover:text-indigo-800"
                    >
                      {topLink.shortUrl}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Clicks:</span> {topLink.clicks}
                  </p>
                  <p>
                    <span className="font-semibold">Created:</span>{' '}
                    {new Date(topLink.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        isLinkActive(topLink.expiresAt)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {isLinkActive(topLink.expiresAt) ? 'Active' : 'Expired'}
                    </span>
                  </p>
                </div>
              </div>
            )}

            
            <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-100 transition-all hover:shadow-xl col-span-1 xl:col-span-2">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                📈 Clicks Overview
              </h2>
              <ClickChart />
            </div>

            
            <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-100 transition-all hover:shadow-xl">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                🖥️ Device Breakdown
              </h2>
              <DevicePieChart />
            </div>

            
            <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-100 transition-all hover:shadow-xl col-span-1 xl:col-span-2">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
                📊 Engagement Trends
              </h2>
              <AnalyticsChart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
