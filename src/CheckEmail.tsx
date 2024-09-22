import { useState } from 'react';
import axios from 'axios';
import { ScrollArea } from './components/ui/Scroll-area'; 
import { getRandomColor } from './lib/randomCl';
import { BackButton } from './components/back-button';

export default function CheckEmail() {
  const [email, setEmail] = useState('');
  const [breaches, setBreaches] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCheckBreach = async () => {
    setError('');
    setBreaches([]);
    setLoading(true);

    try {
      const response = await axios.get(`https://api.xposedornot.com/v1/check-email/${email}`);
      if (response.data.breaches.length > 0) {
        setBreaches(response.data.breaches[0]);
      } else {
        setError('No breaches found for this email address.');
      }
    } catch (err) {
      setError('Error checking for breaches. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-200 via-purple-300 to-pink-400">
      <div className="absolute top-4 left-4 sm:left-8">
        <BackButton to="/" className="mb-2 sm:mb-0 sm:text-sm px-2 sm:px-4 py-1 sm:py-2">Home</BackButton>
      </div>
      <div className="px-4 py-2 backdrop-blur-sm border bg-rose-300/10 border-rose-500/20 text-white font-bold text-lg mx-auto text-center rounded-full mb-4 relative">
        <span className="relative z-10 text-black">Check Email Address for Breaches</span>
        <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 backdrop-blur-md border border-emerald-500">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. example@example.com"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={handleCheckBreach}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600'} transition duration-300`}
        >
          {loading ? 'Checking...' : 'Check Breach'}
        </button>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
      
      {breaches.length > 0 && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <h3 className='text-center text-2xl text-gray-900'>
            Breached at: <span className='text-red-600'>{breaches.length}</span> domains
          </h3>
          <div className="w-full">
            {breaches.length > 0 && window.innerWidth < 640 ? (
              <ScrollArea className="max-h-60 overflow-auto border border-blue-400 rounded-sm p-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {breaches.map((breach, index) => (
                    <span key={index} className={`border border-emerald-400 p-4 rounded-md shadow-md ${getRandomColor()} ${breach.length > 20 ? "text-xs" : ""}`}>
                      {index + 1}: {breach}
                    </span>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {breaches.map((breach, index) => (
                  <span key={index} className={`border border-emerald-400 p-4 rounded-md shadow-md ${getRandomColor()} ${breach.length > 20 ? "text-xs" : ""}`}>
                    {index + 1}: {breach}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {breaches.length === 0 && !error && !loading && (
        <div className="mt-4 p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-center">
          <p>No breaches found yet. Check an email to see results!</p>
        </div>
      )}
    </div>
  );
}
