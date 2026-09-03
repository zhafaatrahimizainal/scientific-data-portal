import React from "react";
import { Activity, HardDrive, Cpu, Server } from "lucide-react";
import "./AnalyticsDashboard.css";

export default function AnalyticsDashboard() {
  return (
    <div className="portal-container page-content">
      <div className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-description">
          Monitor storage throughput, system resource telemetry, and active PostgreSQL database metrics.
        </p>
      </div>

      <div className="metrics-summary-grid">
        <div className="metric-card">
          <HardDrive className="w-5 h-5 text-blue-600 mb-1" />
          <span className="metric-label">Total Storage Managed</span>
          <span className="metric-value">4.28 TB</span>
          <span className="metric-trend positive">+12% this month</span>
        </div>

        <div className="metric-card">
          <Activity className="w-5 h-5 text-green-600 mb-1" />
          <span className="metric-label">Avg. Query Latency</span>
          <span className="metric-value">14.2 ms</span>
          <span className="metric-trend positive">-3.1 ms improvement</span>
        </div>

        <div className="metric-card">
          <Cpu className="w-5 h-5 text-purple-600 mb-1" />
          <span className="metric-label">Active Postgres Worker Nodes</span>
          <span className="metric-value">8 / 8</span>
          <span className="metric-trend neutral">100% Operational</span>
        </div>
      </div>
    </div>
  );
}