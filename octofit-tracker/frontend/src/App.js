import { useEffect, useMemo, useState } from 'react';

const endpointDefs = [
  { key: 'users', label: 'Users', path: 'users' },
  { key: 'teams', label: 'Teams', path: 'teams' },
  { key: 'activities', label: 'Activities', path: 'activities' },
  { key: 'leaderboard', label: 'Leaderboard', path: 'leaderboard' },
  { key: 'workouts', label: 'Workouts', path: 'workouts' },
];

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const apiBase = codespace
  ? `https://${codespace}-8000.app.github.dev/api`
  : 'http://127.0.0.1:8000/api';

function asArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  return [];
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [datasets, setDatasets] = useState({});

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        setLoading(true);
        setError('');

        const responses = await Promise.all(
          endpointDefs.map(async ({ key, path }) => {
            const response = await fetch(`${apiBase}/${path}/`);
            if (!response.ok) {
              throw new Error(`${path} endpoint returned ${response.status}`);
            }
            const json = await response.json();
            return [key, asArray(json)];
          })
        );

        if (!cancelled) {
          setDatasets(Object.fromEntries(responses));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || '데이터를 불러오지 못했습니다.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(
    () =>
      endpointDefs.map(({ key, label }) => ({
        key,
        label,
        count: (datasets[key] || []).length,
      })),
    [datasets]
  );

  return (
    <div className="page-wrap">
      <header className="hero container py-5">
        <p className="hero-kicker mb-2">OctoFit Tracker</p>
        <h1 className="hero-title">Hero Fitness Command Center</h1>
        <p className="hero-subtitle mb-0">
          Django REST API로 users, teams, activities, leaderboard, workouts 데이터를 한 화면에서 확인합니다.
        </p>
        <p className="hero-api mt-3 mb-0">API Base: {apiBase}</p>
      </header>

      <main className="container pb-5">
        {error && <div className="alert alert-danger">{error}</div>}

        <section className="row g-3 mb-4">
          {cards.map((card) => (
            <div className="col-6 col-lg-4" key={card.key}>
              <article className="stat-card h-100">
                <h2>{card.label}</h2>
                <div className="stat-value">{loading ? '...' : card.count}</div>
              </article>
            </div>
          ))}
        </section>

        {endpointDefs.map(({ key, label }) => (
          <section className="data-panel mb-4" key={key}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h3 className="panel-title mb-0">{label}</h3>
              <span className="badge text-bg-light">{(datasets[key] || []).length} rows</span>
            </div>
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>field</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && (datasets[key] || []).length === 0 && (
                    <tr>
                      <td colSpan="2" className="text-muted py-3">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  )}
                  {(datasets[key] || []).slice(0, 2).map((row, index) => (
                    <tr key={`${key}-${index}`}>
                      <td className="field-col">sample #{index + 1}</td>
                      <td>
                        <pre className="json-preview mb-0">{JSON.stringify(row, null, 2)}</pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default App;
