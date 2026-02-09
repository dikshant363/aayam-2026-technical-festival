import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import { storageService } from './services/storage';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Packages = lazy(() => import('./pages/Packages'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Team = lazy(() => import('./pages/Team'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminApplications = lazy(() => import('./pages/AdminApplications'));
const AdminMessages = lazy(() => import('./pages/AdminMessages'));
const AdminContent = lazy(() => import('./pages/AdminContent'));
const AdminSettings = lazy(() => import('./pages/AdminSettings'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);

// Protected Route Component
const RequireAuth = ({ children }: React.PropsWithChildren) => {
  const location = useLocation();
  if (!storageService.isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="packages" element={<Packages />} />
              <Route path="events" element={<Events />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="team" element={<Team />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }>
               <Route index element={<Navigate to="/admin/dashboard" replace />} />
               <Route path="dashboard" element={<AdminDashboard />} />
               <Route path="applications" element={<AdminApplications />} />
               <Route path="messages" element={<AdminMessages />} />
               <Route path="content" element={<AdminContent />} />
               <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;