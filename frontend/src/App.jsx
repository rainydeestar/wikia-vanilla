import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch((err) => setStatus(`error: ${err.message}`))
  }, [])

  return (
    <div>
      <h1>Backend health check</h1>
      <p>Status: {status}</p>
    </div>
  )
}

export default App