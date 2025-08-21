import React from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          isBoundaryError={true}
        />
      );
    }

    return this.props.children;
  }
}

// Higher Order Component for functional components
export const withErrorBoundary = (Component) => (props) =>
  (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

export default ErrorBoundary;
