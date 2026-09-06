import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { supabase } from "./lib/supabaseClient";
import { setAuthSession, clearAuthSession } from "./store/slices/authSlice";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import DataManagement from "./pages/DataManagement";
import DataTracking from "./pages/DataTracking";
import DataExploration from "./pages/DataExploration";
import PostgresQuerying from "./pages/PostgresQuerying";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // 1. Check existing session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(
          setAuthSession({
            user: session.user,
            token: session.access_token,
          }),
        );
      } else {
        dispatch(clearAuthSession());
      }
      setIsInitializing(false);
    });

    // 2. Listen for auth state changes (sign-in, sign-out, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(
          setAuthSession({
            user: session.user,
            token: session.access_token,
          }),
        );
      } else {
        dispatch(clearAuthSession());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <span>Initializing Portal...</span>
      </div>
    );
  }

  return (
    <div className="portal-root">
      <Navbar />
      <main className="portal-page-wrapper">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/data-management" element={<DataManagement />} />
            <Route path="/data-tracking" element={<DataTracking />} />
            <Route path="/data-exploration" element={<DataExploration />} />
            <Route
              path="/analytics-dashboard"
              element={<AnalyticsDashboard />}
            />
            <Route path="/postgresql-querying" element={<PostgresQuerying />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
