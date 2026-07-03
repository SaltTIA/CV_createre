import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };
  static getDerivedStateFromError(e: Error) { return { hasError: true, error: e }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-8">
          <div className="max-w-md bg-white rounded-xl shadow-lg p-6 space-y-3 border border-red-200">
            <h2 className="text-lg font-bold text-red-700">Something went wrong</h2>
            <pre className="text-xs bg-red-50 p-3 rounded text-red-800 overflow-auto max-h-48">{this.state.error?.message}</pre>
            <button onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Try Again</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
