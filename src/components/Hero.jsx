import React from "react";
import "./Hero.css";

const TECH_STACK = [
  "organize",
  "access",
  "visualize",
  "query scientific data",
];

export default function Hero() {
  return (
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
  );
}