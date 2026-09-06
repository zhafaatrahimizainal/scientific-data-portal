import React from "react";
import Hero from "../components/Hero";
import Capabilities from "../components/Capabilities";
import SystemDesign from "../components/SystemDesign";
import DemoPortal from "../components/DemoPortal";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page-container">
      {/* 1. Overview Section */}
      <div id="overview">
        <Hero />
      </div>

      {/* 2. Capabilities Section (#capabilities inside component) */}
      <Capabilities />

      {/* 3. System Design / Performance Section (#performance inside component) */}
      <SystemDesign />

      {/* 4. Demo Portal / Showcase Section (#showcase inside component) */}
      <DemoPortal />
    </div>
  );
}