import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Search, Download, Trash2, Tag, Lock, Globe, Users, FileText } from "lucide-react";
import "./DatasetTable.css";

export default function DatasetTable({ refreshTrigger, onDatasetDeleted }) {
  const { token } = useSelector((state) => state.auth);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [disciplineFilter, setDisciplineFilter] = useState("ALL");

  const fetchDatasets = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/datasets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setDatasets(data);
    } catch (err) {
      console.error("Failed to load datasets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, [refreshTrigger]);

  const handleDownload = async (id, fileName) => {
    try {
      const res = await fetch(`http://localhost:3000/api/datasets/${id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { downloadUrl } = await res.json();
      
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert("Error initiating download");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dataset?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/datasets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDatasets((prev) => prev.filter((d) => d.id !== id));
        if (onDatasetDeleted) onDatasetDeleted();
      }
    } catch (err) {
      alert("Failed to delete dataset");
    }
  };

  const filteredDatasets = datasets.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesDiscipline =
      disciplineFilter === "ALL" || item.discipline === disciplineFilter;

    return matchesSearch && matchesDiscipline;
  });

  const renderAccessBadge = (level) => {
    switch (level) {
      case "public":
        return <span className="badge badge-public"><Globe size={12} /> Public</span>;
      case "internal":
        return <span className="badge badge-internal"><Users size={12} /> Internal</span>;
      default:
        return <span className="badge badge-private"><Lock size={12} /> Private</span>;
    }
  };

  return (
    <div className="table-card">
      {/* Search & Filter Controls */}
      <div className="table-controls">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, filename, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={disciplineFilter}
          onChange={(e) => setDisciplineFilter(e.target.value)}
        >
          <option value="ALL">All Disciplines</option>
          <option value="Genomics">Genomics</option>
          <option value="Neuroscience">Neuroscience</option>
          <option value="Proteomics">Proteomics</option>
          <option value="Climate Science">Climate Science</option>
          <option value="Biophysics">Biophysics</option>
        </select>
      </div>

      {/* Dataset Grid / Table */}
      {loading ? (
        <div className="table-status">Loading indexed datasets...</div>
      ) : filteredDatasets.length === 0 ? (
        <div className="table-status">No scientific datasets found.</div>
      ) : (
        <div className="table-wrapper">
          <table className="dataset-table">
            <thead>
              <tr>
                <th>Dataset Title & File</th>
                <th>Discipline</th>
                <th>Access</th>
                <th>Size</th>
                <th>Date Added</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatasets.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="title-cell">
                      <FileText size={18} className="file-icon" />
                      <div>
                        <div className="dataset-name">{row.title}</div>
                        <div className="file-subtext">{row.file_name}</div>
                        {row.tags && row.tags.length > 0 && (
                          <div className="tags-wrapper">
                            {row.tags.map((tag, idx) => (
                              <span key={idx} className="tag-chip">
                                <Tag size={10} /> {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="discipline-badge">{row.discipline}</span>
                  </td>
                  <td>{renderAccessBadge(row.access_level)}</td>
                  <td className="mono-text">
                    {(row.file_size / (1024 * 1024)).toFixed(2)} MB
                  </td>
                  <td className="mono-text">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div className="action-buttons">
                      <button
                        className="btn-action btn-download"
                        onClick={() => handleDownload(row.id, row.file_name)}
                        title="Download File"
                      >
                        <Download size={15} />
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDelete(row.id)}
                        title="Delete Dataset"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}