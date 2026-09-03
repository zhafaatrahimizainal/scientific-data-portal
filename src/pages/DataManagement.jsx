import React from "react";
import { Database, Upload, FolderPlus, FileText, CheckCircle } from "lucide-react";
import "./DataManagement.css";

export default function DataManagement() {
  return (
    <div className="portal-container page-content">
      <div className="page-header">
        <h1 className="page-title">Scientific Data Management</h1>
        <p className="page-description">
          Register, structure, and organize multi-laboratory research datasets with centralized metadata indexing.
        </p>
      </div>

      <div className="management-grid">
        <div className="upload-card">
          <Upload className="w-8 h-8 text-blue-600 mb-2" />
          <h3>Upload Dataset</h3>
          <p>Drag and drop HDF5, CSV, Parquet, or DICOM files to ingest into storage buckets.</p>
          <button className="btn-pill-primary mt-4">Browse Files</button>
        </div>

        <div className="upload-card">
          <FolderPlus className="w-8 h-8 text-blue-600 mb-2" />
          <h3>Create Collection</h3>
          <p>Define new experimental projects, grant tags, and lab access controls.</p>
          <button className="btn-pill-secondary mt-4">New Project</button>
        </div>
      </div>

      <div className="table-card mt-8">
        <div className="table-header">
          <h3>Registered Repositories</h3>
          <span className="badge-count">12 Active</span>
        </div>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Dataset ID</th>
                <th>Lab Origin</th>
                <th>Format</th>
                <th>Records</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-mono-cell">DS-GEN-2026-08</td>
                <td>Genomics Core A</td>
                <td>FASTQ / BAM</td>
                <td>1,420,000</td>
                <td><span className="status-pill active"><CheckCircle className="w-3 h-3" /> Indexed</span></td>
              </tr>
              <tr>
                <td className="font-mono-cell">DS-NEURO-2026-02</td>
                <td>Imaging Unit 3</td>
                <td>NIfTI / NWB</td>
                <td>84,500</td>
                <td><span className="status-pill active"><CheckCircle className="w-3 h-3" /> Indexed</span></td>
              </tr>
              <tr>
                <td className="font-mono-cell">DS-SPECT-2026-11</td>
                <td>Mass Spec Lab</td>
                <td>mzML</td>
                <td>310,200</td>
                <td><span className="status-pill pending">Processing</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}