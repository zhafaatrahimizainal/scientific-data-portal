import React, { useState } from "react";
import { Terminal, Play, Database, Table } from "lucide-react";
import "./PostgresQuerying.css";

export default function PostgresQuerying() {
  const [query, setQuery] = useState(
    "SELECT dataset_id, sample_name, quality_score \nFROM scientific_records \nWHERE quality_score > 0.95 \nORDER BY created_at DESC \nLIMIT 5;"
  );

  return (
    <div className="portal-container page-content">
      <div className="page-header">
        <h1 className="page-title">PostgreSQL Querying Console</h1>
        <p className="page-description">
          Execute structured SQL queries directly against research relational tables and indexed metadata stores.
        </p>
      </div>

      <div className="query-workspace">
        <div className="query-editor-card">
          <div className="editor-topbar">
            <span className="editor-title">
              <Terminal className="w-4 h-4 text-green-400" /> SQL Workspace (PostgreSQL 16)
            </span>
            <button className="btn-pill-primary py-1 px-3 text-xs">
              <Play className="w-3 h-3 inline mr-1" /> Execute Query
            </button>
          </div>
          <textarea
            className="sql-editor-textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={6}
          />
        </div>

        <div className="query-results-card">
          <div className="results-topbar">
            <span>Query Results (3 rows returned in 12ms)</span>
          </div>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>dataset_id</th>
                  <th>sample_name</th>
                  <th>quality_score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-mono-cell">DS-GEN-2026-08</td>
                  <td>Sample_Alpha_01</td>
                  <td className="font-mono-cell">0.992</td>
                </tr>
                <tr>
                  <td className="font-mono-cell">DS-GEN-2026-08</td>
                  <td>Sample_Alpha_02</td>
                  <td className="font-mono-cell">0.987</td>
                </tr>
                <tr>
                  <td className="font-mono-cell">DS-NEURO-2026-02</td>
                  <td>Cortex_Scan_11</td>
                  <td className="font-mono-cell">0.965</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}