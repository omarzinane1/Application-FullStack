import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardAgent from './pages/DashboardAgent';
import DashboardSupervisor from './pages/DashboardSupervisor';
import NotFoundPage from './pages/NotFoundPage';

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  return children;
}

function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'agent') return <DashboardAgent />;
  if (user.role === 'superviseur') return <DashboardSupervisor />;
  return <div>Rôle inconnu</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
