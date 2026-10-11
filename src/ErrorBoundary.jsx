import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('FinSim crashed:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="app-shell flex items-center justify-center p-6 bg-[#0f172a] text-slate-100 font-sans">
        <div className="max-w-sm w-full text-center rounded-3xl p-8 border border-white/10 bg-white/5">
          <h1 className="text-xl font-black mb-2">Something went wrong</h1>
          <p className="text-sm text-slate-300 mb-6">An unexpected error occurred. Reloading usually fixes it.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl font-bold bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
