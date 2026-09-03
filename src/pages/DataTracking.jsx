import React from "react";
import { GitCommit, Clock, ShieldCheck, UserCheck } from "lucide-react";
import "./DataTracking.css";

export default function DataTracking() {
  return (
    <div className="portal-container page-content">
      <div className="page-header">
        <h1 className="page-title">Data Tracking & Lineage</h1>
        <p className="page-description">
          Audit complete data provenance, transform pipelines, execution timestamps, and user activity history.
        </p>
      </div>

      <div className="lineage-card">
        <h3 className="lineage-title">
          <GitCommit className="w-5 h-5 text-blue-600 inline mr-2" />
          Dataset Version Lineage: DS-GEN-2026-08
        </h3>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker">v3.1</div>
            <div className="timeline-content">
              <h4>PostgreSQL Index Rebuild & Normalization</h4>
              <p className="timeline-meta">Sept 02, 2026 — Executed by Dr. Aris Thorne (Automated Pipeline)</p>
              <p className="timeline-desc">Applied quality filter QA_THRESHOLD &gt; 0.98 and normalized genomic variant loci.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker">v2.0</div>
            <div className="timeline-content">
              <h4>Primary Sequence Ingestion</h4>
              <p className="timeline-meta">Aug 28, 2026 — System Ingest Daemon</p>
              <p className="timeline-desc">Ingested raw Illumina NovaSeq sequencing runs (1.2TB compressed).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}