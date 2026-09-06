import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-icon-wrapper">
          <AlertCircle className="notfound-icon" />
        </div>
        
        <span className="notfound-code">404 ERROR</span>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-description">
          The dataset pathway or workspace page you requested does not exist or has been moved within the portal network.
        </p>

        <div className="notfound-actions">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="btn-pill-secondary notfound-btn"
          >
            <ArrowLeft style={{ width: "1rem", height: "1rem" }} /> Go Back
          </button>
          
          <Link to="/" className="btn-pill-primary notfound-btn">
            <Home style={{ width: "1rem", height: "1rem" }} /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}