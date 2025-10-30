const readBool = (v) => {
  const s = String(v || '').toLowerCase().trim();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
};

// PUBLIC_INTERFACE
export const env = {
  apiBase: process.env.REACT_APP_API_BASE || '',
  backendUrl: process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_API_BASE || '',
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || '',
  wsUrl: process.env.REACT_APP_WS_URL || '',
  nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || 'development',
  features: {
    USE_API: readBool((process.env.REACT_APP_FEATURE_FLAGS || '').includes('USE_API')) || readBool(process.env.REACT_APP_USE_API),
  }
};
