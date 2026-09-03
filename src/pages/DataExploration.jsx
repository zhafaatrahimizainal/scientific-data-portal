import React from "react";
import { Search, Filter, Sliders, Eye } from "lucide-react";
import "./DataExploration.css";

export default function DataExploration() {
  return (
    <div className="portal-container page-content">
      <div className="page-header">
        <h1 className="page-title">Data Exploration Space</h1>
        <p className="page-description">
          Interactively inspect distributions, filter matrix dimensions, and preview scientific schema attributes.
        </p>
      </div>

      <div className="explorer-layout">
        <aside className="filter-sidebar">
          <div className="filter-title">
            <Filter className="w-4 h-4" /> Filters
          </div>
          <div className="filter-group">
            <label>Organism / Species</label>
            <select className="input-select">
              <option>All Organisms</option>
              <option>Homo sapiens</option>
              <option>Mus musculus</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Confidence Score Minimum</label>
            <input type="range" className="w-full" min="0" max="100" />
          </div>
        </aside>

        <section className="explorer-main">
          <div className="search-bar-box">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search features, gene symbols, or specimen tags..."
              className="search-input"
            />
          </div>

          <div className="preview-grid">
            <div className="preview-card">
              <div className="preview-card-header">
                <Eye className="w-4 h-4 text-blue-600" /> Expression Matrix Preview
              </div>
              <p className="preview-text">
                Matrix Dimensions: 50,000 genes x 1,200 single-cell samples.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}