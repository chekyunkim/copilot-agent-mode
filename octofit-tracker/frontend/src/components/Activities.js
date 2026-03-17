import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../apiBase';
import { normalizeApiList } from '../utils/normalizeApiList';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const loadActivities = useCallback(async () => {
    try {
      setError('');
      const endpoint = `${API_BASE}/activities/`;
      console.log('[Activities] endpoint:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`activities endpoint returned ${response.status}`);
      }
      const data = await response.json();
      const list = normalizeApiList(data);
      console.log('[Activities] raw response:', data);
      console.log('[Activities] normalized list:', list);
      setActivities(list);
    } catch (err) {
      setError(err.message || '활동 데이터를 불러오지 못했습니다.');
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const filteredActivities = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return activities;
    return activities.filter((activity) =>
      [activity.user_email, activity.activity_type].some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      )
    );
  }, [activities, keyword]);

  return (
    <section className="card component-card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Activities</h2>
          <a className="link-primary small" href={`${API_BASE}/activities/`} target="_blank" rel="noreferrer">
            activities endpoint 열기
          </a>
        </div>

        <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="user_email, activity_type 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-md-auto d-flex gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={loadActivities}>
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
                <th>User Email</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id || `${activity.user_email}-${activity.activity_type}`}>
                  <td>{activity.user_email}</td>
                  <td>{activity.activity_type}</td>
                  <td>{activity.duration_minutes} min</td>
                  <td>{activity.calories}</td>
                </tr>
              ))}
              {!filteredActivities.length && (
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

export default Activities;
