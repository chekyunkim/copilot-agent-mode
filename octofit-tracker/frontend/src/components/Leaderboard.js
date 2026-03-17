import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../apiBase';
import { normalizeApiList } from '../utils/normalizeApiList';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const loadLeaderboard = useCallback(async () => {
    try {
      setError('');
      const endpoint = `${API_BASE}/leaderboard/`;
      console.log('[Leaderboard] endpoint:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`leaderboard endpoint returned ${response.status}`);
      }
      const data = await response.json();
      const list = normalizeApiList(data);
      console.log('[Leaderboard] raw response:', data);
      console.log('[Leaderboard] normalized list:', list);
      setEntries(list);
    } catch (err) {
      setError(err.message || '리더보드 데이터를 불러오지 못했습니다.');
    }
  }, []);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  const filteredEntries = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((entry) =>
      [entry.hero_name, entry.team, entry.rank].some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      )
    );
  }, [entries, keyword]);

  return (
    <section className="card component-card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Leaderboard</h2>
          <a className="link-primary small" href={`${API_BASE}/leaderboard/`} target="_blank" rel="noreferrer">
            leaderboard endpoint 열기
          </a>
        </div>

        <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="hero, team, rank 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-md-auto d-flex gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={loadLeaderboard}>
              새로고침
            </button>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setKeyword('')}>
              초기화
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-sm align-middle mb-0 app-data-table">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>Hero</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id || `${entry.hero_name}-${entry.rank}`}>
                  <td>{entry.rank}</td>
                  <td>{entry.hero_name}</td>
                  <td>{entry.team}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
              {!filteredEntries.length && (
                <tr>
                  <td colSpan="4" className="text-muted py-3 text-center">
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Leaderboard;
