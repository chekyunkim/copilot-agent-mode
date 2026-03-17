import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../apiBase';
import { normalizeApiList } from '../utils/normalizeApiList';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const loadUsers = useCallback(async () => {
    let cancelled = false;
    try {
      setError('');
      const endpoint = `${API_BASE}/users/`;
      console.log('[Users] endpoint:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`users endpoint returned ${response.status}`);
      }
      const data = await response.json();
      const list = normalizeApiList(data);
      console.log('[Users] raw response:', data);
      console.log('[Users] normalized list:', list);
      if (!cancelled) setUsers(list);
    } catch (err) {
      if (!cancelled) setError(err.message || '사용자 데이터를 불러오지 못했습니다.');
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) =>
      [user.name, user.email, user.hero, user.team].some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      )
    );
  }, [users, keyword]);

  return (
    <section className="card component-card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Users</h2>
          <a className="link-primary small" href={`${API_BASE}/users/`} target="_blank" rel="noreferrer">
            users endpoint 열기
          </a>
        </div>

        <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="name, email, hero, team 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-md-auto d-flex gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={loadUsers}>
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
                <th>Email</th>
                <th>Hero</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.hero}</td>
                  <td>{user.team}</td>
                  <td>{user.total_points}</td>
                </tr>
              ))}
              {!filteredUsers.length && (
                <tr>
                  <td colSpan="5" className="text-muted py-3 text-center">
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

export default Users;
