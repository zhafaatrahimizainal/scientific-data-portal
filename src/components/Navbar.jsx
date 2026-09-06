import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Globe,
  ChevronDown,
  User,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { authService } from "../services/authService";
import { clearAuthSession } from "../store/slices/authSlice";
import "./Navbar.css";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      dispatch(clearAuthSession());
      closeMobileMenu();
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const [activeSection, setActiveSection] = useState("overview");

  // References to handle manual scroll locking
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Programmatic smooth scroll handler with offset calculation
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    // Lock observer updates during transition
    isManualScrollingRef.current = true;
    setActiveSection(sectionId);

    // Compute scroll position accounting for fixed navbar height (~90px offset)
    const navbarOffset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Unlock observer after smooth scroll animation completes (~800ms)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  };

  // IntersectionObserver with manual scroll lock check
  useEffect(() => {
    if (location.pathname !== "/") return;

    const timer = setTimeout(() => {
      // Query sections or target div IDs on the home page
      const sections = document.querySelectorAll("#overview, section[id]");
      if (sections.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          // Skip state updates if the user manually clicked a sub-nav tab
          if (isManualScrollingRef.current) return;

          const visibleEntries = entries.filter(
            (entry) => entry.isIntersecting,
          );
          if (visibleEntries.length > 0) {
            const mostVisible = visibleEntries.reduce((prev, current) =>
              current.intersectionRatio > prev.intersectionRatio
                ? current
                : prev,
            );
            setActiveSection(mostVisible.target.id);
          }
        },
        {
          rootMargin: "-20% 0px -40% 0px",
          threshold: [0.1, 0.3, 0.6],
        },
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

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

              {isAuthenticated ? (
                <div className="user-nav-badge hide-mobile">
                  <span className="user-email-label">
                    {user?.user_metadata?.full_name || user?.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="btn-signout-icon"
                    title="Sign Out"
                  >
                    <LogOut style={{ width: "1rem", height: "1rem" }} />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signin" className="sign-in hide-mobile">
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-pill-primary hide-mobile"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              {/* <span className="sign-in hide-mobile">Sign In</span>
              <Link
                to="/data-management"
                className="btn-pill-primary hide-mobile"
                style={{ fontSize: "0.875rem" }}
              >
                Open Portal
              </Link> */}

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
                  <Menu
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      color: "#1f2937",
                    }}
                  />
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
              {isAuthenticated ? (
                <button
                  onClick={handleSignOut}
                  className="btn-pill-secondary sign-out"
                >
                  <LogOut style={{ width: "1rem", height: "1rem" }} /> Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="sign-in"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-pill-primary"
                    style={{
                      fontSize: "0.875rem",
                      padding: "0.5rem 1rem",
                      width: "100%",
                      textAlign: "center",
                    }}
                    onClick={closeMobileMenu}
                  >
                    Open Account
                  </Link>
                </>
              )}
              {/* <span className="sign-in">Sign In</span>
              <Link
                to="/data-management"
                className="btn-pill-primary text-sm py-2 px-4 w-full text-center"
                onClick={closeMobileMenu}
              >
                Open Portal
              </Link> */}
            </div>
          </div>
        )}

        {/* 3. FLOATING SUB-NAV BAR */}
        {/* FLOATING SUB-NAV BAR (Rendered only on Home page) */}
        {location.pathname === "/" && (
          <div className="sub-nav-section">
            <div className="sub-nav-container">
              <div className="sub-nav-card">
                <div className="sub-nav-title">Home</div>
                <div className="sub-nav-menu">
                  <button
                    type="button"
                    className={`sub-nav-btn ${activeSection === "overview" ? "active" : ""}`}
                    onClick={(e) => scrollToSection(e, "overview")}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    className={`sub-nav-btn ${activeSection === "capabilities" ? "active" : ""}`}
                    onClick={(e) => scrollToSection(e, "capabilities")}
                  >
                    Capabilities
                  </button>
                  <button
                    type="button"
                    className={`sub-nav-btn ${activeSection === "performance" ? "active" : ""}`}
                    onClick={(e) => scrollToSection(e, "performance")}
                  >
                    System Design
                  </button>
                  <button
                    type="button"
                    className={`sub-nav-btn ${activeSection === "showcase" ? "active" : ""}`}
                    onClick={(e) => scrollToSection(e, "showcase")}
                  >
                    Demo Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
