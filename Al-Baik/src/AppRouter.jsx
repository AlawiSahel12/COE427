import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/customer" element={<h1>customer</h1>} />

        <Route path="/chasher" element={<h1>chasher</h1>} />

        <Route path="/dashboard" element={<h1>dashboard</h1>} />

        <Route path="*" element={<Navigate to="/customer" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
