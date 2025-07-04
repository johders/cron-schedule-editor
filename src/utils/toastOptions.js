const toastOptions = {
  style: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    background: '#ffffff',
    color: '#111827',
    border: '1px solid #d1d5db',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
  },
  success: {
    iconTheme: {
      primary: '#10b981',
      secondary: '#f0fdf4',
    },
    style: {
      borderLeft: '4px solid #10b981',
    },
  },
  error: {
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fef2f2',
    },
    style: {
      borderLeft: '4px solid #ef4444',
    },
  },
};

export default toastOptions;