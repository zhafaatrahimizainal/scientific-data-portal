import React from "react";
import Hero from "../components/Hero";
import SystemDesign from "../components/SystemDesign";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page-container">
      <Hero />
      <SystemDesign />
    </div>
  );
}