function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>You need to log in to access this page.</h3>
        <a href="/login">Go to Login page</a>
      </div>
    );
  }
  return children;
}

export default ProtectedRoute;
