const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

export const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://127.0.0.1:8000/api';
