import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://func-getdata-eastus-001-bgezdne8gggrhrdv.centralindia-01.azurewebsites.net/api/GetData")
      .then(res => {
        if (!res.ok) throw new Error(res.statusText || 'Network response was not ok');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'salmon' }}>Error: {error}</p>
        ) : data ? (
          <pre style={{ textAlign: 'left', maxWidth: '600px', whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        ) : null}
      </header>
    </div>
  );
}

export default App;
