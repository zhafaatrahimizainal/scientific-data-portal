import React, { useState } from "react";
import DatasetUploader from "../components/DatasetUploader";
import DatasetTable from "../components/DatasetTable";

export default function DataManagement() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: 800, color: "#111827" }}>
          Scientific Data Management Hub
        </h1>
        <p style={{ color: "#6b7280", marginTop: "0.25rem", fontSize: "0.95rem" }}>
          Ingest, catalog, and query raw experimental outputs with row-level security.
        </p>
      </header>

      <DatasetUploader onUploadSuccess={handleUploadSuccess} />
      <DatasetTable refreshTrigger={refreshTrigger} />
    </div>
  );
}

// import React from "react";
// import { Database, Upload, FolderPlus, FileText, CheckCircle } from "lucide-react";
// import "./DataManagement.css";

// export default function DataManagement() {
//   return (
//     <div className="portal-container page-content">
//       <div className="page-header">
//         <h1 className="page-title">Scientific Data Management</h1>
//         <p className="page-description">
//           Register, structure, and organize multi-laboratory research datasets with centralized metadata indexing.
//         </p>
//       </div>

//       <div className="management-grid">
//         <div className="upload-card">
//           <Upload className="w-8 h-8 text-blue-600 mb-2" />
//           <h3>Upload Dataset</h3>
//           <p>Drag and drop HDF5, CSV, Parquet, or DICOM files to ingest into storage buckets.</p>
//           <button className="btn-pill-primary mt-4">Browse Files</button>
//         </div>

//         <div className="upload-card">
//           <FolderPlus className="w-8 h-8 text-blue-600 mb-2" />
//           <h3>Create Collection</h3>
//           <p>Define new experimental projects, grant tags, and lab access controls.</p>
//           <button className="btn-pill-secondary mt-4">New Project</button>
//         </div>
//       </div>

//       <div className="table-card mt-8">
//         <div className="table-header">
//           <h3>Registered Repositories</h3>
//           <span className="badge-count">12 Active</span>
//         </div>
//         <div className="data-table-wrapper">
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Dataset ID</th>
//                 <th>Lab Origin</th>
//                 <th>Format</th>
//                 <th>Records</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="font-mono-cell">DS-GEN-2026-08</td>
//                 <td>Genomics Core A</td>
//                 <td>FASTQ / BAM</td>
//                 <td>1,420,000</td>
//                 <td><span className="status-pill active"><CheckCircle className="w-3 h-3" /> Indexed</span></td>
//               </tr>
//               <tr>
//                 <td className="font-mono-cell">DS-NEURO-2026-02</td>
//                 <td>Imaging Unit 3</td>
//                 <td>NIfTI / NWB</td>
//                 <td>84,500</td>
//                 <td><span className="status-pill active"><CheckCircle className="w-3 h-3" /> Indexed</span></td>
//               </tr>
//               <tr>
//                 <td className="font-mono-cell">DS-SPECT-2026-11</td>
//                 <td>Mass Spec Lab</td>
//                 <td>mzML</td>
//                 <td>310,200</td>
//                 <td><span className="status-pill pending">Processing</span></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }