import React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Goals from "./components/Goals";
import Community from "./components/Community";
import Profile from "./components/Profile";
import Transactions from "./components/Transactions";
import Explore from "./components/Explore";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

// Admin-only Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = localStorage.getItem("username");
  const isAdmin = username === "admin_001";

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🚫 Access Denied
          </h2>
          <p className="text-gray-600">You don't have admin permissions!</p>
        </div>
      </MainLayout>
    );
  }

  return <>{children}</>;
};

// Tab Navigation Component
const TabButton: React.FC<{
  icon: string;
  label: string;
  to: string;
}> = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center p-3 rounded-lg transition-all ${
        isActive
          ? "bg-rose-500 text-white shadow-lg"
          : "text-gray-600 hover:bg-pink-50 hover:text-rose-500"
      }`}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

// Main Layout Component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/images/ll_logo_test_2.png"
                alt="LL"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Lucrative Ladies
                </h1>
                <p className="text-xs text-gray-500">Empower Your Wealth</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-pink-500 transition-colors">
                <span className="text-xl">🔔</span>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-pink-500 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="grid grid-cols-6 gap-1">
            <TabButton icon="🏠" label="Dashboard" to="/dashboard" />
            <TabButton icon="🎯" label="Goals" to="/goals" />
            <TabButton icon="💳" label="Money" to="/transactions" />
            <TabButton icon="💬" label="Community" to="/circle" />
            <TabButton icon="✨" label="Explore" to="/explore" />
            <TabButton icon="👤" label="Profile" to="/profile" />
          </div>
        </div>
      </nav>

      {/* Padding for fixed bottom nav */}
      <div className="h-20"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Goals />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/circle"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Community />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Explore />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Transactions />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminPanel />
            </MainLayout>
          </AdminRoute>
        }
      />

      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
