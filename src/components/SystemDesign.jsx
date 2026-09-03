import React from "react";
import { Zap, ShieldCheck, Layers, Code } from "lucide-react";
import "./SystemDesign.css";

export default function SystemDesign() {
  return (
    <section id="performance" className="split-section bg-gray-50">
      <div className="portal-container">
        <h2 className="section-title text-center mb-10">
          Engineering & Performance Foundations
        </h2>

        <div className="engineering-grid">
          <div className="eng-card">
            <Zap className="w-5 h-5 text-gray-800 mb-3" />
            <h3>Fast Query Response</h3>
            <p>
              Optimized relational indexing and connection pooling for quick
              data retrieval.
            </p>
          </div>

          <div className="eng-card">
            <ShieldCheck className="w-5 h-5 text-gray-800 mb-3" />
            <h3>Structured Integrity</h3>
            <p>
              Relational Postgres schema ensuring consistency across research
              datasets.
            </p>
          </div>

          <div className="eng-card">
            <Layers className="w-5 h-5 text-gray-800 mb-3" />
            <h3>REST Architecture</h3>
            <p>
              Clean operational separation between frontend React interfaces
              and server logic.
            </p>
          </div>

          <div className="eng-card">
            <Code className="w-5 h-5 text-gray-800 mb-3" />
            <h3>Scalable Foundation</h3>
            <p>
              Designed to support growing scientific volume and
              multi-laboratory querying.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}