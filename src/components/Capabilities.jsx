import React from "react";
import {
  Database,
  GitFork,
  Activity,
  ShieldCheck,
  BarChart3,
  Cpu,
} from "lucide-react";
import "./Capabilities.css";

export default function Capabilities() {
  const capabilitiesList = [
    {
      icon: <Database className="capability-icon" />,
      title: "High-Throughput Ingestion",
      description:
        "Stream and bulk-upload multi-gigabyte scientific datasets with automatic validation and metadata extraction.",
    },
    {
      icon: <GitFork className="capability-icon" />,
      title: "Data Lineage & Provenance",
      description:
        "Track dataset evolution across pipeline executions with immutable audit trails and DAG-based lineage graphs.",
    },
    {
      icon: <Activity className="capability-icon" />,
      title: "PostgreSQL Direct Workbench",
      description:
        "Execute raw SQL queries with parameterization, indexing advice, and real-time execution cost estimates.",
    },
    {
      icon: <ShieldCheck className="capability-icon" />,
      title: "Role-Based Access & Security",
      description:
        "Enforce granular permission policies for lab members, principal investigators, and guest reviewers.",
    },
    {
      icon: <BarChart3 className="capability-icon" />,
      title: "Real-Time Telemetry & Analytics",
      description:
        "Monitor experiment runtimes, system memory utilization, and query throughput with live metric dashboards.",
    },
    {
      icon: <Cpu className="capability-icon" />,
      title: "Automated Metadata Tagging",
      description:
        "Schema-aware automatic tagging for genomic sequences, astronomical coordinates, and bio-image metadata.",
    },
  ];

  return (
    <section id="capabilities" className="capabilities-section">
      <div className="portal-container">
        <div className="section-header">
          <span className="section-badge">Platform Features</span>
          <h2 className="section-title">Core Scientific Capabilities</h2>
          <p className="section-subtitle">
            Engineered to handle high-volume research data, strict provenance requirements, and collaborative analytics.
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilitiesList.map((item, index) => (
            <div key={index} className="capability-card">
              <div className="capability-icon-wrapper">{item.icon}</div>
              <h3 className="capability-title">{item.title}</h3>
              <p className="capability-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}