import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Message form state
  const [message, setMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Submit handler for CreateMessage endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitResult(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/CreateMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText || 'Request failed');
      }
      const json = await res.json().catch(() => null);
      setSubmitResult(json ?? 'Message sent successfully');
      setMessage('');
    } catch (err) {
      setSubmitError(err.message || String(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/api/GetData`)
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

        <section style={{ marginTop: 20 }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: 'salmon' }}>Error: {error}</p>
          ) : data ? (
            <pre style={{ textAlign: 'left', maxWidth: '600px', whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
          ) : null}
        </section>

        <section style={{ marginTop: 20, textAlign: 'left' }}>
          <h3>Send a message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              style={{ padding: '8px', width: '300px', marginRight: '8px' }}
            />
            <button type="submit" disabled={submitLoading || !message}>
              {submitLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>
          {submitError && <p style={{ color: 'salmon' }}>Submit error: {submitError}</p>}
          {submitResult && <p style={{ color: 'lightgreen', marginTop: 8 }}>{typeof submitResult === 'string' ? submitResult : JSON.stringify(submitResult)}</p>}
        </section>
      </header>
    </div>
  );
}

export default App;
