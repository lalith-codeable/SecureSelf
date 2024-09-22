import React, { useState } from 'react';
import axios from 'axios';

interface ExposedBreach {
  BreachID: string;
  BreachedDate: string;
  Domain: string;
  ExposedData: string;
  ExposedRecords: number;
  ExposureDescription: string;
  Industry: string;
  Logo: string;
  PasswordRisk: string;
  Searchable: string;
  Sensitive: string;
  Verified: string;
}

const CheckDomains: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [breaches, setBreaches] = useState<ExposedBreach[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setBreaches(null);

    try {
      const response = await axios.get(`https://api.xposedornot.com/v1/breaches?domain=${domain}`);
      if (response.data.status === 'success') {
        setBreaches(response.data['Exposed Breaches']);
      } else {
        setError('No breaches found for this domain.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Domain Breaches</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Enter domain (e.g., twitter.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Search
        </button>

        {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {breaches && breaches.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Exposed Breaches</h2>
            {breaches.map((breach) => (
              <div key={breach.BreachID} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={`https://xposedornot.com/static/logos/${breach.Logo}`}
                    alt={breach.BreachID}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{breach.BreachID}</h3>
                    <p className="text-gray-600">{breach.Domain}</p>
                    <p className="text-gray-500">{new Date(breach.BreachedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p><strong>Description:</strong> {breach.ExposureDescription}</p>
                  <p><strong>Industry:</strong> {breach.Industry}</p>
                  <p><strong>Exposed Data:</strong> {breach.ExposedData}</p>
                  <p><strong>Exposed Records:</strong> {breach.ExposedRecords}</p>
                  <p><strong>Password Risk:</strong> {breach.PasswordRisk}</p>
                  <p><strong>Searchable:</strong> {breach.Searchable}</p>
                  <p><strong>Sensitive:</strong> {breach.Sensitive}</p>
                  <p><strong>Verified:</strong> {breach.Verified}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckDomains;
