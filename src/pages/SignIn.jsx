import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../services/authService";
import { setAuthError, setAuthLoading } from "../store/slices/authSlice";
import { LogIn, Lock, Mail, AlertCircle } from "lucide-react";
import "./SignIn.css";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid academic/institutional email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || "/data-management";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setAuthLoading(true));
      await authService.signIn(data);
      navigate(from, { replace: true });
    } catch (err) {
      dispatch(setAuthError(err.message || "Failed to sign in. Check credentials."));
    }
  };

  return (
    <div className="portal-container auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-header">
          <div className="auth-icon-badge">
            <Lock className="w-5 h-5 text-gray-800" />
          </div>
          <h1 className="auth-title">Portal Sign In</h1>
          <p className="auth-subtitle">
            Access secure scientific datasets, pipelines, and PostgreSQL querying tools.
          </p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-field">
            <label>Institutional Email</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="researcher@institution.edu"
                {...register("email")}
              />
            </div>
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-pill-primary w-full py-2.5 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In to Workspace"}
          </button>
        </form>

        <div className="auth-card-footer">
          Don't have an institutional account?{" "}
          <Link to="/signup">Register New Laboratory Account</Link>
        </div>
      </div>
    </div>
  );
}