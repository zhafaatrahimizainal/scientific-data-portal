// src/App.jsx
import React, { useState } from "react";
import {
  Database,
  FileText,
  Search,
  Globe,
  User,
  ChevronDown,
  Server,
  Zap,
  ShieldCheck,
  Layers,
  Code,
} from "lucide-react";
import "./App.css";

// --- DATA SOURCE ---
const TECH_STACK = [
  "organize",
  "access",
  "visualize",
  "query scientific data",
];

const MOCK_DATASETS = [
  {
    id: "DS-9042",
    sampleId: "SMP-2026-A1",
    group: "Genomics Core",
    status: "Active",
    records: "1,240,500",
  },
  {
    id: "DS-9043",
    sampleId: "SMP-2026-B4",
    group: "Bioinformatics Lab",
    status: "Active",
    records: "892,110",
  },
  {
    id: "DS-9044",
    sampleId: "SMP-2026-C8",
    group: "Molecular Dynamics",
    status: "Active",
    records: "3,410,000",
  },
  {
    id: "DS-9045",
    sampleId: "SMP-2026-D2",
    group: "Structural Chemistry",
    status: "Active",
    records: "512,040",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("datasets");
  const [selectedDataset, setSelectedDataset] = useState(MOCK_DATASETS[0]);

  return (
    <div className="portal-root">
      {/* 1. TOP GLOBAL UTILITY NAV */}
      <div className="global-nav">
        <div className="portal-container">
          <div className="global-nav-link">
            <Globe className="w-3.5 h-3.5" /> English{" "}
            <ChevronDown className="w-3 h-3" />
          </div>
          <div className="global-nav-link">Contact Engineering</div>
          <div className="global-nav-link">
            Documentation <ChevronDown className="w-3 h-3" />
          </div>
          <User className="w-4 h-4 text-gray-300 ml-2" />
        </div>
      </div>

      {/* 2. MAIN BRAND NAV */}
      <header className="main-nav">
        <div style={{backgroundColor: "white", padding: "0.85rem 0", borderBottom: "1px solid var(--border-light)"}}>
          <div className="portal-container main-nav-content">
            <div className="brand-title-group">
              <span className="brand-title">Scientific Data Portal</span>
              <div className="brand-divider"></div>
              <nav className="main-nav-links hidden md:flex">
                <a href="">Data Management</a>
                <a href="#capabilities">Data Tracking</a>
                <a href="#architecture">Data Exploration</a>
                <a href="#showcase">PostgreSQL Querying</a>
                <a href="#performance">Analytics Dashboard</a>
              </nav>
            </div>
            <div className="nav-right-actions">
              <Search className="w-4 h-4 text-gray-600 cursor-pointer" />
              <span className="text-sm font-semibold text-gray-800 cursor-pointer">
                Sign In
              </span>
              <button className="btn-pill-primary text-sm py-1.5 px-4">
                Open Portal
              </button>
            </div>
          </div>
        </div>
        {/* 3. FLOATING SUB-NAV BAR */}
        <div className="sub-nav-section">
          <div className="portal-container">
            <div className="sub-nav-card">
              <div className="sub-nav-title">Data Tier</div>
              <div className="sub-nav-menu hidden md:flex">
                <a href="overview" className="active">
                  Overview
                </a>
                <a href="">
                  Capabilities <ChevronDown className="w-3 h-3" />
                </a>
                <a href="performance">
                  System Design
                </a>
                <a href="#showcase">Demo Portal</a>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* 4. HERO SECTION */}
      <section id="overview" className="hero-section">
        <div className="portal-container">
          <h1 className="hero-heading">
            Scientific Data
            <br />
            Management Portal
          </h1>

          <p className="hero-subtext">
            An analytical platform for managing scientific data in a structured way—from entering and storing data to searching, viewing, analyzing, and performing database queries.
          </p>

          <div className="tech-badge-row">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>

          <div className="cta-group">
            <a href="#showcase" className="btn-pill-primary">
              Explore Interface
            </a>
            <a href="#architecture" className="btn-pill-secondary">
              View System Architecture
            </a>
          </div>
        </div>
      </section>

      <section className="split-section">

      </section>

      <section className="split-section">

      </section>

      <section id="showcase" className="split-section">
       
      </section>

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
    </div>
  );
}
