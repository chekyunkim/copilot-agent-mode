import Activities from './components/Activities';
import { API_BASE } from './apiBase';
import Leaderboard from './components/Leaderboard';
import { useState } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="page-wrap">
      <header className="hero container py-5">
        <p className="hero-kicker mb-2">OctoFit Tracker</p>
        <h1 className="hero-title display-5 fw-bold">OctoFit API Dashboard</h1>
        <p className="hero-subtitle lead mb-0">
          backend REST API(users, teams, activities, leaderboard, workouts)에 연결된 React 컴포넌트 뷰입니다.
        </p>
        <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
          <a className="link-primary fw-semibold" href={API_BASE} target="_blank" rel="noreferrer">
            API Base 확인
          </a>
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={() => setShowHelpModal(true)}
          >
            API 사용 가이드
          </button>
        </div>
        <p className="hero-api mt-2 mb-0">{API_BASE}</p>
      </header>

      <main className="container pb-5">
        <nav className="app-nav card border-0 shadow-sm mb-4">
          <div className="card-body py-3">
            <h2 className="h5 mb-3">메인 네비게이션</h2>
            <ul className="nav nav-pills gap-2 flex-wrap">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : 'text-dark bg-light border border-secondary-subtle'}`
                  }
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      {showHelpModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">REST API 가이드</h3>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowHelpModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-2">모든 컴포넌트는 다음 엔드포인트 형식으로 데이터를 조회합니다.</p>
                  <p className="mb-0">
                    <a className="link-primary" href={`${API_BASE}/users/`} target="_blank" rel="noreferrer">
                      {API_BASE}/[component]/
                    </a>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowHelpModal(false)}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default App;
