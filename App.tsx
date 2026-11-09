import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import Community from './pages/Community';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/games" element={<Games />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
