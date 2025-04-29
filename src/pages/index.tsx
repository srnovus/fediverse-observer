import { useState } from 'react'
import Head from 'next/head'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Home() {
  const [instanceUrl, setInstanceUrl] = useState('')
  const [scanResults, setScanResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    setLoading(true)
    try {
      const response = await fetch('/.netlify/functions/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: instanceUrl }),
      })
      const data = await response.json()
      setScanResults(data)
    } catch (error) {
      console.error('Error scanning instance:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Fediverse Observer</title>
        <meta name="description" content="Scan and analyze Fediverse instances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Fediverse Observer</h1>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={instanceUrl}
              onChange={(e) => setInstanceUrl(e.target.value)}
              placeholder="Enter instance URL (e.g., mastodon.social)"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleScan}
              disabled={loading || !instanceUrl}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
        </div>

        {scanResults && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Scan Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Security</h3>
                <ul className="space-y-2">
                  <li>SSL: {scanResults.security.ssl ? '✅' : '❌'}</li>
                  <li>CORS: {scanResults.security.cors ? '✅' : '❌'}</li>
                  <li>Security Headers: {scanResults.security.headers ? '✅' : '❌'}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Activity</h3>
                <Bar
                  data={{
                    labels: ['Posts', 'Users', 'Comments'],
                    datasets: [
                      {
                        label: 'Last 24h',
                        data: [
                          scanResults.activity.posts,
                          scanResults.activity.users,
                          scanResults.activity.comments,
                        ],
                        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 