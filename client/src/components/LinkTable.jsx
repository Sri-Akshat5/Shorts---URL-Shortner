import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const LinkTable = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editedUrl, setEditedUrl] = useState('');
  const [editedExpiresAt, setEditedExpiresAt] = useState('');
  const [qrVisibleId, setQrVisibleId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/links/mylinks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLinks(data.links || []);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    }
    setLoading(false);
  };

  const deleteLink = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/links/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLinks();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const updateLink = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          longUrl: editedUrl,
          expiresAt: editedExpiresAt ? new Date(editedExpiresAt).toISOString() : null,
        }),
      });
      setEditId(null);
      setEditedUrl('');
      setEditedExpiresAt('');
      fetchLinks();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const downloadQRCode = (id, url) => {
    const svg = document.getElementById(`qr-code-${id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-${url.split('/').pop() || id}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">🔗 My Links</h2>
        <button
          onClick={fetchLinks}
          className="text-sm bg-blue-700 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : links.length === 0 ? (
        <p className="text-gray-500">No links found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm text-left text-gray-700">
            <thead className="bg-blue-50 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 font-semibold">Short URL</th>
                <th className="py-3 px-4 font-semibold">Original URL</th>
                <th className="py-3 px-4 font-semibold">Clicks</th>
                <th className="py-3 px-4 font-semibold">Expires</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <React.Fragment key={link._id}>
                  <tr className="border-t hover:bg-gray-50 transition">
                    <td className="py-2 px-4 text-blue-600">
                      <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="underline break-all">
                        {link.shortUrl}
                      </a>
                    </td>
                    <td className="py-2 px-4 break-all">
                      {editId === link._id ? (
                        <input
                          type="text"
                          value={editedUrl}
                          onChange={(e) => setEditedUrl(e.target.value)}
                          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring"
                        />
                      ) : (
                        link.longUrl
                      )}
                    </td>
                    <td className="py-2 px-4">{link.totalClicks}</td>
                    <td className="py-2 px-4 text-gray-500">
                      {editId === link._id ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="datetime-local"
                            value={editedExpiresAt}
                            onChange={(e) => setEditedExpiresAt(e.target.value)}
                            className="border px-2 py-1 rounded"
                          />
                          <button
                            onClick={() => setEditedExpiresAt('')}
                            className="text-sm text-red-500 underline"
                          >
                            Clear
                          </button>
                        </div>
                      ) : link.expiresAt ? (
                        new Date(link.expiresAt).toLocaleString()
                      ) : (
                        'Never'
                      )}
                    </td>
                    <td className="py-2 px-4 flex flex-wrap gap-2">
                      {editId === link._id ? (
                        <button
                          onClick={() => updateLink(link._id)}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditId(link._id);
                            setEditedUrl(link.longUrl);
                            setEditedExpiresAt(
                              link.expiresAt ? new Date(link.expiresAt).toISOString().slice(0, 16) : ''
                            );
                          }}
                          className="text-yellow-600 hover:text-yellow-800 font-medium"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteLink(link._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setQrVisibleId(qrVisibleId === link._id ? null : link._id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {qrVisibleId === link._id ? 'Hide QR' : 'Generate QR'}
                      </button>
                    </td>
                  </tr>

                  {qrVisibleId === link._id && (
                    <tr>
                      <td colSpan="5" className="py-4 px-4 bg-gray-50 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <QRCode
                            id={`qr-code-${link._id}`}
                            value={link.shortUrl}
                            size={160}
                            level="H"
                            className="bg-white p-2 rounded"
                          />
                          <button
                            onClick={() => downloadQRCode(link._id, link.shortUrl)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                          >
                            Download QR Code
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LinkTable;
