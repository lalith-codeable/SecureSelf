import { useState } from 'react';
import axios from 'axios';
import { keccak_512 } from 'js-sha3';

const CheckPassword = () => {
  const [password, setPassword] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    try {
      const hash = keccak_512(password);
      const hashPrefix = hash.slice(0, 10);
      
      const response = await axios.get(
        `https://passwords.xposedornot.com/v1/pass/anon/${hashPrefix}`
      );

      setResults(response.data);
      setError('');
    } catch (err) {
      setResults(null);
      setError('Password not found or an error occurred');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check for Exposed Passwords</h1>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-full"
        placeholder="Enter password"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Check
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {results && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CheckPassword;
