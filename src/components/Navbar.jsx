import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Globe, ChevronDown, User, Search, Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* 1. TOP GLOBAL UTILITY NAV */}
      <div className="global-nav">
        <div className="portal-container">
          <div className="global-nav-link">
            <Globe style={{ width: "0.875rem", height: "0.875rem" }} /> English{" "}
            <ChevronDown style={{ width: "0.75rem", height: "0.75rem" }} />
          </div>
          <div className="global-nav-link hide-mobile">Contact Engineering</div>
          <div className="global-nav-link hide-mobile">
            Documentation{" "}
            <ChevronDown style={{ width: "0.75rem", height: "0.75rem" }} />
          </div>
          <User className="user" />
        </div>
      </div>

      {/* 2. MAIN BRAND NAV */}
      <header className="main-nav">
        <div className="main-nav-inner">
          <div className="portal-container main-nav-content">
            <div className="brand-title-group">
              <Link to="/" className="brand-title" onClick={closeMobileMenu}>
                Scientific Data Portal
              </Link>
              <div className="brand-divider hide-tablet"></div>
              <nav className="main-nav-links hide-tablet">
                <NavLink
                  to="/data-management"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Data Management
                </NavLink>
                <NavLink
                  to="/data-tracking"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Data Tracking
                </NavLink>
                <NavLink
                  to="/data-exploration"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Data Exploration
                </NavLink>
                <NavLink
                  to="/postgresql-querying"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  PostgreSQL Querying
                </NavLink>
                <NavLink
                  to="/analytics-dashboard"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Analytics Dashboard
                </NavLink>
              </nav>
            </div>
            <div className="nav-right-actions">
              <Search className="search" />
              <span className="sign-in hide-mobile">Sign In</span>
              <Link
                to="/data-management"
                className="btn-pill-primary hide-mobile"
                style={{ fontSize: "0.875rem" }}
              >
                Open Portal
              </Link>
              <button
                className="mobile-toggle-btn show-tablet"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#1f2937",
                    }}
                  />
                ) : (
                  <Menu style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#1f2937",
                    }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <nav className="mobile-menu-links">
              <NavLink to="/" onClick={closeMobileMenu}>
                Home
              </NavLink>
              <NavLink to="/data-management" onClick={closeMobileMenu}>
                Data Management
              </NavLink>
              <NavLink to="/data-tracking" onClick={closeMobileMenu}>
                Data Tracking
              </NavLink>
              <NavLink to="/data-exploration" onClick={closeMobileMenu}>
                Data Exploration
              </NavLink>
              <NavLink to="/postgresql-querying" onClick={closeMobileMenu}>
                PostgreSQL Querying
              </NavLink>
              <NavLink to="/analytics-dashboard" onClick={closeMobileMenu}>
                Analytics Dashboard
              </NavLink>
            </nav>
            <div className="mobile-menu-actions">
              <span className="sign-in">Sign In</span>
              <Link
                to="/data-management"
                className="btn-pill-primary text-sm py-2 px-4 w-full text-center"
                onClick={closeMobileMenu}
              >
                Open Portal
              </Link>
            </div>
          </div>
        )}

        {/* 3. FLOATING SUB-NAV BAR */}
        <div className="sub-nav-section">
          <div className="" style={{ width: "fit-content" }}>
            <div className="sub-nav-card">
              <div className="sub-nav-title">Home</div>
              <div className="sub-nav-menu">
                <a href="#hero" className={({ isActive }) => (isActive ? "active" : "")} end>
                  Overview
                </a>
                <a href="#capabilities" className={({ isActive }) => (isActive ? "active" : "")}>
                  Capabilities{" "}
                  <ChevronDown
                    style={{ width: "0.75rem", height: "0.75rem" }}
                  />
                </a>
                <a href="#performance" className={({ isActive }) => (isActive ? "active" : "")}>System Design</a>
                <a href="#showcase" className={({ isActive }) => (isActive ? "active" : "")}>Demo Portal</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
