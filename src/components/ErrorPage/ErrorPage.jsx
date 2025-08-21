import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axiosInstance from "../../API/axiosConfig";
import "../../assets/css/ErrorPage/ErrorPage.css";

const ErrorPage = () => {
  const location = useLocation();
  const { state } = location || {};
  const { error, isApiError = false, isBoundaryError = false } = state || {};

  const [countdown, setCountdown] = useState(15);

  const handleGoHome = () => {
    window.location.href = "/"; // ✅ Force full page reload to home
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          checkAPIAndReload(); // ✅ Trigger check + refresh
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkAPIAndReload = async () => {
    try {
      const response = await axiosInstance.get(
        "https://dev.emedicoz.com/qa/emedicoz-api",
        { timeout: 5000 }
      );
      if (response.status === 200) {
        console.log("API up, reloading...");
      } else {
        console.warn("API returned non-200, reloading anyway...");
      }
    } catch (err) {
      console.warn("API still down, reloading anyway...");
    }

    // Reload regardless (safe fallback)
    window.location.href = "/";
  };

  return (
    <div className="error-page">
      <div className="error-box">
        <img
          src="https://www.damsdelhi.com/logo.png"
          alt="DAMS Logo"
          className="error-logo"
        />
        <h1>⚠️ We’re experiencing a temporary issue</h1>
        <p>Please wait while we attempt to reconnect.</p>

        {isApiError && (
          <div className="error-type">
            <h4>🔌 Server/API Error</h4>
            <p>We are unable to connect to our servers.</p>
          </div>
        )}

        {isBoundaryError && (
          <div className="error-type">
            <h4>💥 Application Error</h4>
            <p>An unexpected error occurred in the app.</p>
          </div>
        )}

        <div className="error-actions">
          <Button variant="primary" onClick={handleGoHome}>
            🏠 Go to Homepage Now
          </Button>
        </div>

        <div className="auto-refresh mt-3">
          Auto-refreshing in <strong>{countdown}</strong> seconds...
        </div>

        {error && (
          <div className="error-debug mt-3">
            <details>
              <summary>Technical Details</summary>
              <pre>{error?.toString()}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
