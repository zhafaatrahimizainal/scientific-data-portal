import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DataManagement from './pages/DataManagement';
import DataTracking from './pages/DataTracking';
import DataExploration from './pages/DataExploration';
import PostgresQuerying from './pages/PostgresQuerying';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import './App.css';

export default function App() {
  return (
    <div className="portal-root">
      <Navbar />
      <main className="portal-page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data-management" element={<DataManagement />} />
          <Route path="/data-tracking" element={<DataTracking />} />
          <Route path="/data-exploration" element={<DataExploration />} />
          <Route path="/postgresql-querying" element={<PostgresQuerying />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        </Routes>
      </main>
    </div>
  );
}