import React, { useState } from 'react';

const CreateLinkForm = ({ onLinkCreated }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl(null);

    try {
      const res = await fetch('http://localhost:5000/api/links/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ longUrl, customAlias, expiresAt }),
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl);
        onLinkCreated?.();
        setLongUrl('');
        setCustomAlias('');
        setExpiresAt('');
      } else {
        setError(data.message || 'Error creating link');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        🔗 Create a Short Link
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Long URL *</label>
          <input
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="https://example.com/your-long-url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Custom Alias (optional)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="custom-alias"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Expiry Date & Time (optional)</label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? 'Creating Link...' : 'Shorten Link'}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 text-center bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded break-all">
          🎉 Your short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {shortUrl}
          </a>
        </div>
      )}

      {error && (
        <div className="mt-6 text-center bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default CreateLinkForm;
