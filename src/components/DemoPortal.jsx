import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Table, LineChart, Play, ExternalLink } from "lucide-react";
import "./DemoPortal.css";

export default function DemoPortal() {
  const [activeTab, setActiveTab] = useState("query");

  return (
    <section id="showcase" className="showcase-section">
      <div className="portal-container">
        <div className="section-header">
          <span className="section-badge">Live Preview</span>
          <h2 className="section-title">Interactive Demo Portal</h2>
          <p className="section-subtitle">
            Explore workspace views and query modules before signing in to your institutional account.
          </p>
        </div>

        <div className="demo-window">
          {/* Mock Window Top Bar */}
          <div className="demo-window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="window-title">scientific-portal://workspace/demo</div>
            <div className="window-status">
              <span className="status-indicator"></span> Ready
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="demo-tabs">
            <button
              className={`demo-tab ${activeTab === "query" ? "active" : ""}`}
              onClick={() => setActiveTab("query")}
            >
              <Terminal className="w-4 h-4" /> SQL Workbench
            </button>
            <button
              className={`demo-tab ${activeTab === "tracking" ? "active" : ""}`}
              onClick={() => setActiveTab("tracking")}
            >
              <Table className="w-4 h-4" /> Lineage Tracker
            </button>
            <button
              className={`demo-tab ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <LineChart className="w-4 h-4" /> Metrics Dashboard
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="demo-window-body">
            {activeTab === "query" && (
              <div className="demo-panel">
                <div className="code-snippet">
                  <code>
                    <span className="keyword">SELECT</span> dataset_id, sample_name, quality_score <br />
                    <span className="keyword">FROM</span> genomics_experiments <br />
                    <span className="keyword">WHERE</span> status = <span className="string">'validated'</span> <br />
                    <span className="keyword">ORDER BY</span> created_at <span className="keyword">DESC</span> <span className="keyword">LIMIT</span> 5;
                  </code>
                </div>
                <div className="mock-result-table">
                  <div className="table-row table-header">
                    <span>dataset_id</span>
                    <span>sample_name</span>
                    <span>quality_score</span>
                  </div>
                  <div className="table-row">
                    <span>DS-9082</span>
                    <span>RNA_Seq_Batch_04</span>
                    <span className="text-green-600 font-semibold">0.982</span>
                  </div>
                  <div className="table-row">
                    <span>DS-9083</span>
                    <span>RNA_Seq_Batch_05</span>
                    <span className="text-green-600 font-semibold">0.965</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tracking" && (
              <div className="demo-panel">
                <div className="lineage-nodes">
                  <div className="node node-input">Raw Reads (.FASTQ)</div>
                  <div className="node-arrow">➔</div>
                  <div className="node node-process">FastQC Alignment</div>
                  <div className="node-arrow">➔</div>
                  <div className="node node-output">Processed VCF</div>
                </div>
                <p className="demo-caption">
                  Automated DAG tracking records execution parameters and input checksums at each node.
                </p>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="demo-panel">
                <div className="mock-metrics-grid">
                  <div className="metric-box">
                    <span className="metric-label">Active Datasets</span>
                    <span className="metric-value">1,248</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">Query Latency</span>
                    <span className="metric-value">12ms</span>
                  </div>
                  <div className="metric-box">
                    <span className="metric-label">Storage Used</span>
                    <span className="metric-value">4.2 TB</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Window Footer CTA */}
          <div className="demo-window-footer">
            <span>Want full access to live database features?</span>
            <Link to="/signin" className="btn-pill-primary demo-cta">
              <Play className="w-3.5 h-3.5 inline mr-1" /> Launch Full Workspace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}