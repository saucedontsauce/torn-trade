import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
                    <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-4">
                            An unexpected error occurred. Try refreshing the page or come back later.
                        </p>

                        {process.env.NODE_ENV !== "production" && (
                            <div className="text-left bg-gray-100 text-gray-700 p-4 rounded-lg overflow-auto mb-4">
                                <p className="font-semibold text-sm mb-2">Error Details:</p>
                                <pre className="text-xs whitespace-pre-wrap">
                                    {this.state.error?.toString()}
                                </pre>
                                {this.state.errorInfo && (
                                    <pre className="text-xs whitespace-pre-wrap mt-2">
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                )}
                            </div>
                        )}

                        <button
                            onClick={this.handleReload}
                            className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}