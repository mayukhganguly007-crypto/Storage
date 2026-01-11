
import React, { useState, useEffect, useCallback } from 'react';
import { StorageProvider } from './types';
import { fetchStorageIntelligence } from './services/geminiService';
import ProviderCard from './components/ProviderCard';
import ComparisonChart from './components/ComparisonChart';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Decentralized storage alternatives');
  const [providers, setProviders] = useState<StorageProvider[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStorageIntelligence(searchQuery);
      setProviders(data.providers);
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Failed to fetch storage data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-12 px-4 shadow-lg mb-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <div className="bg-white/10 p-3 rounded-2xl mb-4 backdrop-blur-md border border-white/20">
            <i className="fas fa-server text-4xl text-blue-300"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Storage<span className="text-blue-300">Intelligence</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl font-light">
            Discover and compare data storage analogs across open networking, free platforms, and distributed systems.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Control Section */}
        <div className="bg-white rounded-2xl shadow-xl -mt-20 p-6 mb-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800"
                placeholder="Search storage types (e.g., 'Free Object Storage', 'IPFS alternatives')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
            >
              {loading ? (
                <i className="fas fa-circle-notch animate-spin"></i>
              ) : (
                <i className="fas fa-rocket"></i>
              )}
              Research
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <i className="fas fa-list-ul text-blue-600"></i>
              Discovered Platforms & Analogs
            </h2>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center">
                <i className="fas fa-exclamation-circle mr-3 text-xl"></i>
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-gray-100"></div>
                ))}
              </div>
            ) : providers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <i className="fas fa-folder-open text-5xl text-gray-200 mb-4"></i>
                <p className="text-gray-500">No data found. Try a different search term.</p>
              </div>
            )}
          </div>

          {/* Side Info & Analytics */}
          <div className="space-y-8">
            <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <i className="fas fa-brain text-8xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-microchip text-indigo-300"></i>
                AI Analysis
              </h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                {analysis || "Search for a storage topic to get an automated infrastructure analysis from Gemini."}
              </p>
              <div className="pt-4 border-t border-indigo-800">
                <div className="flex items-center gap-2 text-xs text-indigo-300">
                  <i className="fas fa-info-circle"></i>
                  <span>Insights updated based on current market data.</span>
                </div>
              </div>
            </div>

            <ComparisonChart />

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                <i className="fas fa-shield-halved text-green-600"></i>
                Security Advisory
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-100 text-xs text-green-800">
                  Always encrypt sensitive data before uploading to public or decentralized storage networks.
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-xs text-yellow-800">
                  Be aware of jurisdictional differences in data privacy laws when choosing cloud analogs.
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-800">
                  Open networking protocols like IPFS ensure availability but do not provide native privacy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2024 StorageIntelligence Research Platform. All data provided for educational purposes.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Safety Guidelines</a>
          <a href="#" className="hover:text-blue-600 transition-colors">API References</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
