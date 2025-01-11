import { useState } from 'react';
import { BenchmarkConfig, type BenchmarkSettings } from './components/BenchmarkConfig';
import { BenchmarkRunner, type BenchmarkResult } from './components/BenchmarkRunner';
import { ResultsTable } from './components/ResultsTable';
import { BenchmarkPlot } from './components/BenchmarkPlot';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<BenchmarkSettings | null>(null);
  const [results, setResults] = useState<BenchmarkResult[]>([]);

  const handleStartBenchmark = (settings: BenchmarkSettings) => {
    setConfig(settings);
    setIsRunning(true);
  };

  const handleBenchmarkComplete = (benchmarkResults: BenchmarkResult[]) => {
    setResults(benchmarkResults);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Wasmlets Benchmark</h1>

          {!isRunning && results.length === 0 && (
            <BenchmarkConfig onStartBenchmark={handleStartBenchmark} />
          )}

          {isRunning && config && (
            <BenchmarkRunner
              config={config}
              onComplete={handleBenchmarkComplete}
            />
          )}

          {results.length > 0 && !isRunning && (
            <div className="space-y-6">
              <div className="space-y-8">
                <ResultsTable results={results} />
                <BenchmarkPlot results={results.filter(r => r.wavelet !== 'discrete-wavelets')} />
              </div>
              <button
                onClick={() => {
                  setResults([]);
                  setConfig(null);
                }}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Run New Benchmark
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
