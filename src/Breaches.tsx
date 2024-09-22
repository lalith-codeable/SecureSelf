import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollArea } from './components/ui/Scroll-area';
import { Skeleton } from "./components/ui/Skeleton";
import { BackButton } from './components/back-button';

interface BreachInfo {
  breachID: string;
  breachedDate: string;
  domain: string;
  exposedData: string[];
  exposedRecords: number;
  exposureDescription: string;
  industry: string;
  logo: string;
  passwordRisk: string;
  referenceURL: string;
  searchable: boolean;
  sensitive: boolean;
  verified: boolean;
}

const Breaches = () => {
  const [breachs, setBreachs] = useState<BreachInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('https://api.xposedornot.com/v1/breaches');
        setBreachs(res.data.exposedBreaches);
        setLoading(false);
      } catch (err: any) {
        if (err.response?.status === 429) {
          setError("Usage limit exceeded.");
        } else {
          setError("An error occurred. Check console for details.");
        }
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full flex py-4 flex-col items-center bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400 min-h-screen">
      <div className="relative w-full flex items-center justify-center py-4">
        <div className="absolute left-4 sm:left-8">
          <BackButton to="/" className="mb-2 sm:mb-0 sm:text-sm px-2 sm:px-4 py-1 sm:py-2">Home</BackButton>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-5xl font-bold text-white text-center">
          Breached Industries
        </h1>
      </div>
      {loading ? (
        <div className="w-full lg:w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {Array(9).fill(1).map((value, index) => (
            <div key={value + index} className="max-w-lg mx-auto bg-white rounded-lg border border-gray-300">
              <div className="flex items-center p-4">
                <Skeleton className="w-14 md:w-12 h-14 md:h-12 rounded-full mr-4" />
                <div className='flex flex-col gap-2'>
                  <Skeleton className="min-w-48 w-48 max-w-66 sm:w-52 md:w-60 lg:w-48 h-6 rounded-sm" />
                  <Skeleton className="min-w-48 w-48 max-w-66 sm:w-52 md:w-60 lg:w-48 h-4 rounded-sm" />
                </div>
              </div>
              <div className="p-4">
                <Skeleton className="w-full h-60" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="border rounded-lg bg-gradient-to-r from-red-400 to-pink-500 p-4 text-xl w-4/5 lg:w-1/2 text-white shadow-lg">
          <p className="font-semibold">Error: {error}</p>
          <p className="text-sm mt-2">You can try refreshing the page or check your network connection. If the issue persists, please contact support.</p>
        </div>
      ) : (
        <div className="w-full lg:w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {breachs.map((item: BreachInfo) => (
            <div key={item.breachID} className="max-w-lg mx-auto bg-white rounded-lg border border-emerald-500 shadow-lg">
              <div className="flex items-center p-4">
                <img src={item.logo} alt={item.breachID} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h2 className={`text-md font-semibold ${item.breachID.length > 15 ? "text-xs" : ""}`}>{item.breachID}</h2>
                  <p className={`text-gray-600 ${item.breachID.length > 15 ? "text-xs" : ""}`}>{item.domain} - {new Date(item.breachedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-4">
                <p><strong>Exposed Records:</strong> {item.exposedRecords.toLocaleString()}</p>
                <ScrollArea className="h-1/2 md:h-60">
                  <p className="mt-2 break-words">{item.exposureDescription}</p>
                </ScrollArea>
                <p className="mt-4"><strong>Exposed Data:</strong> {item.exposedData.join(', ')}</p>
                <p><strong>Industry:</strong> {item.industry}</p>
                <p><strong>Password Risk:</strong> {item.passwordRisk}</p>
                <p className="text-sm text-gray-500 mt-4">
                  {item.verified ? 'Verified' : 'Unverified'} | {item.searchable ? 'Searchable' : 'Not Searchable'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Breaches;
