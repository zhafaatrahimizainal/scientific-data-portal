import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Upload, FileText, CheckCircle, AlertTriangle, X } from "lucide-react";
import "./DatasetUploader.css";

const ALLOWED_EXTS = [".csv", ".json", ".hdf5", ".nii", ".fastq", ".xlsx", ".pdf"];

export default function DatasetUploader({ onUploadSuccess }) {
  const { token } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    discipline: "Genomics",
    grantId: "",
    experimentalConditions: "",
    tags: "",
    accessLevel: "private",
  });

  const validateAndSetFile = (file) => {
    setError(null);
    if (!file) return;

    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) {
      setError(`Invalid file type (${ext}). Allowed: ${ALLOWED_EXTS.join(", ")}`);
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit.");
      return;
    }

    setSelectedFile(file);
    if (!formData.title) {
      setFormData((prev) => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, "") }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return setError("Please select a valid dataset file.");

    setLoading(true);
    setError(null);

    const payload = new FormData();
    payload.append("file", selectedFile);
    payload.append("title", formData.title);
    payload.append("discipline", formData.discipline);
    payload.append("grant_id", formData.grantId);
    payload.append("experimental_conditions", formData.experimentalConditions);
    payload.append(
      "tags",
      JSON.stringify(formData.tags.split(",").map((t) => t.trim()).filter(Boolean))
    );
    payload.append("access_level", formData.accessLevel);

    try {
      const response = await fetch("http://localhost:3000/api/datasets/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed");

      setSelectedFile(null);
      setFormData({
        title: "",
        discipline: "Genomics",
        grantId: "",
        experimentalConditions: "",
        tags: "",
        accessLevel: "private",
      });
      
      if (onUploadSuccess) onUploadSuccess(result.dataset);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-card">
      <h2 className="uploader-title">Ingest Scientific Dataset</h2>

      {error && (
        <div className="uploader-alert alert-error">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* File Dropzone */}
      <div
        className={`dropzone ${dragActive ? "dropzone-active" : ""} ${selectedFile ? "dropzone-has-file" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => validateAndSetFile(e.target.files[0])}
        />

        {selectedFile ? (
          <div className="file-preview">
            <FileText className="file-icon" />
            <div className="file-details">
              <p className="file-name">{selectedFile.name}</p>
              <p className="file-meta">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
            <button
              type="button"
              className="btn-remove"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="dropzone-prompt">
            <Upload className="upload-icon" />
            <p className="drop-main-text">Drag and drop dataset file here, or click to browse</p>
            <p className="drop-sub-text">Supported: .csv, .json, .hdf5, .nii, .fastq, .xlsx, .pdf (Max 100MB)</p>
          </div>
        )}
      </div>

      {/* Metadata Form */}
      <form onSubmit={handleSubmit} className="uploader-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Dataset Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., RNA-Seq Trial 04 Metadata"
            />
          </div>

          <div className="form-group">
            <label>Research Discipline *</label>
            <select
              value={formData.discipline}
              onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
            >
              <option value="Genomics">Genomics</option>
              <option value="Neuroscience">Neuroscience</option>
              <option value="Proteomics">Proteomics</option>
              <option value="Climate Science">Climate Science</option>
              <option value="Biophysics">Biophysics</option>
            </select>
          </div>

          <div className="form-group">
            <label>Grant / Project ID</label>
            <input
              type="text"
              value={formData.grantId}
              onChange={(e) => setFormData({ ...formData, grantId: e.target.value })}
              placeholder="e.g., NIH-GR-2026-99"
            />
          </div>

          <div className="form-group">
            <label>Access Level</label>
            <select
              value={formData.accessLevel}
              onChange={(e) => setFormData({ ...formData, accessLevel: e.target.value })}
            >
              <option value="private">Private (Only You)</option>
              <option value="internal">Internal (Lab Network)</option>
              <option value="public">Public Domain</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Tags (Comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="e.g., control-group, 2026, raw-run"
          />
        </div>

        <div className="form-group">
          <label>Experimental Conditions</label>
          <textarea
            rows="3"
            value={formData.experimentalConditions}
            onChange={(e) => setFormData({ ...formData, experimentalConditions: e.target.value })}
            placeholder="Temperature, pressure, sample batch details, or preparation notes..."
          />
        </div>

        <button type="submit" disabled={loading || !selectedFile} className="btn-pill-primary submit-btn">
          {loading ? "Uploading & Indexing..." : "Upload Dataset"}
        </button>
      </form>
    </div>
  );
}