import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface BreachMetrics {
  industry: [string[]][];
  passwords_strength: {
    EasyToCrack: number;
    PlainText: number;
    StrongHash: number;
    Unknown: number;
  }[];
  risk: {
    risk_label: string;
    risk_score: number;
  }[];
  xposed_data: {
    children: {
      children: {
        colname: string;
        group: string;
        name: string;
        value: number;
      }[];
      colname: string;
      name: string;
    }[];
  }[];
  yearwise_details: {
    [key: string]: number;
  }[];
}

interface ExposedBreach {
  breach: string;
  details: string;
  domain: string;
  industry: string;
  logo: string;
  password_risk: string;
  references: string;
  searchable: string;
  verified: string;
  xposed_data: string;
  xposed_date: string;
  xposed_records: number;
}

const BreachAnalysis = () => {
  const { email } = useParams();
  const [breachMetrics, setBreachMetrics] = useState<BreachMetrics | null>(null);
  const [exposedBreaches, setExposedBreaches] = useState<ExposedBreach[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    async function fetchReport () {
    setLoading(true);
    setError(null);
    setBreachMetrics(null);
    setExposedBreaches(null);
    try {
        const response = await axios.get(`https://api.xposedornot.com/v1/breach-analytics?email=${email}`);
        if (response.data.Error) {
          setError(response.data.Error);
        } else {
          setBreachMetrics(response.data.BreachMetrics);
          setExposedBreaches(response.data.ExposedBreaches.breaches_details);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    }
    fetchReport();  
  },[]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Email Breach Analytics</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        {/* <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-4"
        /> */}
        {/* <button
          onClick={handleFetchAnalytics}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Check Breach Analytics
        </button> */}

        {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {breachMetrics && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Breach Metrics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Industry Classification</h3>
                <ul className="list-disc pl-6">
                  {breachMetrics.industry[0].map(([industry, count]) => (
                    <li key={industry}>
                      {industry}: {count}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Password Strength</h3>
                <ul className="list-disc pl-6">
                  {Object.entries(breachMetrics.passwords_strength[0]).map(([strength, count]) => (
                    <li key={strength}>
                      {strength}: {count}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Risk Analysis</h3>
                <ul className="list-disc pl-6">
                  {breachMetrics.risk.map((risk) => (
                    <li key={risk.risk_label}>
                      Risk Label: {risk.risk_label}, Risk Score: {risk.risk_score}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Exposed Data Types</h3>
                <ul className="list-disc pl-6">
                  {breachMetrics.xposed_data.flatMap((data) =>
                    data.children.map((child) => (
                      <li key={child.name}>
                        {child.name}
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Yearly Breakdown</h3>
                <ul className="list-disc pl-6">
                  {Object.entries(breachMetrics.yearwise_details[0]).map(([year, count]) => (
                    <li key={year}>
                      {year}: {count}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {exposedBreaches && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Exposed Breaches</h2>
            {exposedBreaches.map((breach) => (
              <div key={breach.breach} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex items-center mb-4 md:mb-0">
                  <img
                    src={`https://xposedornot.com/static/logos/${breach.logo}`}
                    alt={breach.breach}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{breach.breach}</h3>
                    <p className="text-gray-600">{breach.domain}</p>
                    <p className="text-gray-500">{breach.xposed_date}</p>
                  </div>
                </div>
                <div>
                  <p><strong>Details:</strong> {breach.details}</p>
                  <p><strong>Industry:</strong> {breach.industry}</p>
                  <p><strong>Password Risk:</strong> {breach.password_risk}</p>
                  <p><strong>Exposed Data:</strong> {breach.xposed_data}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {breach.searchable} | {breach.verified}
                  </p>
                  {breach.references && (
                    <a
                      href={breach.references}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline mt-2 inline-block"
                    >
                      Reference
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreachAnalysis;
