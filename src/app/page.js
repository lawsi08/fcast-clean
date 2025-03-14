export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6" style={{backgroundColor: "#F5F2E3"}}>
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{
          background: "linear-gradient(to bottom, #f1daa0 0%, #C5B358 50%, #9c8a3e 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 0px 2px rgba(197, 179, 88, 0.3)"
        }}>FCAST Application</h1>
        
        <p className="text-xl mb-12">Welcome to the cost forecasting tool.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <a 
            href="/login" 
            className="px-8 py-3 rounded-md text-white font-medium text-center"
            style={{
              background: "linear-gradient(to bottom, #d5c069 0%, #C5B358 50%, #a89848 100%)",
              boxShadow: "0 4px 6px rgba(197, 179, 88, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            }}
          >
            Sign In
          </a>
          
          <a 
            href="/signup" 
            className="px-8 py-3 rounded-md font-medium text-center border-2"
            style={{
              borderColor: "#C5B358",
              color: "#C5B358"
            }}
          >
            Create Account
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Track Contracts</h3>
            <p className="text-gray-600">Manage your contracts in one place with detailed tracking and reporting.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Import Data</h3>
            <p className="text-gray-600">Easily import data from Excel spreadsheets with our flexible mapping tool.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Forecast Costs</h3>
            <p className="text-gray-600">Make accurate cost predictions based on historical data and trends.</p>
          </div>
        </div>
      </div>
    </main>
  );
}