import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../apiBase';
import { normalizeApiList } from '../utils/normalizeApiList';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const loadTeams = useCallback(async () => {
    try {
      setError('');
      const endpoint = `${API_BASE}/teams/`;
      console.log('[Teams] endpoint:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`teams endpoint returned ${response.status}`);
      }
      const data = await response.json();
      const list = normalizeApiList(data);
      console.log('[Teams] raw response:', data);
      console.log('[Teams] normalized list:', list);
      setTeams(list);
    } catch (err) {
      setError(err.message || '팀 데이터를 불러오지 못했습니다.');
    }
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const filteredTeams = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return teams;
    return teams.filter((team) =>
      [team.name, team.universe, team.motto].some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      )
    );
  }, [teams, keyword]);

  return (
    <section className="card component-card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Teams</h2>
          <a className="link-primary small" href={`${API_BASE}/teams/`} target="_blank" rel="noreferrer">
            teams endpoint 열기
          </a>
        </div>

        <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="name, universe, motto 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-md-auto d-flex gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={loadTeams}>
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
                <th>Name</th>
                <th>Universe</th>
                <th>Motto</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team.id || team.name}>
                  <td>{team.name}</td>
                  <td>{team.universe}</td>
                  <td>{team.motto}</td>
                  <td>{team.total_points}</td>
                </tr>
              ))}
              {!filteredTeams.length && (
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

export default Teams;
