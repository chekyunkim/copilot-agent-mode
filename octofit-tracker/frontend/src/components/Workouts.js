import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE } from '../apiBase';
import { normalizeApiList } from '../utils/normalizeApiList';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [keyword, setKeyword] = useState('');

  const loadWorkouts = useCallback(async () => {
    try {
      setError('');
      const endpoint = `${API_BASE}/workouts/`;
      console.log('[Workouts] endpoint:', endpoint);
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`workouts endpoint returned ${response.status}`);
      }
      const data = await response.json();
      const list = normalizeApiList(data);
      console.log('[Workouts] raw response:', data);
      console.log('[Workouts] normalized list:', list);
      setWorkouts(list);
    } catch (err) {
      setError(err.message || '운동 데이터를 불러오지 못했습니다.');
    }
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  const filteredWorkouts = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return workouts;
    return workouts.filter((workout) =>
      [workout.user_email, workout.workout_name, workout.recommended_for].some((value) =>
        String(value || '')
          .toLowerCase()
          .includes(query)
      )
    );
  }, [workouts, keyword]);

  return (
    <section className="card component-card mb-4 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
          <h2 className="h4 mb-0">Workouts</h2>
          <a className="link-primary small" href={`${API_BASE}/workouts/`} target="_blank" rel="noreferrer">
            workouts endpoint 열기
          </a>
        </div>

        <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="user_email, workout_name, recommended_for 검색"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="col-md-auto d-flex gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={loadWorkouts}>
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
                <th>Workout</th>
                <th>Intensity</th>
                <th>Recommended For</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout) => (
                <tr key={workout.id || `${workout.user_email}-${workout.workout_name}`}>
                  <td>{workout.user_email}</td>
                  <td>{workout.workout_name}</td>
                  <td>{workout.intensity}</td>
                  <td>{workout.recommended_for}</td>
                  <td>{workout.completed ? 'Yes' : 'No'}</td>
                </tr>
              ))}
              {!filteredWorkouts.length && (
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

export default Workouts;
